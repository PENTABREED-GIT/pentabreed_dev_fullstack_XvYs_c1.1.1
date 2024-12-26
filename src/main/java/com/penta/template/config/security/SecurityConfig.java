package com.penta.template.config.security;

import com.penta.template.config.property.CustomYmlProperty;
import com.penta.template.config.security.context.UserContext;
import com.penta.template.config.security.handler.CustomAccessDeniedHandler;
import com.penta.template.config.security.handler.CustomAuthenticationEntryPoint;
import com.penta.template.config.security.provider.CustomAuthenticationProvider;
import com.penta.template.config.security.service.CustomUserDetailsService;
import com.penta.template.web.user.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;


@Slf4j
@Configuration
public class SecurityConfig {

    /**
     * PasswordEncoder 빈 등록
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        PasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        return bCryptPasswordEncoder;
    }

    /**
     * UserDetailsService 빈 등록
     */
    @Bean
    public UserDetailsService userDetailsService(UserRepository userRepository) {
        return new CustomUserDetailsService(userRepository);
    }

    /**
     * 커스텀 인증 프로바이더
     */
    public AuthenticationProvider customAuthenticationProvider(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        return new CustomAuthenticationProvider(userDetailsService, passwordEncoder);
    }

    @Bean
    public AuthenticationEntryPoint authenticationEntryPoint(CustomYmlProperty customYmlProperty) {
        return new CustomAuthenticationEntryPoint(customYmlProperty);
    }


    @Bean
    public AccessDeniedHandler accessDeniedHandler(CustomYmlProperty customYmlProperty) {
        return new CustomAccessDeniedHandler(customYmlProperty);
    }




    /**
     * 시큐리티 필터 체인
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, UserRepository userRepository, CustomYmlProperty customYmlProperty) throws Exception {


        http
                .authorizeHttpRequests((auth) -> auth
                                // 정적 자원 설정
                                .requestMatchers(
                                        "/", "/options", "/composition", "/board", "/sample", "ok",
                                        "/ce_4.6.0.18_test/**",
                                        "/namo/**",
                                        "/css/**",
                                        "/js/**",
                                        "/images/**",
                                        "/favicon.ico",
                                        "/login",
                                        "/error",   // 4xx, 404, 500.html
                                        "/lib/**"
                                )
                                .permitAll()

                                // 회원가입 (화면/API)
                                // 로그인 (화면/API)
                                .requestMatchers("/user/login", "/api/user/login",
                                                 "/user/join", "/api/user/join").hasRole("ANONYMOUS")

                                .requestMatchers("/user/**", "/api/user/**", "/board/**", "/api/board/**").hasRole("USER")
//                                .requestMatchers("/auth/**", "/board/**", "/api/board/**").hasAnyRole("USER", "ADMIN")
//                                .requestMatchers("/admin/**").hasRole("ADMIN")
                                .anyRequest().authenticated()
                )
                .formLogin((form) -> form
                                .loginPage("/user/login")
                                .loginProcessingUrl("/api/user/login")
                                .usernameParameter("userId")
                                .passwordParameter("userPassword")
                        .successHandler((request, response, authentication) -> {
//                            HttpSession session = request.getSession(true);
//                            UserContext userContext = (UserContext) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//                            session.setAttribute("userId", userContext.getUserId());
                            log.info("로그인 성공 핸들러");
                            response.sendRedirect("/");
                        })
                        .failureHandler((request, response, exception) -> {
                            log.info("로그인 실패 핸들러");
                            response.sendRedirect("/");
                        })
                )
                .rememberMe((remember) -> remember
                        .alwaysRemember(true)   // RememberMeServices.onLoginSuccess 호출 결정 값
                        .userDetailsService(userDetailsService(null))
                        .tokenValiditySeconds(3600) // 토큰 유효 시간
                        .key("security")
                        .rememberMeParameter("remember-me")
                        .rememberMeCookieName("remember-me")
                )
                .headers(header -> header.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin))
                .cors(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)) // default

                .exceptionHandling((exception) -> exception
                        .authenticationEntryPoint(authenticationEntryPoint(null))
                        .accessDeniedHandler(accessDeniedHandler(null)))
                .authenticationProvider(customAuthenticationProvider(userDetailsService(null), passwordEncoder()))
        ;

        return http.build();

    }

}


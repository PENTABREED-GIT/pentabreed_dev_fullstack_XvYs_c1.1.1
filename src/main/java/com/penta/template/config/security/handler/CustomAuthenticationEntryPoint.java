package com.penta.template.config.security.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.penta.template.config.property.CustomYmlProperty;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

/**
 * 인증 에러 핸들러
 */
@Slf4j
@RequiredArgsConstructor
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final CustomYmlProperty customYmlProperty;

    private final ObjectMapper mapper = new ObjectMapper();


    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        log.info("[인증예외] 요청 url : {}", request.getRequestURI());
//        log.error("에러 ", authException);

//        ApiResponse apiResponse = ApiResponse.error(customYmlProperty.getKey("security.exception.auth"));
//        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
//        response.setCharacterEncoding("UTF-8");
//        response.setStatus(HttpStatus.OK.value());
//        response.getWriter().write(mapper.writeValueAsString(apiResponse));


        response.sendRedirect("/");


    }
}

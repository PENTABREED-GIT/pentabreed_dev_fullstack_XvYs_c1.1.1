package com.penta.template.web.user.controller;

import com.penta.template.common.response.ApiResponse;
import com.penta.template.config.security.context.UserContext;
import com.penta.template.web.user.vo.UserIdCheckVo;
import com.penta.template.web.user.vo.UserJoinVo;
import com.penta.template.web.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;



    @GetMapping("/")
    public String index() {
        return "main/main";
    }




    @GetMapping("/errorPage")
    public String errorPage() {
        return "errorPage";
    }



    /**
     * 로그인 화면
     */
    @GetMapping("/user/login")
    public String userLogin() {
        return "user/userLogin";
    }


    /**
     * 유저 메인 화면
     */
    @GetMapping("/user/main")
    public String userMain() {
        return "user/userMain";
    }



    /**
     * 회원가입 화면
     */
    @GetMapping("/user/join")
    public String userJoin() {
        return "user/userJoin";
    }


    /**
     * 회원가입 API
     */
    @ResponseBody
    @PostMapping("/api/user/join")
    public ApiResponse<?> joinApi(@RequestBody UserJoinVo userJoinVo) {
        log.info("userJoinRequest = {}", userJoinVo);
        Long seq = userService.join(userJoinVo);
        return new ApiResponse<>(seq);
    }

    /**
     * 중복 아이디 검사 API
     */
    @ResponseBody
    @PostMapping("/api/user/id/check")
    public ApiResponse<?> idCheck(@RequestBody UserIdCheckVo userIdCheckVo) {
        log.info("userIdCheckRequest = {}", userIdCheckVo);
        userService.idCheck(userIdCheckVo);
        return new ApiResponse<>();
    }


    /**
     * 자신의 정보 API
     */
    @ResponseBody
    @GetMapping("/api/user/me")
    public ApiResponse<?> userMe(@AuthenticationPrincipal UserContext userContext) {
        log.info("userContext = {}", userContext);
        Map<String, String> data = new LinkedHashMap<>();
        data.put("userId", userContext.getUserId());
        data.put("role", userContext.getRole().name());
        return new ApiResponse<>(data);
    }




}

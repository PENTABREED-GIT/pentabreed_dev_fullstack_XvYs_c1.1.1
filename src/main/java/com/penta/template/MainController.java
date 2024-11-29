package com.penta.template;

import com.penta.template.common.response.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.apache.groovy.util.Maps;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.support.HttpRequestHandlerServlet;

import java.util.*;

@Slf4j
@Controller
public class MainController {


    @GetMapping("/")
    public String main(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return "main/main";
    }

    @GetMapping("/options")
    public String options() {
        return "main/options";
    }

    @GetMapping("/composition")
    public String composition() {
        return "main/composition";
    }

    @GetMapping("/board")
    public String board() {
        return "main/board";
    }


    @ResponseBody
    @GetMapping("/menu")
    public ApiResponse<?> menu() {
        List<Map<String, String>> dataList = new ArrayList<>();
        Map<String,Object> dataMap = new LinkedHashMap<>();

        // DB 에서 정보 추출 할곳
        dataList.add(Maps.of("main", "/"));
        dataList.add(Maps.of("options", "/options"));
        dataList.add(Maps.of("composition", "/composition"));
        dataList.add(Maps.of("board", "/board"));
        dataList.add(Maps.of("샘플데이터 보기", "/sample"));
        dataList.add(Maps.of("샘플데이터 보기2", "/ok"));
        ApiResponse<?> response = new ApiResponse<>(dataList);
        return response;
    }

    @ResponseBody
    @GetMapping("/sample")
    public ApiResponse<?> sample() {

        List<Map<String, Object>> dataList = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            Map<String,Object> roopMap = new LinkedHashMap<>();
            roopMap.put("userName", "홍길동" + i);
            roopMap.put("age", i + 10);
            dataList.add(roopMap);
        }

        Map<String, Object> metaData = new HashMap<>();
        metaData.put("totalCount", dataList.size() * 2);

        ApiResponse<?> response = new ApiResponse<>(dataList, metaData);
        return response;

    }

    @ResponseBody
    @GetMapping("/ok")
    public ApiResponse<?> ok() {
        return new ApiResponse<>();
    }



    @ResponseBody
    @PostMapping("/post")
    public ApiResponse<?> post(@RequestBody Map<String, Object> dataMap) {
        log.info("파라미터 = {}", dataMap);
        ApiResponse<?> response = new ApiResponse<>();
        return response;
    }


}

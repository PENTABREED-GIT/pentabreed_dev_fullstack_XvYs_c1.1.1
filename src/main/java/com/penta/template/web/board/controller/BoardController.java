package com.penta.template.web.board.controller;

import com.penta.template.common.response.ApiResponse;
import com.penta.template.common.vo.PagingVo;
import com.penta.template.config.security.context.UserContext;
import com.penta.template.web.board.dto.BoardDto;
import com.penta.template.web.board.service.BoardService;
import com.penta.template.web.board.vo.BoardInsertVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Controller
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;


    @GetMapping("/board/form")
    public String boardForm() {
        return "/board/boardForm";
    }


    @GetMapping("/board/list")
    public String boardList() {
        return "/board/boardList";
    }


    @ResponseBody
    @PostMapping("/api/board/save")
    public ApiResponse<?> apiBoard(@RequestBody BoardInsertVo boardInsertVo) {

        UserContext userContext = (UserContext) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        log.info("userContext = {}", userContext);

        Long id = boardService.insertBoard(boardInsertVo);


        return new ApiResponse<>(id);

    }

    @ResponseBody
    @PostMapping("/api/board/list")
    public ApiResponse<?> apiBoardList(@RequestBody PagingVo pagingVo) {
        return boardService.selectBoardList(pagingVo);

    }

    @ResponseBody
    @GetMapping("/api/board/{id}")
    public ApiResponse<?> apiBoardId(@PathVariable(name="id") Long id) {
        BoardDto boardDto = boardService.selectBoardDetail(id);
        return new ApiResponse<>(boardDto);
    }

}

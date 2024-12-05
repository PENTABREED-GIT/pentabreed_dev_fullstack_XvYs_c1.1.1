package com.penta.template.web.board.service;

import com.penta.template.common.exception.BoardInsertException;
import com.penta.template.common.response.ApiResponse;
import com.penta.template.common.vo.PagingVo;
import com.penta.template.config.security.context.UserContext;
import com.penta.template.web.board.dto.BoardDto;
import com.penta.template.web.board.entity.Board;
import com.penta.template.web.board.repository.BoardRepository;
import com.penta.template.web.board.vo.BoardInsertVo;
import com.penta.template.web.user.entity.User;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static com.penta.template.web.board.entity.QBoard.board;
import static com.penta.template.web.user.entity.QUser.user;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    private final EntityManager em;
    private JPAQueryFactory jpaQueryFactory;

    @PostConstruct
    public void postconstruct() {
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }


    @Transactional
    public Long insertBoard(BoardInsertVo boardInsertVo) {


        try {

            UserContext userContext = (UserContext) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            User user = userContext.getUser();

            Board board = Board.builder()
                    .title(boardInsertVo.getTitle())
                    .content(boardInsertVo.getContent())
                    .user(user)
                    .build();

            boardRepository.save(board);
            return board.getId();


        } catch (Exception e) {
            e.printStackTrace();
            throw new BoardInsertException();
        }


    }

    public BoardDto selectBoardDetail(Long id) {
        Board board = boardRepository
                .findBoardById(id)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 게시글 입니다"));

        log.info("board Entity = {}", board);

        BoardDto boardDto = BoardDto.builder()
                .id(board.getId())
                .title(board.getTitle())
                .content(board.getContent())
                .build();

        log.info("boardDto = {}", boardDto);

        return boardDto;
    }

    public ApiResponse<List<BoardDto>> selectBoardList(PagingVo pagingVo) {

//        QBoard board = QBoard.board;


        // 토탈 카운트 쿼리 분리
        long totalCount = jpaQueryFactory
                .select(board)
                .from(board)
                .innerJoin(board.user, user).fetchJoin()
                .fetch().size();


        // 데이터 쿼리
        List<BoardDto> boardDtoList = jpaQueryFactory.select(
                        Projections.constructor(BoardDto.class,
                                board,
                                user
                        )
                )
                .from(board)
                .limit(pagingVo.getLimit())
                .offset(pagingVo.getOffset())
                .innerJoin(board.user, user).fetchJoin()
                .orderBy(board.regDate.desc())
                .fetch();

        for (BoardDto boardDto : boardDtoList) {
            log.info("boardDto = {}", boardDto);
        }

        Map<String, Object> metaData = new LinkedHashMap<>();
        metaData.put("totalCount", totalCount);


        return new ApiResponse<>(boardDtoList, metaData);
    }
}

package com.penta.template.web.board.repository;

import com.penta.template.web.board.dto.BoardDto;
import com.penta.template.web.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {

    Optional<Board> findBoardById(@Param("id") Long id);
    


    @Query("select new com.penta.template.web.board.dto.BoardDto(b,u)  from Board b join fetch User u on u.userId = b.user.userId")
    List<BoardDto> findBoardFetch();

}

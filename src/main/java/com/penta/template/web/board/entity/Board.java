package com.penta.template.web.board.entity;

import com.penta.template.common.entity.BaseEntity;
import com.penta.template.web.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder @Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "user")
public class Board extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String title;       // 제목

    @Lob()
    private String content;     // 에디터로 작성한 내용

    @ManyToOne(fetch = FetchType.LAZY)  // 기본 전략은 지연로딩 ...
    @JoinColumn(name="user_pk") // User 엔티티의 id 와 userId 와 헷갈려서 user_pk 라고 명시
    private User user;

}

package io.ananworld.postservice.global.domain.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@ToString
@Entity
@Getter
@Table(name="tags")
@NoArgsConstructor
public class Tag extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="tag_id")
    public Long tagId;

    @Column(name = "tag_name", length = 30, unique = true)
    public String tagName;
}

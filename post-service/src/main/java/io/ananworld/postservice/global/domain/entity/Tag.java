package io.ananworld.postservice.global.domain.entity;

import io.ananworld.postservice.global.domain.dto.TagDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@ToString
@Entity
@Getter
@Table(name="tags")
@NoArgsConstructor
@AllArgsConstructor
public class Tag extends BaseEntity{

    @Id
    @Column(name = "tag_name", length = 30)
    public String tagName;

    public TagDto toDto() {
        return new TagDto(this.tagName);
    }
}

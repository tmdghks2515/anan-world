package io.ananworld.authservice.repository.custom.impl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import io.ananworld.authservice.domain.dto.UserDto;
import io.ananworld.authservice.domain.entity.QUser;
import io.ananworld.authservice.domain.entity.User;
import io.ananworld.authservice.repository.custom.UserRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

import static io.ananworld.authservice.domain.entity.QUser.user;

@Repository
public class UserRepositoryImpl implements UserRepositoryCustom {

    private JPAQueryFactory query;

    @Autowired
    public UserRepositoryImpl(JPAQueryFactory query) {
        super();
        this.query = query;
    }

    @Override
    public List<UserDto> list() {

        return query.select(
                Projections.fields(UserDto.class,
                        user.id,
                        user.username,
                        user.name,
                        user.email
                )
        )
                .from(user)
                .fetch();
    }
}

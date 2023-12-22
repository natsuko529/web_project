package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Table //сохраняем как таблицу
@Data //генерирует разные методы и конструкторы
@Entity //
public class UserEntity implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    @OneToMany(mappedBy = "user")
    private List<EventEntity> events;

    @OneToMany(mappedBy = "user")
    private List<PayEntity> user_payments;

    @Column
    private String name;

    @Column
    private String surname;

    @Column
    private LocalDate date;

    @Column
    private Integer weight;

    @Column
    private Integer height;

    @Column
    private Integer children;

    @Column
    private String phone;

    @Column
    private String email;

    @Column
    private String password;

    @Column
    private String role;

    @Column
    private String photo;

    @Column
    private String RefreshToken;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_" + role));
    }



    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}


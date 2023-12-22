package com.example.demo.dto;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UserDto {
    private String name;
    private String surname;
    private String gender;
    private LocalDate date;
    private String email;
    private String password;
    private Integer weight;
    private Integer height;
    private Integer children;
    private String phone;
}

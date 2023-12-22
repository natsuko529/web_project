package com.example.demo.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EventDTO {
    private String title;
    private LocalDate date;
    private LocalTime time;
    private String address;
    private Integer price;
}

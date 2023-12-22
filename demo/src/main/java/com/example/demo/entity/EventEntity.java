package com.example.demo.entity;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Table
@Entity
@Data
public class EventEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @OneToMany(mappedBy = "event")
    private List<PayEntity> payments;

    @Column
    private String title;

    @Column
    private LocalDate date;

    @Column
    private LocalTime time;

    @Column
    private String address;

    @Column
    private Integer price;
}

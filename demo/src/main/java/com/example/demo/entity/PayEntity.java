package com.example.demo.entity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Table
@Entity
@Data
public class PayEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private EventEntity event;

    @Column
    private LocalDateTime payTime;

    @Column
    private Integer price;

    @Column
    private String payType;
}

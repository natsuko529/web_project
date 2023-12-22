package com.example.demo.service;

import com.example.demo.dto.EventDTO;
import com.example.demo.entity.EventEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.UserRepository;

import jakarta.transaction.TransactionScoped;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class EventService {
    private final EventRepository Repository;

    public EventService(EventRepository Repository) {
        this.Repository = Repository;
    }

    public List<EventEntity> findAll() {
        return Repository.findAll();
    }

    public EventEntity findById(long Id) {
        return Repository.findById(Id);
    }

    public EventEntity findByTitle(String Title) {
        return Repository.findByTitle(Title);
    }

    @TransactionScoped
    public EventEntity createEvent(EventDTO eventDto) {
        EventEntity event = new EventEntity();
        event.setTitle(eventDto.getTitle());
        event.setDate(eventDto.getDate());
        event.setTime(eventDto.getTime());
        event.setAddress(eventDto.getAddress());
        event.setPrice(eventDto.getPrice());
        return Repository.save(event);
    }

    void save(EventEntity TheEvent) {
        Repository.save(TheEvent);
    }
}

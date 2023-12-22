package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.EventDTO;
import com.example.demo.entity.EventEntity;
import com.example.demo.service.EventService;

@RestController
@RequestMapping("/event")
public class EventController {
    private final EventService Service;

    public EventController(EventService Service) {
        this.Service = Service;
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<EventEntity> findAll() {
        return Service.findAll();
    }

    @RequestMapping(value = "/{Id}", method = RequestMethod.GET)
    public EventEntity findById(@PathVariable long Id) {
        return Service.findById(Id);
    }

    @RequestMapping(value = "/{Title}", method = RequestMethod.GET)
    public EventEntity findByTitle(@PathVariable String Title) {
        return Service.findByTitle(Title);
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public EventEntity createEvent(@RequestBody EventDTO eventDto) {
        return Service.createEvent(eventDto);
    }
}

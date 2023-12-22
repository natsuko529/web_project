package com.example.demo.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.UserDto;
import com.example.demo.entity.UserEntity;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService Service;

    public UserController(UserService Service) {
        this.Service = Service;
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<UserEntity> findAll() {
        return Service.findAll();
    }

    @RequestMapping(value = "/update/{Id}", method = RequestMethod.PUT)
    public UserEntity updateRole(@PathVariable long Id, @RequestBody String newRole) {
        return Service.updateRole(Id, newRole);
    }

    @RequestMapping(value = "/{Id}", method = RequestMethod.GET)
    public UserEntity findById(@PathVariable long Id) {
        return Service.findById(Id);
    }

    @CrossOrigin
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public String registerNewUser(@RequestBody UserDto userDto) {
        return Service.registerNewUser(userDto);
    }

    @GetMapping
    public UserEntity findByEmail() {
        return Service.findByEmail(getCurrentUserLogin());
    }

    public String getCurrentUserLogin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    @RequestMapping(value = "/updateduser", method = RequestMethod.PUT)
    public UserEntity userUpdate(@RequestBody UserDto userDto) {
        return Service.userUpdate(userDto);
    }

}

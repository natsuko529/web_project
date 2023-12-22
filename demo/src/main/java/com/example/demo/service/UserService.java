package com.example.demo.service;

import com.example.demo.dto.UserDto;
import com.example.demo.entity.UserEntity;
import com.example.demo.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository Repository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository Repository, PasswordEncoder passwordEncoder) {
        this.Repository = Repository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserEntity findById(long Id) {
        return Repository.findById(Id);
    }

    public UserEntity findByEmail(String Email) {
        return Repository.findByEmail(Email);
    }

    void save(UserEntity TheUser) {
        Repository.save(TheUser);
    }

    @Transactional
    public String registerNewUser(@RequestBody UserDto userDto) {
        try {
            if (Repository.findByEmail(userDto.getEmail()) != null) {
                throw new RuntimeException("This Email even exist!");
            }
        } catch (Exception e) {
            return "This Email even exist!";
        }
        UserEntity user = new UserEntity();
        user.setName(userDto.getName());
        user.setSurname(userDto.getSurname());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setWeight(userDto.getWeight());
        user.setHeight(userDto.getHeight());
        user.setChildren(userDto.getChildren());
        user.setPhone(userDto.getPhone());
        user.setDate(userDto.getDate());
        user.setRole("USER");
        // user.setPhoto(userDto.getPhoto());
        // DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        // user.setDate(LocalDate.parse(userDto.getDate(), formatter));

        Repository.save(user);
        return "^_^";
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = Repository.findByEmail(username);
        if (user != null)
            return user;
        else
            throw new UsernameNotFoundException("User not found -_-");
    }

    @Transactional
    public void updateToken(String token, String username) {
        UserEntity user = Repository.findByEmail(username);
        user.setRefreshToken(token);
        Repository.save(user);
    }

    public String getToken(String username) {
        UserEntity user = Repository.findByEmail(username);
        return user.getRefreshToken();
    }

    @Transactional
    public UserEntity userUpdate(@RequestBody UserDto userDto) {
        UserEntity user = findByEmail(userDto.getEmail());
        user.setName(userDto.getName());
        user.setSurname(userDto.getSurname());
        user.setWeight(userDto.getWeight());
        user.setHeight(userDto.getHeight());
        user.setChildren(userDto.getChildren());
        user.setPhone(userDto.getPhone());
        user.setDate(userDto.getDate());
        Repository.save(user);
        return user;
    }

    public List<UserEntity> findAll() {
        return Repository.findAll();
    }

    public UserEntity updateRole(long id, String role) {
        UserEntity user = Repository.findById(id);
        user.setRole(role);
        Repository.save(user);
        return user;
    }

}

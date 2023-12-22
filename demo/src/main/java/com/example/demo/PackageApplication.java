package com.example.demo;

import com.example.demo.dto.UserDto;
import com.example.demo.service.UserService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PackageApplication {

	//	@Autowired
//	UserService userService;
	public static void main(String[] args) {
		SpringApplication.run(PackageApplication.class, args);
	}

//	@PostConstruct
//	void setup(){
//		UserDto user = new UserDto();
//		user.setEmail("alia@mail.ru");
//		user.setPassword("1234");
//		userService.registerNewUser(user);
//	}
}

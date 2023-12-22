package com.example.demo.repository;

import com.example.demo.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository <UserEntity, Long>{
    UserEntity findById(long Id);
    UserEntity findByEmail(String Email);
//    UserEntity findByName(String Name);


}

package com.example.demo.repository;
import com.example.demo.entity.EventEntity;
import com.example.demo.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface EventRepository extends JpaRepository <EventEntity, Long>{
    EventEntity findById(long Id);
    EventEntity findByTitle(String Title);
}

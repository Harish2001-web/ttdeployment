package com.example.demo.Service;

import com.example.demo.model.Room;
import com.example.demo.repository.RoomRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RoomService {

    private final RoomRepository repository;

    public RoomService(RoomRepository repository){
        this.repository = repository;
    }

    public Room addRoom(Room room){
        return repository.save(room);
    }

    public List<Room> getAllRooms(){
        return repository.findAll();
    }

    public List<Room> getAvailableRooms(){
        return repository.findByAvailableTrue();
    }

    public List<Room> getRoomsByType(String type){
        return repository.findByType(type);
    }

    public void deleteRoom(Long id){
        repository.deleteById(id);
    }
}
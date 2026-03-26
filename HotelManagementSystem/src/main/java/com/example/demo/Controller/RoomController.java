package com.example.demo.Controller;

import com.example.demo.model.Room;
import com.example.demo.Service.RoomService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "http://localhost:5173")
public class RoomController {

    private final RoomService service;

    public RoomController(RoomService service){
        this.service = service;
    }

    @PostMapping
    public Room addRoom(@RequestBody Room room){
        return service.addRoom(room);
    }

    @GetMapping
    public List<Room> getRooms(){
        return service.getAllRooms();
    }

    @GetMapping("/available")
    public List<Room> availableRooms(){
        return service.getAvailableRooms();
    }

    @GetMapping("/type/{type}")
    public List<Room> getByType(@PathVariable String type){
        return service.getRoomsByType(type);
    }

    @DeleteMapping("/{id}")
    public void deleteRoom(@PathVariable Long id){
        service.deleteRoom(id);
    }
}
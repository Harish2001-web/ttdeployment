package com.example.demo.model;

import jakarta.persistence.*;

@Entity
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomNumber;
    private String type;
    private double price;
    private boolean available;

    public Room(){}

    public Long getId(){ return id; }

    public String getRoomNumber(){ return roomNumber; }
    public void setRoomNumber(String roomNumber){ this.roomNumber = roomNumber; }

    public String getType(){ return type; }
    public void setType(String type){ this.type = type; }

    public double getPrice(){ return price; }
    public void setPrice(double price){ this.price = price; }

    public boolean isAvailable(){ return available; }
    public void setAvailable(boolean available){ this.available = available; }
}
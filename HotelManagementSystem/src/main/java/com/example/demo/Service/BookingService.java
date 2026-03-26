package com.example.demo.Service;

import com.example.demo.model.Booking;
import com.example.demo.model.Room;
import com.example.demo.repository.BookingRepository;
import com.example.demo.repository.RoomRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;

    public BookingService(BookingRepository bookingRepository,
                          RoomRepository roomRepository){
        this.bookingRepository = bookingRepository;
        this.roomRepository = roomRepository;
    }

    public Booking createBooking(Booking booking){
        // Fetch the room from the database using the roomId from the booking
        Long roomId = booking.getRoomId(); // Make sure Booking has a getRoomId() method
        Room room = roomRepository.findById(roomId).orElse(null);
        if (room == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Room not found");
        }
        if (!room.isAvailable()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Room is already booked");
        }
        room.setAvailable(false);
        roomRepository.save(room);

        booking.setRoom(room); // Set the actual Room entity
        return bookingRepository.save(booking);
    }
}
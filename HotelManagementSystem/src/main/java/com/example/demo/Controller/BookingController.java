package com.example.demo.Controller;

import com.example.demo.model.Booking;
import com.example.demo.Service.BookingService;
import com.example.demo.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    private final BookingService service;
    private final BookingRepository bookingRepository;

    @Autowired
    public BookingController(BookingService service, BookingRepository bookingRepository){
        this.service = service;
        this.bookingRepository = bookingRepository;
    }

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking){
        return service.createBooking(booking);
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}
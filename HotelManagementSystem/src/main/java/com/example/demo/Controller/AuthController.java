package com.example.demo.Controller;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

import com.example.demo.model.LoginRequest;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest request){

        Map<String,String> response = new HashMap<>();

        // simple login validation
        if(request.getUsername().equals("admin") &&
           request.getPassword().equals("admin123")){

            response.put("token","dummy-token");
            response.put("username","admin");
            response.put("message","Login Successful");

        } else {

            response.put("message","Invalid username or password");

        }

        return response;
    }
}
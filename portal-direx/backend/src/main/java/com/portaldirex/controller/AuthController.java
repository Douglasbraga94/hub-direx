package com.portaldirex.controller;

import com.portaldirex.dto.AuthResponse;
import com.portaldirex.dto.CadastroRequest;
import com.portaldirex.dto.LoginRequest;
import com.portaldirex.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request,
                                             HttpServletRequest httpRequest) {
        return ResponseEntity.ok(authService.login(request, httpRequest));
    }
    
    @PostMapping("/cadastro")
    public ResponseEntity<AuthResponse> cadastro(@Valid @RequestBody CadastroRequest request,
                                                HttpServletRequest httpRequest) {
        return ResponseEntity.ok(authService.cadastro(request, httpRequest));
    }
}

package com.portaldirex.controller;

import com.portaldirex.model.Sistema;
import com.portaldirex.service.SistemaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/sistemas")
@RequiredArgsConstructor
public class SistemaController {
    
    private final SistemaService sistemaService;
    
    @GetMapping
    public ResponseEntity<List<Sistema>> listarTodos() {
        return ResponseEntity.ok(sistemaService.listarTodos());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Sistema> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(sistemaService.buscarPorId(id));
    }
}

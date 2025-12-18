package com.portaldirex.service;

import com.portaldirex.model.Sistema;
import com.portaldirex.repository.SistemaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SistemaService {
    
    private final SistemaRepository sistemaRepository;
    
    public List<Sistema> listarTodos() {
        return sistemaRepository.findAll();
    }
    
    public Sistema buscarPorId(Long id) {
        return sistemaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Sistema não encontrado"));
    }
}

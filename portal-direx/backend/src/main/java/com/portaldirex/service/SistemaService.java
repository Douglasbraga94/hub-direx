package com.portaldirex.service;

import com.portaldirex.exception.ResourceNotFoundException;
import com.portaldirex.model.Sistema;
import com.portaldirex.repository.SistemaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SistemaService {
    
    private final SistemaRepository sistemaRepository;
    
    @Transactional(readOnly = true)
    public List<Sistema> listarTodos() {
        return sistemaRepository.findAll();
    }
    
    @Transactional(readOnly = true)
    public Sistema buscarPorId(Long id) {
        return sistemaRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Sistema", "id", id));
    }
}

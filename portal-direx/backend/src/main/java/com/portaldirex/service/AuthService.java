package com.portaldirex.service;

import com.portaldirex.dto.AuthResponse;
import com.portaldirex.dto.CadastroRequest;
import com.portaldirex.dto.LoginRequest;
import com.portaldirex.dto.UsuarioDTO;
import com.portaldirex.exception.BusinessException;
import com.portaldirex.model.Usuario;
import com.portaldirex.repository.UsuarioRepository;
import com.portaldirex.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    
    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new BadCredentialsException("Email ou senha inválidos"));
        
        if (!passwordEncoder.matches(request.getSenha(), usuario.getSenha())) {
            throw new BadCredentialsException("Email ou senha inválidos");
        }
        
        String token = jwtUtil.generateToken(usuario.getEmail());
        
        return new AuthResponse(
            token,
            new UsuarioDTO(usuario.getId(), usuario.getNome(), usuario.getEmail())
        );
    }
    
    @Transactional
    public AuthResponse cadastro(CadastroRequest request) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new BusinessException("Este email já está cadastrado no sistema");
        }
        
        Usuario usuario = new Usuario();
        usuario.setId(java.util.UUID.randomUUID().toString());
        usuario.setNome(request.getNome());
        usuario.setEmail(request.getEmail());
        usuario.setSenha(passwordEncoder.encode(request.getSenha()));
        
        usuario = usuarioRepository.save(usuario);
        
        String token = jwtUtil.generateToken(usuario.getEmail());
        
        return new AuthResponse(
            token,
            new UsuarioDTO(usuario.getId(), usuario.getNome(), usuario.getEmail())
        );
    }
}

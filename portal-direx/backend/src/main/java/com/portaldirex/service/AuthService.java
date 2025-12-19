package com.portaldirex.service;

import com.portaldirex.dto.AuthResponse;
import com.portaldirex.dto.CadastroRequest;
import com.portaldirex.dto.LoginRequest;
import com.portaldirex.dto.UsuarioDTO;
import com.portaldirex.model.AuditoriaLogin;
import com.portaldirex.model.Usuario;
import com.portaldirex.repository.AuditoriaLoginRepository;
import com.portaldirex.repository.UsuarioRepository;
import com.portaldirex.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UsuarioRepository usuarioRepository;
    private final AuditoriaLoginRepository auditoriaRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    
    public AuthResponse login(LoginRequest request, HttpServletRequest httpRequest) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getSenha())
            );
            
            Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
            
            String token = jwtUtil.generateToken(usuario.getEmail());
            
            // Registrar auditoria
            registrarAuditoria(usuario.getId(), httpRequest, "SUCCESS");
            
            return new AuthResponse(
                token,
                new UsuarioDTO(usuario.getId(), usuario.getNome(), usuario.getEmail())
            );
        } catch (Exception e) {
            throw new RuntimeException("Credenciais inválidas");
        }
    }
    
    public AuthResponse cadastro(CadastroRequest request, HttpServletRequest httpRequest) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }
        
        Usuario usuario = new Usuario();
        usuario.setId(java.util.UUID.randomUUID().toString());
        usuario.setNome(request.getNome());
        usuario.setEmail(request.getEmail());
        usuario.setSenha(passwordEncoder.encode(request.getSenha()));
        
        usuario = usuarioRepository.save(usuario);
        
        String token = jwtUtil.generateToken(usuario.getEmail());
        
        // Registrar auditoria
        registrarAuditoria(usuario.getId(), httpRequest, "SUCCESS");
        
        return new AuthResponse(
            token,
            new UsuarioDTO(usuario.getId(), usuario.getNome(), usuario.getEmail())
        );
    }
    
    private void registrarAuditoria(String usuarioId, HttpServletRequest request, String status) {
        AuditoriaLogin auditoria = new AuditoriaLogin();
        auditoria.setUsuarioId(usuarioId);
        auditoria.setIpLogin(getClientIP(request));
        auditoria.setUserAgent(request.getHeader("User-Agent"));
        auditoria.setStatusLogin(status);
        auditoriaRepository.save(auditoria);
    }
    
    private String getClientIP(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0];
    }
}

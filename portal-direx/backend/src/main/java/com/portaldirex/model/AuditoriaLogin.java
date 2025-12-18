package com.portaldirex.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "auditoria_login")
@Data
public class AuditoriaLogin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuario_id")
    private Long usuarioId;

    @Column(name = "data_login")
    private LocalDateTime dataLogin;

    @Column(name = "ip_login")
    private String ipLogin;

    @Column(name = "user_agent")
    private String userAgent;

    @Column(name = "status_login")
    private String statusLogin;

    @PrePersist
    protected void onCreate() {
        dataLogin = LocalDateTime.now();
    }
}

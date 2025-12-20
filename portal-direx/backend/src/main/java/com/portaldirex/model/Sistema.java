package com.portaldirex.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "sistemas")
@Data
public class Sistema {
    @Id
    @Column(columnDefinition = "VARCHAR(36)")
    private String id;

    @Column(nullable = false)
    private String nome;

    private String sigla;

    private String url;

    @Column(name = "type")
    private String type;

    @Column(name = "dt_criacao")
    private LocalDateTime dtCriacao;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Sistema de gestores será implementado futuramente se necessário

    @PrePersist
    protected void onCreate() {
        dtCriacao = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

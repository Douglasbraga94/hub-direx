package com.portaldirex.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "gestor")
@Data
public class Gestor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    private String sigla;
}

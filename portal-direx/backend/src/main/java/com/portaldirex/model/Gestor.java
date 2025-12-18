package com.portaldirex.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "gestor")
@Data
public class Gestor {
    @Id
    @Column(columnDefinition = "VARCHAR(36)")
    private String id;

    @Column(nullable = false)
    private String nome;

    private String sigla;
}

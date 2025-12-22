package com.portaldirex.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class StartupDiagnostic implements CommandLineRunner {
    
    private static final Logger logger = LoggerFactory.getLogger(StartupDiagnostic.class);
    
    private final JdbcTemplate jdbcTemplate;
    
    public StartupDiagnostic(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    
    @Override
    public void run(String... args) throws Exception {
        logger.info("========================================");
        logger.info("DIAGNÓSTICO DA TABELA USUARIOS");
        logger.info("========================================");
        
        try {
            // Executa DESCRIBE usuarios
            List<Map<String, Object>> columns = jdbcTemplate.queryForList("DESCRIBE usuarios");
            
            logger.info("Estrutura da tabela 'usuarios':");
            logger.info("----------------------------------------");
            
            for (Map<String, Object> column : columns) {
                logger.info("Campo: {} | Tipo: {} | Null: {} | Key: {} | Default: {} | Extra: {}", 
                    column.get("Field"),
                    column.get("Type"),
                    column.get("Null"),
                    column.get("Key"),
                    column.get("Default"),
                    column.get("Extra")
                );
            }
            
            logger.info("----------------------------------------");
            logger.info("Total de colunas: {}", columns.size());
            
            // Verifica se a coluna 'senha' existe
            boolean senhaExists = columns.stream()
                .anyMatch(col -> "senha".equals(col.get("Field")));
            
            if (senhaExists) {
                logger.info("✓ Coluna 'senha' ENCONTRADA na tabela!");
            } else {
                logger.error("✗ Coluna 'senha' NÃO ENCONTRADA na tabela!");
            }
            
            // Mostra o banco de dados conectado
            String dbName = jdbcTemplate.queryForObject("SELECT DATABASE()", String.class);
            logger.info("Banco de dados conectado: {}", dbName);
            
        } catch (Exception e) {
            logger.error("Erro ao executar diagnóstico: {}", e.getMessage(), e);
        }
        
        logger.info("========================================");
    }
}

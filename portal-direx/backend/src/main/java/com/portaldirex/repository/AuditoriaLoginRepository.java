package com.portaldirex.repository;

import com.portaldirex.model.AuditoriaLogin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuditoriaLoginRepository extends JpaRepository<AuditoriaLogin, Long> {
}

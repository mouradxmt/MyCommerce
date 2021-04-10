package com.mmtechy.commerce.repository;

import com.mmtechy.commerce.domain.Vente;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Vente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VenteRepository extends JpaRepository<Vente, Long> {}

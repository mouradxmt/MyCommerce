package com.mmtechy.commerce.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mmtechy.commerce.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class VenteTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Vente.class);
        Vente vente1 = new Vente();
        vente1.setId(1L);
        Vente vente2 = new Vente();
        vente2.setId(vente1.getId());
        assertThat(vente1).isEqualTo(vente2);
        vente2.setId(2L);
        assertThat(vente1).isNotEqualTo(vente2);
        vente1.setId(null);
        assertThat(vente1).isNotEqualTo(vente2);
    }
}

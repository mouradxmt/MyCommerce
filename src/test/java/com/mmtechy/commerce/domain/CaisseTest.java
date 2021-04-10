package com.mmtechy.commerce.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mmtechy.commerce.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CaisseTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Caisse.class);
        Caisse caisse1 = new Caisse();
        caisse1.setId(1L);
        Caisse caisse2 = new Caisse();
        caisse2.setId(caisse1.getId());
        assertThat(caisse1).isEqualTo(caisse2);
        caisse2.setId(2L);
        assertThat(caisse1).isNotEqualTo(caisse2);
        caisse1.setId(null);
        assertThat(caisse1).isNotEqualTo(caisse2);
    }
}

package com.mmtechy.commerce.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Caisse.
 */
@Entity
@Table(name = "caisse")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Caisse implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "argent_retraite")
    private Double argentRetraite;

    @Column(name = "argent_depose")
    private Double argentDepose;

    @Column(name = "caisse_attendu")
    private Double caisseAttendu;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Caisse id(Long id) {
        this.id = id;
        return this;
    }

    public Double getArgentRetraite() {
        return this.argentRetraite;
    }

    public Caisse argentRetraite(Double argentRetraite) {
        this.argentRetraite = argentRetraite;
        return this;
    }

    public void setArgentRetraite(Double argentRetraite) {
        this.argentRetraite = argentRetraite;
    }

    public Double getArgentDepose() {
        return this.argentDepose;
    }

    public Caisse argentDepose(Double argentDepose) {
        this.argentDepose = argentDepose;
        return this;
    }

    public void setArgentDepose(Double argentDepose) {
        this.argentDepose = argentDepose;
    }

    public Double getCaisseAttendu() {
        return this.caisseAttendu;
    }

    public Caisse caisseAttendu(Double caisseAttendu) {
        this.caisseAttendu = caisseAttendu;
        return this;
    }

    public void setCaisseAttendu(Double caisseAttendu) {
        this.caisseAttendu = caisseAttendu;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Caisse)) {
            return false;
        }
        return id != null && id.equals(((Caisse) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Caisse{" +
            "id=" + getId() +
            ", argentRetraite=" + getArgentRetraite() +
            ", argentDepose=" + getArgentDepose() +
            ", caisseAttendu=" + getCaisseAttendu() +
            "}";
    }
}

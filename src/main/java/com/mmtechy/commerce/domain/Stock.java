package com.mmtechy.commerce.domain;

import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Stock.
 */
@Entity
@Table(name = "stock")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Stock implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_entree")
    private LocalDate dateEntree;

    @Column(name = "fournisseur")
    private String fournisseur;

    @Column(name = "libelle")
    private String libelle;

    @Column(name = "quantite")
    private Integer quantite;

    @Column(name = "montant_achat_ttc")
    private Double montantAchatTTC;

    @Column(name = "date_paiement")
    private LocalDate datePaiement;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Stock id(Long id) {
        this.id = id;
        return this;
    }

    public LocalDate getDateEntree() {
        return this.dateEntree;
    }

    public Stock dateEntree(LocalDate dateEntree) {
        this.dateEntree = dateEntree;
        return this;
    }

    public void setDateEntree(LocalDate dateEntree) {
        this.dateEntree = dateEntree;
    }

    public String getFournisseur() {
        return this.fournisseur;
    }

    public Stock fournisseur(String fournisseur) {
        this.fournisseur = fournisseur;
        return this;
    }

    public void setFournisseur(String fournisseur) {
        this.fournisseur = fournisseur;
    }

    public String getLibelle() {
        return this.libelle;
    }

    public Stock libelle(String libelle) {
        this.libelle = libelle;
        return this;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public Integer getQuantite() {
        return this.quantite;
    }

    public Stock quantite(Integer quantite) {
        this.quantite = quantite;
        return this;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
    }

    public Double getMontantAchatTTC() {
        return this.montantAchatTTC;
    }

    public Stock montantAchatTTC(Double montantAchatTTC) {
        this.montantAchatTTC = montantAchatTTC;
        return this;
    }

    public void setMontantAchatTTC(Double montantAchatTTC) {
        this.montantAchatTTC = montantAchatTTC;
    }

    public LocalDate getDatePaiement() {
        return this.datePaiement;
    }

    public Stock datePaiement(LocalDate datePaiement) {
        this.datePaiement = datePaiement;
        return this;
    }

    public void setDatePaiement(LocalDate datePaiement) {
        this.datePaiement = datePaiement;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Stock)) {
            return false;
        }
        return id != null && id.equals(((Stock) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Stock{" +
            "id=" + getId() +
            ", dateEntree='" + getDateEntree() + "'" +
            ", fournisseur='" + getFournisseur() + "'" +
            ", libelle='" + getLibelle() + "'" +
            ", quantite=" + getQuantite() +
            ", montantAchatTTC=" + getMontantAchatTTC() +
            ", datePaiement='" + getDatePaiement() + "'" +
            "}";
    }
}

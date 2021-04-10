package com.mmtechy.commerce.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Produit.
 */
@Entity
@Table(name = "produit")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Produit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "libelle")
    private String libelle;

    @Column(name = "categorie")
    private String categorie;

    @Column(name = "prix_vente")
    private Double prixVente;

    @Column(name = "prix_achat")
    private Double prixAchat;

    @Column(name = "t_va")
    private Double tVA;

    @ManyToOne
    @JsonIgnoreProperties(value = { "client", "produits" }, allowSetters = true)
    private Vente vente;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Produit id(Long id) {
        this.id = id;
        return this;
    }

    public String getLibelle() {
        return this.libelle;
    }

    public Produit libelle(String libelle) {
        this.libelle = libelle;
        return this;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public String getCategorie() {
        return this.categorie;
    }

    public Produit categorie(String categorie) {
        this.categorie = categorie;
        return this;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public Double getPrixVente() {
        return this.prixVente;
    }

    public Produit prixVente(Double prixVente) {
        this.prixVente = prixVente;
        return this;
    }

    public void setPrixVente(Double prixVente) {
        this.prixVente = prixVente;
    }

    public Double getPrixAchat() {
        return this.prixAchat;
    }

    public Produit prixAchat(Double prixAchat) {
        this.prixAchat = prixAchat;
        return this;
    }

    public void setPrixAchat(Double prixAchat) {
        this.prixAchat = prixAchat;
    }

    public Double gettVA() {
        return this.tVA;
    }

    public Produit tVA(Double tVA) {
        this.tVA = tVA;
        return this;
    }

    public void settVA(Double tVA) {
        this.tVA = tVA;
    }

    public Vente getVente() {
        return this.vente;
    }

    public Produit vente(Vente vente) {
        this.setVente(vente);
        return this;
    }

    public void setVente(Vente vente) {
        this.vente = vente;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Produit)) {
            return false;
        }
        return id != null && id.equals(((Produit) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Produit{" +
            "id=" + getId() +
            ", libelle='" + getLibelle() + "'" +
            ", categorie='" + getCategorie() + "'" +
            ", prixVente=" + getPrixVente() +
            ", prixAchat=" + getPrixAchat() +
            ", tVA=" + gettVA() +
            "}";
    }
}

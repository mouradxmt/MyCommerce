package com.mmtechy.commerce.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Vente.
 */
@Entity
@Table(name = "vente")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Vente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_vente")
    private LocalDate dateVente;

    @Column(name = "nom_revendeur")
    private String nomRevendeur;

    @Column(name = "mode_paiement")
    private String modePaiement;

    @Column(name = "montant_vente")
    private Double montantVente;

    @ManyToOne
    @JsonIgnoreProperties(value = { "ventes" }, allowSetters = true)
    private Client client;

    @OneToMany(mappedBy = "vente")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "vente" }, allowSetters = true)
    private Set<Produit> produits = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Vente id(Long id) {
        this.id = id;
        return this;
    }

    public LocalDate getDateVente() {
        return this.dateVente;
    }

    public Vente dateVente(LocalDate dateVente) {
        this.dateVente = dateVente;
        return this;
    }

    public void setDateVente(LocalDate dateVente) {
        this.dateVente = dateVente;
    }

    public String getNomRevendeur() {
        return this.nomRevendeur;
    }

    public Vente nomRevendeur(String nomRevendeur) {
        this.nomRevendeur = nomRevendeur;
        return this;
    }

    public void setNomRevendeur(String nomRevendeur) {
        this.nomRevendeur = nomRevendeur;
    }

    public String getModePaiement() {
        return this.modePaiement;
    }

    public Vente modePaiement(String modePaiement) {
        this.modePaiement = modePaiement;
        return this;
    }

    public void setModePaiement(String modePaiement) {
        this.modePaiement = modePaiement;
    }

    public Double getMontantVente() {
        return this.montantVente;
    }

    public Vente montantVente(Double montantVente) {
        this.montantVente = montantVente;
        return this;
    }

    public void setMontantVente(Double montantVente) {
        this.montantVente = montantVente;
    }

    public Client getClient() {
        return this.client;
    }

    public Vente client(Client client) {
        this.setClient(client);
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Set<Produit> getProduits() {
        return this.produits;
    }

    public Vente produits(Set<Produit> produits) {
        this.setProduits(produits);
        return this;
    }

    public Vente addProduit(Produit produit) {
        this.produits.add(produit);
        produit.setVente(this);
        return this;
    }

    public Vente removeProduit(Produit produit) {
        this.produits.remove(produit);
        produit.setVente(null);
        return this;
    }

    public void setProduits(Set<Produit> produits) {
        if (this.produits != null) {
            this.produits.forEach(i -> i.setVente(null));
        }
        if (produits != null) {
            produits.forEach(i -> i.setVente(this));
        }
        this.produits = produits;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Vente)) {
            return false;
        }
        return id != null && id.equals(((Vente) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Vente{" +
            "id=" + getId() +
            ", dateVente='" + getDateVente() + "'" +
            ", nomRevendeur='" + getNomRevendeur() + "'" +
            ", modePaiement='" + getModePaiement() + "'" +
            ", montantVente=" + getMontantVente() +
            "}";
    }
}

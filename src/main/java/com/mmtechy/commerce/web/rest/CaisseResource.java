package com.mmtechy.commerce.web.rest;

import com.mmtechy.commerce.domain.Caisse;
import com.mmtechy.commerce.repository.CaisseRepository;
import com.mmtechy.commerce.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mmtechy.commerce.domain.Caisse}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CaisseResource {

    private final Logger log = LoggerFactory.getLogger(CaisseResource.class);

    private static final String ENTITY_NAME = "caisse";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CaisseRepository caisseRepository;

    public CaisseResource(CaisseRepository caisseRepository) {
        this.caisseRepository = caisseRepository;
    }

    /**
     * {@code POST  /caisses} : Create a new caisse.
     *
     * @param caisse the caisse to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new caisse, or with status {@code 400 (Bad Request)} if the caisse has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/caisses")
    public ResponseEntity<Caisse> createCaisse(@RequestBody Caisse caisse) throws URISyntaxException {
        log.debug("REST request to save Caisse : {}", caisse);
        if (caisse.getId() != null) {
            throw new BadRequestAlertException("A new caisse cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Caisse result = caisseRepository.save(caisse);
        return ResponseEntity
            .created(new URI("/api/caisses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /caisses/:id} : Updates an existing caisse.
     *
     * @param id the id of the caisse to save.
     * @param caisse the caisse to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated caisse,
     * or with status {@code 400 (Bad Request)} if the caisse is not valid,
     * or with status {@code 500 (Internal Server Error)} if the caisse couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/caisses/{id}")
    public ResponseEntity<Caisse> updateCaisse(@PathVariable(value = "id", required = false) final Long id, @RequestBody Caisse caisse)
        throws URISyntaxException {
        log.debug("REST request to update Caisse : {}, {}", id, caisse);
        if (caisse.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, caisse.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!caisseRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Caisse result = caisseRepository.save(caisse);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, caisse.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /caisses/:id} : Partial updates given fields of an existing caisse, field will ignore if it is null
     *
     * @param id the id of the caisse to save.
     * @param caisse the caisse to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated caisse,
     * or with status {@code 400 (Bad Request)} if the caisse is not valid,
     * or with status {@code 404 (Not Found)} if the caisse is not found,
     * or with status {@code 500 (Internal Server Error)} if the caisse couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/caisses/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Caisse> partialUpdateCaisse(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Caisse caisse
    ) throws URISyntaxException {
        log.debug("REST request to partial update Caisse partially : {}, {}", id, caisse);
        if (caisse.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, caisse.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!caisseRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Caisse> result = caisseRepository
            .findById(caisse.getId())
            .map(
                existingCaisse -> {
                    if (caisse.getArgentRetraite() != null) {
                        existingCaisse.setArgentRetraite(caisse.getArgentRetraite());
                    }
                    if (caisse.getArgentDepose() != null) {
                        existingCaisse.setArgentDepose(caisse.getArgentDepose());
                    }
                    if (caisse.getCaisseAttendu() != null) {
                        existingCaisse.setCaisseAttendu(caisse.getCaisseAttendu());
                    }

                    return existingCaisse;
                }
            )
            .map(caisseRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, caisse.getId().toString())
        );
    }

    /**
     * {@code GET  /caisses} : get all the caisses.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of caisses in body.
     */
    @GetMapping("/caisses")
    public List<Caisse> getAllCaisses() {
        log.debug("REST request to get all Caisses");
        return caisseRepository.findAll();
    }

    /**
     * {@code GET  /caisses/:id} : get the "id" caisse.
     *
     * @param id the id of the caisse to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the caisse, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/caisses/{id}")
    public ResponseEntity<Caisse> getCaisse(@PathVariable Long id) {
        log.debug("REST request to get Caisse : {}", id);
        Optional<Caisse> caisse = caisseRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(caisse);
    }

    /**
     * {@code DELETE  /caisses/:id} : delete the "id" caisse.
     *
     * @param id the id of the caisse to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/caisses/{id}")
    public ResponseEntity<Void> deleteCaisse(@PathVariable Long id) {
        log.debug("REST request to delete Caisse : {}", id);
        caisseRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

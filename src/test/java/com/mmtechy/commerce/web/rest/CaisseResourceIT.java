package com.mmtechy.commerce.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mmtechy.commerce.IntegrationTest;
import com.mmtechy.commerce.domain.Caisse;
import com.mmtechy.commerce.repository.CaisseRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link CaisseResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CaisseResourceIT {

    private static final Double DEFAULT_ARGENT_RETRAITE = 1D;
    private static final Double UPDATED_ARGENT_RETRAITE = 2D;

    private static final Double DEFAULT_ARGENT_DEPOSE = 1D;
    private static final Double UPDATED_ARGENT_DEPOSE = 2D;

    private static final Double DEFAULT_CAISSE_ATTENDU = 1D;
    private static final Double UPDATED_CAISSE_ATTENDU = 2D;

    private static final String ENTITY_API_URL = "/api/caisses";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CaisseRepository caisseRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCaisseMockMvc;

    private Caisse caisse;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Caisse createEntity(EntityManager em) {
        Caisse caisse = new Caisse()
            .argentRetraite(DEFAULT_ARGENT_RETRAITE)
            .argentDepose(DEFAULT_ARGENT_DEPOSE)
            .caisseAttendu(DEFAULT_CAISSE_ATTENDU);
        return caisse;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Caisse createUpdatedEntity(EntityManager em) {
        Caisse caisse = new Caisse()
            .argentRetraite(UPDATED_ARGENT_RETRAITE)
            .argentDepose(UPDATED_ARGENT_DEPOSE)
            .caisseAttendu(UPDATED_CAISSE_ATTENDU);
        return caisse;
    }

    @BeforeEach
    public void initTest() {
        caisse = createEntity(em);
    }

    @Test
    @Transactional
    void createCaisse() throws Exception {
        int databaseSizeBeforeCreate = caisseRepository.findAll().size();
        // Create the Caisse
        restCaisseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(caisse)))
            .andExpect(status().isCreated());

        // Validate the Caisse in the database
        List<Caisse> caisseList = caisseRepository.findAll();
        assertThat(caisseList).hasSize(databaseSizeBeforeCreate + 1);
        Caisse testCaisse = caisseList.get(caisseList.size() - 1);
        assertThat(testCaisse.getArgentRetraite()).isEqualTo(DEFAULT_ARGENT_RETRAITE);
        assertThat(testCaisse.getArgentDepose()).isEqualTo(DEFAULT_ARGENT_DEPOSE);
        assertThat(testCaisse.getCaisseAttendu()).isEqualTo(DEFAULT_CAISSE_ATTENDU);
    }

    @Test
    @Transactional
    void createCaisseWithExistingId() throws Exception {
        // Create the Caisse with an existing ID
        caisse.setId(1L);

        int databaseSizeBeforeCreate = caisseRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCaisseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(caisse)))
            .andExpect(status().isBadRequest());

        // Validate the Caisse in the database
        List<Caisse> caisseList = caisseRepository.findAll();
        assertThat(caisseList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCaisses() throws Exception {
        // Initialize the database
        caisseRepository.saveAndFlush(caisse);

        // Get all the caisseList
        restCaisseMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(caisse.getId().intValue())))
            .andExpect(jsonPath("$.[*].argentRetraite").value(hasItem(DEFAULT_ARGENT_RETRAITE.doubleValue())))
            .andExpect(jsonPath("$.[*].argentDepose").value(hasItem(DEFAULT_ARGENT_DEPOSE.doubleValue())))
            .andExpect(jsonPath("$.[*].caisseAttendu").value(hasItem(DEFAULT_CAISSE_ATTENDU.doubleValue())));
    }

    @Test
    @Transactional
    void getCaisse() throws Exception {
        // Initialize the database
        caisseRepository.saveAndFlush(caisse);

        // Get the caisse
        restCaisseMockMvc
            .perform(get(ENTITY_API_URL_ID, caisse.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(caisse.getId().intValue()))
            .andExpect(jsonPath("$.argentRetraite").value(DEFAULT_ARGENT_RETRAITE.doubleValue()))
            .andExpect(jsonPath("$.argentDepose").value(DEFAULT_ARGENT_DEPOSE.doubleValue()))
            .andExpect(jsonPath("$.caisseAttendu").value(DEFAULT_CAISSE_ATTENDU.doubleValue()));
    }

    @Test
    @Transactional
    void getNonExistingCaisse() throws Exception {
        // Get the caisse
        restCaisseMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCaisse() throws Exception {
        // Initialize the database
        caisseRepository.saveAndFlush(caisse);

        int databaseSizeBeforeUpdate = caisseRepository.findAll().size();

        // Update the caisse
        Caisse updatedCaisse = caisseRepository.findById(caisse.getId()).get();
        // Disconnect from session so that the updates on updatedCaisse are not directly saved in db
        em.detach(updatedCaisse);
        updatedCaisse.argentRetraite(UPDATED_ARGENT_RETRAITE).argentDepose(UPDATED_ARGENT_DEPOSE).caisseAttendu(UPDATED_CAISSE_ATTENDU);

        restCaisseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCaisse.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCaisse))
            )
            .andExpect(status().isOk());

        // Validate the Caisse in the database
        List<Caisse> caisseList = caisseRepository.findAll();
        assertThat(caisseList).hasSize(databaseSizeBeforeUpdate);
        Caisse testCaisse = caisseList.get(caisseList.size() - 1);
        assertThat(testCaisse.getArgentRetraite()).isEqualTo(UPDATED_ARGENT_RETRAITE);
        assertThat(testCaisse.getArgentDepose()).isEqualTo(UPDATED_ARGENT_DEPOSE);
        assertThat(testCaisse.getCaisseAttendu()).isEqualTo(UPDATED_CAISSE_ATTENDU);
    }

    @Test
    @Transactional
    void putNonExistingCaisse() throws Exception {
        int databaseSizeBeforeUpdate = caisseRepository.findAll().size();
        caisse.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCaisseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, caisse.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(caisse))
            )
            .andExpect(status().isBadRequest());

        // Validate the Caisse in the database
        List<Caisse> caisseList = caisseRepository.findAll();
        assertThat(caisseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCaisse() throws Exception {
        int databaseSizeBeforeUpdate = caisseRepository.findAll().size();
        caisse.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCaisseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(caisse))
            )
            .andExpect(status().isBadRequest());

        // Validate the Caisse in the database
        List<Caisse> caisseList = caisseRepository.findAll();
        assertThat(caisseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCaisse() throws Exception {
        int databaseSizeBeforeUpdate = caisseRepository.findAll().size();
        caisse.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCaisseMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(caisse)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Caisse in the database
        List<Caisse> caisseList = caisseRepository.findAll();
        assertThat(caisseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCaisseWithPatch() throws Exception {
        // Initialize the database
        caisseRepository.saveAndFlush(caisse);

        int databaseSizeBeforeUpdate = caisseRepository.findAll().size();

        // Update the caisse using partial update
        Caisse partialUpdatedCaisse = new Caisse();
        partialUpdatedCaisse.setId(caisse.getId());

        partialUpdatedCaisse.argentRetraite(UPDATED_ARGENT_RETRAITE);

        restCaisseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCaisse.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCaisse))
            )
            .andExpect(status().isOk());

        // Validate the Caisse in the database
        List<Caisse> caisseList = caisseRepository.findAll();
        assertThat(caisseList).hasSize(databaseSizeBeforeUpdate);
        Caisse testCaisse = caisseList.get(caisseList.size() - 1);
        assertThat(testCaisse.getArgentRetraite()).isEqualTo(UPDATED_ARGENT_RETRAITE);
        assertThat(testCaisse.getArgentDepose()).isEqualTo(DEFAULT_ARGENT_DEPOSE);
        assertThat(testCaisse.getCaisseAttendu()).isEqualTo(DEFAULT_CAISSE_ATTENDU);
    }

    @Test
    @Transactional
    void fullUpdateCaisseWithPatch() throws Exception {
        // Initialize the database
        caisseRepository.saveAndFlush(caisse);

        int databaseSizeBeforeUpdate = caisseRepository.findAll().size();

        // Update the caisse using partial update
        Caisse partialUpdatedCaisse = new Caisse();
        partialUpdatedCaisse.setId(caisse.getId());

        partialUpdatedCaisse
            .argentRetraite(UPDATED_ARGENT_RETRAITE)
            .argentDepose(UPDATED_ARGENT_DEPOSE)
            .caisseAttendu(UPDATED_CAISSE_ATTENDU);

        restCaisseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCaisse.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCaisse))
            )
            .andExpect(status().isOk());

        // Validate the Caisse in the database
        List<Caisse> caisseList = caisseRepository.findAll();
        assertThat(caisseList).hasSize(databaseSizeBeforeUpdate);
        Caisse testCaisse = caisseList.get(caisseList.size() - 1);
        assertThat(testCaisse.getArgentRetraite()).isEqualTo(UPDATED_ARGENT_RETRAITE);
        assertThat(testCaisse.getArgentDepose()).isEqualTo(UPDATED_ARGENT_DEPOSE);
        assertThat(testCaisse.getCaisseAttendu()).isEqualTo(UPDATED_CAISSE_ATTENDU);
    }

    @Test
    @Transactional
    void patchNonExistingCaisse() throws Exception {
        int databaseSizeBeforeUpdate = caisseRepository.findAll().size();
        caisse.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCaisseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, caisse.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(caisse))
            )
            .andExpect(status().isBadRequest());

        // Validate the Caisse in the database
        List<Caisse> caisseList = caisseRepository.findAll();
        assertThat(caisseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCaisse() throws Exception {
        int databaseSizeBeforeUpdate = caisseRepository.findAll().size();
        caisse.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCaisseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(caisse))
            )
            .andExpect(status().isBadRequest());

        // Validate the Caisse in the database
        List<Caisse> caisseList = caisseRepository.findAll();
        assertThat(caisseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCaisse() throws Exception {
        int databaseSizeBeforeUpdate = caisseRepository.findAll().size();
        caisse.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCaisseMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(caisse)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Caisse in the database
        List<Caisse> caisseList = caisseRepository.findAll();
        assertThat(caisseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCaisse() throws Exception {
        // Initialize the database
        caisseRepository.saveAndFlush(caisse);

        int databaseSizeBeforeDelete = caisseRepository.findAll().size();

        // Delete the caisse
        restCaisseMockMvc
            .perform(delete(ENTITY_API_URL_ID, caisse.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Caisse> caisseList = caisseRepository.findAll();
        assertThat(caisseList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

<template>
<!-- Ajouter biere -->
<div class="mid-container">
      <div class="container space-between left-container">
        <h2>Ajouter une bière</h2>
        <div>
          <label for="name">Nom:</label>
          <input type="text" id="name" v-model="beer.name" required :class="{ error: errors.name }" />
          <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
        </div>
        <div>
          <label for="comment">Commentaire:</label>
          <textarea id="comment" v-model="beer.comment"></textarea>
        </div>
        <div>
          <label for="priceHT">Prix HT (€):</label>
          <input type="number" id="priceHT" v-model="beer.priceHT" step="0.01" required :class="{ error: errors.priceHT }" />
          <span v-if="beer.priceHT" class="prix-ttc">TTC : {{ priceTTC }} € </span>
          <span v-if="errors.priceHT" class="error-message">{{ errors.priceHT }}</span>
        </div>
        <div>
          <label for="degree">Degré d'alcool:</label>
          <input type="number" id="degree" v-model="beer.degree" step="0.1" min="0" max="70" required :class="{ error: errors.degree }" />
          <span v-if="errors.degree" class="error-message">{{ errors.degree }}</span>
        </div>
        <div>
          <label for="type">Type:</label>
          <select id="type" v-model="beer.type" required :class="{ error: errors.type }">
            <option value="">Sélectionner un type</option>
            <option value="DARK">DARK</option>
            <option value="BLONDE">BLONDE</option>
            <option value="IPA">IPA</option>
            <option value="BROWN">BROWN</option>
          </select>
          <span v-if="errors.type" class="error-message">{{ errors.type }}</span>
        </div>
        <div>
          <label for="proprietaire">Propriétaire:</label>
          <input type="text" id="proprietaire" v-model="beer.proprietaire" required :class="{ error: errors.proprietaire }"/>
          <span v-if="errors.proprietaire" class="error-message">{{ errors.proprietaire }}</span>
        </div>
        <button @click="submitForm()">Ajouter</button>
      </div>

    </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useStore } from '../store/store';

//Store
const store = useStore();

// Data
const beer = reactive({
  id: 0,
  name: null,
  comment: null,
  priceHT: null,
  priceTTC: null,
  degree: null,
  type: null,
  proprietaire: null,
});

const errors = reactive({});

// Computed
const priceTTC = computed(() => {
  return (beer.priceHT * 1.2).toFixed(2);
});

const listbeer = computed(() => store.listbeers); // Quand store.beers change, listbeer met automatiquement à jour


const validateForm = () => {
  Object.keys(errors).forEach(key => delete errors[key]);

  const caractereRegex = /^[A-Za-zÀ-ÿ\s]+$/; // Regex que caractère

  if (!beer.name) {
    errors.name = "Nom requis";
  } else if (!caractereRegex.test(beer.name)) {
    errors.name = "Le nom ne doit contenir que des lettres et des espaces";
  }

  if (!beer.priceHT) {
    errors.priceHT = "Prix incorrect";
  }

  if (!beer.degree) {
    errors.degree = "Degré requis";
  } else if (beer.degree === "" || beer.degree < 0 || beer.degree > 70) {
    errors.degree = "Degré d'alcool entre 0 et 70";
  }

  if (!beer.type) {
    errors.type = "Type requis";
  }

  if (!beer.proprietaire) {
    errors.proprietaire = "Propriétaire requis";
  } else if (!caractereRegex.test(beer.proprietaire)) {
    errors.proprietaire = "Le propriétaire ne doit contenir que des lettres et des espaces";
  }

  return Object.keys(errors).length === 0;
};

const addBeer = () => {
  beer.priceTTC = (beer.priceHT * 1.2).toFixed(2);

  store.listbeers.push({
    id: store.listbeers.length + 1,
    name: beer.name,
    comment: beer.comment,
    priceHT: beer.priceHT,
    priceTTC: beer.priceTTC,
    degree: beer.degree,
    type: beer.type,
    proprietaire: beer.proprietaire,
  });

  // Reset beer
  Object.assign(beer, {
    id: "",
    name: "",
    comment: "",
    priceHT: "",
    priceTTC: "",
    degree: "",
    type: "",
    proprietaire: "",
  });
};

const submitForm = () => {
  if (!validateForm()) {
    return;
  }
  addBeer();
  console.log("Bière ajoutée:", store.listbeers);
};

</script>

<style>
.error-message {
  color: red;
  font-size: 0.9em;
}
</style>
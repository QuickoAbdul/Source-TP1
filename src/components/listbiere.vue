<template>
  <div>
    <!-- Liste biere -->
    <h1>Liste des bières</h1>
    <p>(Plus Bonus 2)</p>
    <table>
      <thead class="thead-dark">
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Commentaire</th>
          <th>Prix HT (€)</th>
          <th>Prix TTC (€)</th>
          <th>Degré d'alcool</th>
          <th>Type</th>
          <th>Propriétaire</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="beer in listbeer" :key="beer.id">
          <td>{{ beer.id }}</td>
          <td>{{ toPascalCase(beer.name) }}</td>
          <td>{{ beer.comment }}</td>
          <td>{{ beer.priceHT }}</td>
          <td>{{ beer.priceTTC }}</td>
          <td>{{ beer.degree }}</td>
          <td>{{ beer.type }}</td>
          <td>{{ beer.proprietaire }}</td>
        </tr>
      </tbody>
    </table>
    <div class="vertical-bar"></div>
    <!-- Supprimer biere -->
    <div class="container">
      <h2>Supprimer une bière</h2>
      <div v-for="(beer, index) in listbeer" :key="beer.id">
        <span>{{ beer.name }}</span>
        <button @click="deleteBeer(index)">Supprimer</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue';
import { useStore } from '../store/store';
import BeerAPI from '../api/BeerAPI.js';

// Store
const store = useStore();

const listbeer = computed(() => store.listbeers); // Quand store.beers change, listbeer met automatiquement à jour

onMounted(() => {
  const beerAPI = new BeerAPI();

  beerAPI.getAllBeers().then((beers) => {
    store.listbeers = beers;
  }).catch((error) => {
    console.error("Erreur lors de la récupération des bières:", error);
  });
});

// Methods
const toPascalCase = (str) => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
};


const deleteBeer = (index) => {
  const beerAPI = new BeerAPI();
  const beer = store.listbeers[index];
  beerAPI.deleteBeer(beer.id).then(() => {
    console.log("Bière supprimée avec succès:", beer.id);
  }).catch((error) => {
    console.error("Erreur lors de la suppression de la bière:", error);
  });
  store.listbeers.splice(index, 1);
  console.log("Bière supprimée:", store.listbeers);
};
</script>


<style scoped lang="scss">

table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #aaaaaa;
}

.left-container {
  display: flex;
  align-content: flex-start;
  flex-direction: column;
}

.error-message {
  color: red;
  font-size: 0.9em;
}

.mid-container {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100vh;
  
}

.vertical-bar {
  width: 1px; 
  background-color: #ddd; 
  height: 100%;
}

</style>
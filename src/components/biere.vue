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
      
  </div>
</template>

<script>

export default {
  data() {
    return {
      beer: {
        id: 0,
        name: null,
        comment: null,
        priceHT: null,
        priceTTC: null,
        degree: null,
        type: null,
        proprietaire: null
      },
      listbeer: [],
      errors: {},
    }
  },
  methods: {
    toPascalCase(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
    },

    validateForm() {
    this.errors = {};

    const caractereRegex = /^[A-Za-zÀ-ÿ\s]+$/; //Regex que caractere

    if (!this.beer.name) {
      this.errors.name = "Nom requis";
    } else if (!caractereRegex.test(this.beer.name)) {
      this.errors.name = "Le propriétaire ne doit contenir que des lettres et des espaces";
    }
    if (!this.beer.priceHT) {
      this.errors.priceHT = "Prix incorrect";
    }
    if (!this.beer.degree) {
      this.errors.degree = "Degree requis";
    }else if (this.beer.degree === "" || this.beer.degree < 0 || this.beer.degree > 70) {
      this.errors.degree = "Degré d'alcool entre 0 et 70";
    }
    if (!this.beer.type) {
      this.errors.type = "Type requis";
    }
    if (!this.beer.proprietaire) {
      this.errors.proprietaire = "Propriétaire requis";
    } else if (!caractereRegex.test(this.beer.proprietaire)) {
      this.errors.proprietaire = "Le propriétaire ne doit contenir que des lettres et des espaces";
    }
      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (!this.validateForm()) {
        return;
      }
      this.addBeer();
    },

    addBeer() {
      this.beer.priceTTC = (this.beer.priceHT * 1.2).toFixed(2);
      this.listbeer.forEach((beer) => {
        if (beer.id >= this.beer.id) {
          this.beer.id = beer.id + 1;
        }
      });
      this.listbeer.push({ 
        id: this.beer.id,
        name: this.beer.name,
        comment: this.beer.comment,
        priceHT: this.beer.priceHT,
        priceTTC: this.beer.priceTTC,
        degree: this.beer.degree,
        type: this.beer.type,
        proprietaire: this.beer.proprietaire});
        this.beer = {
          id: "",
          name: "",
          comment: "",
          priceHT: "",
          priceTTC: "",
          degree: "",
          type: "",
          proprietaire: ""
        };
        console.log(this.listbeer);
        console.log("test");
    },
    deleteBeer(index) {
      this.listbeer.splice(index, 1);
    },
  },
  computed: {
    priceTTC() {
      return (this.beer.priceHT * 1.2).toFixed(2);
    }
  },

}

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
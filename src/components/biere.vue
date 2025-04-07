<template>
  <div>
    <h1>Liste des bières</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Commentaire</th>
          <th>Prix HT</th>
          <th>Prix TTC</th>
          <th>Degré d'alcool</th>
          <th>Type</th>
          <th>Propriétaire</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="beer in listbeer" :key="beer.id">
          <td>{{ beer.id }}</td>
          <td>{{ beer.name }}</td>
          <td>{{ beer.commentaire }}</td>
          <td>{{ beer.prixHT }}</td>
          <td>{{ beer.prixTTC }}</td>
          <td>{{ beer.degree }}</td>
          <td>{{ beer.type }}</td>
          <td>{{ beer.proprietaire }}</td>
        </tr>
      </tbody>
    </table>
    <div>
      <h2>Ajouter une bière</h2>
      <div>
        <label for="name">Nom:</label>
        <input type="text" id="name" v-model="beer.name" required />
      </div>
      <div>
        <label for="commentaire">Commentaire:</label>
        <textarea id="commentaire" v-model="beer.commentaire"></textarea>
      </div>
      <div>
        <label for="prixHT">Prix HT:</label>
        <input type="number" id="prixHT" v-model="beer.prixHT" step="0.01" required />
      </div>
      <div>
        <label for="degree">Degré d'alcool:</label>
        <input type="number" id="degree" v-model="beer.degree" step="0.1" min="0" max="70" required />
      </div>
      <div>
        <label for="type">Type:</label>
        <select id="type" v-model="beer.type" required>
          <option value="DARK">DARK</option>
          <option value="BLONDE">BLONDE</option>
          <option value="IPA">IPA</option>
          <option value="BROWN">BROWN</option>
        </select>
      </div>
      <div>
        <label for="proprietaire">Propriétaire:</label>
        <input type="text" id="proprietaire" v-model="beer.proprietaire" required />
      </div>
      <button @click="addBeer">Ajouter</button>
  </div>
    </div>
</template>

<script>

export default {
  data() {
    return {
      beer: {
        id: null,
        name: null,
        commentaire: null,
        prixHT: null,
        prixTTC: null,
        degree: null,
        type: null,
        proprietaire: null
      },
      listbeer: [],
    }
  },
  methods: {
    addBeer() {
      this.beer.prixTTC = (this.beer.prixHT * 1.2).toFixed(2);
      this.beer.id = this.listbeer.length + 1;
      this.listbeer.push({ 
        id: this.beer.id,
        name: this.beer.name,
        commentaire: this.beer.commentaire,
        prixHT: this.beer.prixHT,
        prixTTC: this.beer.prixTTC,
        degree: this.beer.degree,
        type: this.beer.type,
        proprietaire: this.beer.proprietaire});
        this.beer = {
          id: "",
          name: "",
          commentaire: "",
          prixHT: "",
          prixTTC: "",
          degree: "",
          type: "",
          proprietaire: ""
        };
        console.log(this.listbeer);
        console.log("test");
    },
  }
}

</script>

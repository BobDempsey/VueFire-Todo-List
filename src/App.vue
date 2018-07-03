<template>
  <div id="app">
<div class="container">
<div class="jumbotron bg-dark">
  <h1 class="display-4 text-white">VueFire Todo List - Bob Dempsey</h1>
  <p class="lead text-white">A lightweight CRUD web application built with Vue JS, Firebase, CSS Grid, & Bootstrap 4</p>
  <hr class="my-4">


  <div class="input-group mb-3 ">
    <input type="text" class="form-control" placeholder="Item Name" v-model="name" @keyup.enter="submitName()">
      <div class="input-group-append">
      <button class="btn btn-primary" type="button" @click="submitName()"><i class="fas fa-plus-circle mr-2"></i>Add Item</button>
      </div>
  </div>
</div>

<div>
  <ul class="list-group">
    <li class="list-group-item bg-dark text-white" v-for="personName of names" v-bind:key="personName['.key']">
      <div v-if="!personName.edit">
     <p class="item">{{ personName.name }}</p>
     <button class="btn btn-sm btn-outline-danger" @click="removeName(personName['.key'])"><i class="fas fa-trash-alt mr-2"></i>Remove</button>
     <button class="btn btn-sm btn-outline-success" @click="setEditName(personName['.key'])"><i class="fas fa-edit mr-2"></i> Edit</button>
     </div>
     <div v-else>
       <input type="text" v-model="personName.name" class="form-control mb-2" @keyup.enter="saveEdit(personName)">
       <button class="btn btn-sm btn-outline-success" @click="saveEdit(personName)"><i class="fas fa-check mr-2"></i> Save</button>
       <button class="btn btn-sm btn-outline-danger" @click="cancelEdit(personName['.key'])"><i class="fas fa-times mr-2"></i>Cancel</button>
     </div>
      </li>
  </ul>
</div>


<!--end container -->
</div>

<!-- original UI -->

<!-- </div>

    <div>
      <label>Name:</label>
      <input type="text" v-model="name" placeholder="Enter Item" @keyup.enter="submitName()">
      <button @click="submitName()"><i class="fas fa-plus"></i> Add</button>
    </div>

<div>
  <ul>
    <li v-for="personName of names" v-bind:key="personName['.key']">
      <div v-if="!personName.edit">
     <p>{{ personName.name }}</p>
     <button @click="removeName(personName['.key'])">Remove</button>
     <button @click="setEditName(personName['.key'])">Edit</button>
     </div>
     <div v-else>
       <input type="text" v-model="personName.name" @keyup.enter="saveEdit(personName)">
       <button @click="saveEdit(personName)">Save</button>
       <button @click="cancelEdit(personName['.key'])">Cancel</button>
     </div>
      </li>
  </ul>
</div> -->
  <!-- original UI -->

<!-- End App -->
</div>
  </div>
</template>

<script>
import { namesRef } from "./firebase";
export default {
  data() {
    return {
      name: ""
    };
  },
  firebase: {
    names: namesRef
  },
  methods: {
    submitName() {
      if (this.name != "") {
        namesRef.push({
          name: this.name,
          edit: false
        });
        this.name = "";
      } else {
        alert("enter something!");
      }
    },
    removeName(key) {
      namesRef.child(key).remove();
    },
    setEditName(key) {
      namesRef.child(key).update({
        edit: true
      });
    },
    cancelEdit(key) {
      namesRef.child(key).update({
        edit: false
      });
    },
    saveEdit(person) {
      const key = person[".key"];
      namesRef.child(key).set({
        name: person.name,
        edit: false
      });
    }
  }
};
</script>

<style>
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css");
@import url("https://bootswatch.com/4/cosmo/bootstrap.min.css");
@import url("https://use.fontawesome.com/releases/v5.1.0/css/all.css");

body {
  background: #fafafa;
}
.container {
  padding: 1rem;
  max-width: 1280px !important;
}

.item {
  font-size: 1.5rem;
}

.list-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1rem;
}

.list-group-item {
  border-radius: 0px !important;
  background: #fff;
}

.jumbotron {
  padding-bottom: 2rem;
  border-radius: 0px !important;
  margin-bottom: 1rem;
}

.bg-dark {
  background-color: #333 !important;
}
</style>
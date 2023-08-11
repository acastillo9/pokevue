<script setup lang="ts">
import { getPokemonTypeUrl } from '@/utils/pokemon'

defineProps(['move'])
defineEmits(['attack'])
</script>

<template>
  <button class="button-attack" @click="$emit('attack')">
    <div class="move-title">
      <p>{{ move.name }}</p>
      <img class="type-image" :src="getPokemonTypeUrl(move.type)" alt="move type" />
      <p>Power: {{ move.power || '--' }}</p>
    </div>
    <i> {{ move.description }} </i>
  </button>
</template>

<style scoped>
.button-attack {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  width: 50%;
  background-color: burlywood;
  height: 70px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial,
    sans-serif;
}

.button-attack:hover {
  width: 50%;
  background-color: chocolate;
  cursor: pointer;
  height: 70px;
  font-weight: 600;
}

.move-title {
  display: flex;
  text-transform: capitalize;
  flex-direction: row;
  justify-content: space-evenly;
}

.type-image {
  width: 12%;
}
</style>

<script setup lang="ts">
import { getImageUrl, getPokemon } from '@/utils/pokemon'
import { useCurrentTeamPokemon, useCurrentRivalPokemon } from '@/composable/pokemon'
import type { Pokemon } from '@/models/pokemon.model'
import { onMounted, ref } from 'vue'

const { pokemonTeam, updateTeamPokemon } = useCurrentTeamPokemon()
const { pokemonRival, updateRivalPokemon } = useCurrentRivalPokemon()

const pokemons = ref<Pokemon[]>([])

onMounted(() => {
  const teamPromise = getPokemon('ivysaur')
  teamPromise.then((data) => updateTeamPokemon(data))

  const rivalPromise = getPokemon('charmeleon')
  rivalPromise.then((data) => updateRivalPokemon(data))

  Promise.all([
    teamPromise,
    getPokemon('bulbasaur'),
    rivalPromise,
    getPokemon('venusaur'),
    getPokemon('charmander'),
    getPokemon('charizard')
  ]).then((data) => {
    pokemons.value = data
  })
})
</script>

<template>
  <div class="pokemon-list">
    <div v-for="pokemon in pokemons" :key="pokemon.id"
      :class="{ team: pokemonTeam?.id === pokemon?.id, rival: pokemonRival?.id === pokemon?.id }" class="pokemon-item">
      <img :src="getImageUrl(pokemon.id)" @click="updateTeamPokemon(pokemon)" alt="" />
    </div>
  </div>
</template>

<style scoped>
.pokemon-list {
  display: flex;
  flex-wrap: wrap;
  height: 100px;
  width: 100%;
  justify-content: center;
  height: 543px;
}

.pokemon-item {
  width: 100%;
  justify-content: center;
  display: flex;
  border: solid;
  padding: 10px;
  cursor: pointer;
}

.pokemon-item:last-child {
  border: 0;
}

.rival {
  border-color: brown;
  background-color: indianred;
}

.team {
  border-color: darkolivegreen;
  background-color: darkseagreen;
}
</style>

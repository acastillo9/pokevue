<script setup lang="ts">
import { useCurrentRivalPokemon, useCurrentTeamPokemon } from '@/composable/pokemon'
import AttackButton from './AttackButton.vue'
import type { Move } from '@/models/pokemon.model'
import { getDamage } from '@/utils/pokemon';

const { pokemonRival, triggerRivalDamage } = useCurrentRivalPokemon()
const { pokemonTeam, triggerTeamDamage } = useCurrentTeamPokemon()

const attack = (move: Move) => {
  pokemonRival.value!.hp.current! -= getDamage(pokemonTeam.value!, pokemonRival.value!, move)

  // Animation
  triggerRivalDamage(true)
  triggerTeamDamage(true)
  setTimeout(() => {
    triggerRivalDamage(false)
    triggerTeamDamage(false)
  }, 2000)
}
</script>

<template>
  <div class="dialogBox">
    <div class="moveBox">
      <AttackButton v-for="move in pokemonTeam?.moves" :key="move.name" :move="move" @attack="attack(move)" />
    </div>
  </div>
</template>

<style scoped>
.moveBox {
  display: flex;
  flex-direction: row;
}
</style>

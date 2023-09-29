<script setup lang="ts">
import { getImageUrl } from '@/utils/pokemon'
import { useCurrentTeamPokemon, useCurrentRivalPokemon } from '@/composable/pokemon'
import LifeBar from './LifeBar.vue'

const { pokemonRival, rivalDamage } = useCurrentRivalPokemon()
const { pokemonTeam, teamDamage } = useCurrentTeamPokemon()
</script>

<template>
  <div class="field">
    <div class="rivalPokemon">
      <LifeBar :pokemon="pokemonRival" :damage="rivalDamage" />
      <img :class="{ damaged: rivalDamage }" :src="getImageUrl(pokemonRival?.id || '')" alt="" />
    </div>
    <div :class="{ teamPokemon: pokemonTeam?.id !== '6', teamBigPokemon: pokemonTeam?.id === '6' }">
      <LifeBar :pokemon="pokemonTeam" :damage="teamDamage" />
      <img :class="[{ shake: teamDamage }, 'active-pokemon']" :src="getImageUrl(pokemonTeam?.id || '', false)" alt="" />
    </div>
  </div>
</template>

<style scoped>
.field {
  background: url('../assets/green-field.png') no-repeat;
  background-size: contain;
  height: 100%;
  width: 100%;
}

.rivalPokemon {
  position: relative;
  top: 48%;
  left: 71%;
  width: 100px;
}

.teamPokemon {
  position: relative;
  top: 65%;
  left: 26%;
  width: 100px;
}

.teamBigPokemon {
  position: relative;
  top: 38%;
  left: 15%;
  width: 100px;
}

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

.damaged {
  animation: damaged 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

.active-pokemon {
  width: 100px;
}

@keyframes shake {

  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

@keyframes damaged {
  0% {
    opacity: 1;
  }

  25% {
    opacity: 0.5;
  }

  50% {
    opacity: 0;
  }

  75% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}
</style>

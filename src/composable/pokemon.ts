import { ref } from 'vue'
import { type Pokemon } from '@/models/pokemon.model'

const pokemonRival = ref<Pokemon>()
const pokemonTeam = ref<Pokemon>()

const rivalDamage = ref(false)
const teamDamage = ref(false)

export const useCurrentRivalPokemon = () => {
  const updateRivalPokemon = (newPokemon: Pokemon) => {
    pokemonRival.value = newPokemon
  }
  const triggerRivalDamage = (damage: boolean) => {
    rivalDamage.value = damage
  }
  return {
    pokemonRival,
    updateRivalPokemon,
    rivalDamage,
    triggerRivalDamage
  }
}

export const useCurrentTeamPokemon = () => {
  const updateTeamPokemon = (newPokemon: Pokemon) => {
    pokemonTeam.value = newPokemon
  }
  const triggerTeamDamage = (damage: boolean) => {
    teamDamage.value = damage
  }
  return {
    pokemonTeam,
    updateTeamPokemon,
    teamDamage,
    triggerTeamDamage
  }
}

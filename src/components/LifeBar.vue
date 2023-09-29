<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { PropType } from 'vue'
import type { Pokemon } from '@/models/pokemon.model'

const lifeDamage = ref(0);

const props = defineProps({
  pokemon: {
    type: Object as PropType<Pokemon>,
    default: () => ({})
  },
  damage: {
    type: Boolean,
    default: false
  }
})

const pokemonLife = computed(() => {
  let currentLife = 0
  if (props.pokemon?.hp) [(currentLife = (props.pokemon.hp.current! * 100) / props.pokemon.hp.max)]
  return currentLife > 0 ? Math.round(currentLife) : 0
})

const hpColour = computed(() => {
  let classColour = 'empty'
  if (pokemonLife.value > 0 && pokemonLife.value < 20) {
    classColour = 'red'
  } else if (pokemonLife.value >= 20 && pokemonLife.value < 50) {
    classColour = 'yellow'
  } else if (pokemonLife.value >= 50) {
    classColour = 'green'
  }
  return classColour
})

const genderSymbol = computed(() => {
  let symbol = ''
  if (props.pokemon.gender === 'male') {
    symbol = '&#9794;' // TODO define icons font library 
  } else if (props.pokemon.gender === 'female') {
    symbol = '&#9792;'
  }
  return symbol
})


watch(pokemonLife, (newValue, oldValue) => {
  if (oldValue) lifeDamage.value = oldValue - newValue
})

watch(
  () => props.damage,
  (newValue) => {
    if (!newValue) lifeDamage.value = 0
  })

</script>

<template>
  <div class="statbar">
    <strong>{{ pokemon?.name }} <small>L{{ pokemon?.level }}</small> <span v-html="genderSymbol"></span></strong>
    <div class="hpbar">
      <div class="hptext">{{ pokemonLife }}%</div>
      <div :class="['hp', hpColour]" :style="{ width: pokemonLife + '%' }"></div>
    </div>
    <Transition name="damage">
      <div v-if="props.damage && lifeDamage" class="damage">-{{ lifeDamage }} %</div>
    </Transition>
  </div>
</template>

<style scoped>
.pokemon-life {
  display: flex;
}

.pokemon-rival {
  background-color: indianred;
  padding-left: 10px;
  width: 100%;
  margin: auto;
  margin-right: 0;
  transition: all 0.5s ease;
}

.pokemon-team {
  background-color: darkseagreen;
  padding-left: 10px;
  width: 100%;
  margin: auto;
  margin-left: 0;
  transition: all 0.5s ease;
}

.line-content {
  background-color: rgb(0, 152, 211);
  width: 50%;
  margin: auto;
}

.statbar {
  position: absolute;
  width: 154px;
  min-height: 40px;
  padding: 2px 4px;
  left: -30px;
  top: -60px;
  z-index: 1;
}

.statbar strong {
  margin: 0 -15px;
  display: block;
  text-align: center;
  color: #222;
  text-shadow: #fff 1px 1px 0, #fff 1px -1px 0, #fff -1px 1px 0, #fff -1px -1px 0;
  font-size: 16px;
  font-weight: bold;
}

.statbar strong small {
  font-weight: 400;
  font-size: 12px;
}

.statbar .hpbar {
  position: relative;
  border: 1px solid #777;
  background: #fcfeff;
  padding: 1px;
  height: 12px;
  margin: 0;
  width: 151px;
  border-radius: 4px;
}

.statbar .hpbar .hptext {
  position: absolute;
  background: #777;
  color: #eee;
  text-shadow: #000 0 1px 0;
  font-size: 9px;
  width: 32px;
  height: 12px;
  top: -1px;
  text-align: center;
  left: -32px;
}

.statbar .hpbar .hp {
  height: 8px;
  border-radius: 3px;
  transition: width 0.5s ease;
}

.statbar .hpbar .hp.green {
  border-top: 2px solid #00dd60;
  background: #00bb51;
  border-bottom: 2px solid #007734;
  border-right: 1px solid #007734;
}

.statbar .hpbar .hp.yellow {
  border-top: 2px solid darkkhaki;
  background: yellow;
  border-bottom: 2px solid darkgoldenrod;
  border-right: 1px solid darkgoldenrod;
}

.statbar .hpbar .hp.red {
  border-top: 2px solid indianred;
  background: red;
  border-bottom: 2px solid darkred;
  border-right: 1px solid darkred;
}

.statbar .hpbar .hp.empty {
  border-right: none;
}

.statbar .damage {
  background: orangered;
  border-radius: 4px;
  color: #eee;
  font-size: 10px;
  font-weight: bold;
  margin: 50px auto;
  text-align: center;
  width: 45px;
}

.damage-enter-active {
  transition-delay: 0s;
  transition: opacity 0.5s ease;
}

.damage-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}

.damage-enter-from,
.damage-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}
</style>

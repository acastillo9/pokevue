<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps(['pokemon'])

const pokemonLife = computed(() => {
  let currentLife = 0
  if (props.pokemon?.hp) [(currentLife = (props.pokemon.hp.current! * 100) / props.pokemon.hp.max)]
  return currentLife > 0 ? Math.round(currentLife) : 0
})
</script>

<template>
  <div class="statbar">
    <strong>{{ pokemon?.name }} <small>L{{ pokemon?.level }}</small></strong>
    <div class="hpbar">
      <div class="hptext">{{ pokemonLife }}%</div>
      <div :class="['hp', { empty: pokemonLife <= 0 }]" :style="{ width: pokemonLife + '%' }"></div>
    </div>
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
  border-top: 2px solid #00dd60;
  background: #00bb51;
  border-bottom: 2px solid #007734;
  border-right: 1px solid #007734;
  border-radius: 3px;
}

.statbar .hpbar .hp.empty {
  border-right: none;
}
</style>

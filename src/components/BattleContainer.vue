<script setup lang="ts">
import BattleField from './BattleField.vue'
import PokemonList from './PokemonList.vue'
import BattleControls from './BattleControls.vue'
</script>

<template>
  <div class="battle-container">
    <div class="battle-field">
      <BattleField />
    </div>
    <div class="battle-controls">
      <BattleControls />
    </div>
    <div class="battle-pokemon-list">
      <PokemonList />
    </div>
  </div>
</template>

<style scoped>
.battle-container {
  display: grid;
  grid-template-columns: 80% 20%;
  grid-template-rows: auto;
  grid-template-areas:
    'life pokemon-list'
    'battle-field pokemon-list'
    'controls pokemon-list';
  max-width: 1148px;
  min-width: 1148px;
  margin: auto;
}

.battle-field {
  border: solid;
  height: 548px;
  grid-area: battle-field;
}

.battle-controls {
  border: solid;
  grid-area: controls;
}

.battle-pokemon-list {
  border: solid;
  border: solid;
  grid-area: pokemon-list;
}
</style>

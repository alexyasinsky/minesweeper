
<template>
  <div
      class="field"
      @click="clickOnFieldHandler"
      @contextmenu="clickOnFieldHandler"
  >
    <div 
    class="row" 
    v-for="row in getFieldSize"
    :key="row" 
    >
    <mine-cell
        v-for="column in getFieldSize"
        :key="`x${column}y${row}`"
        :id="`x${column}y${row}`"
    />
  </div>
  </div>
  
</template>

<script setup>

  import MineCell from "./MineCell.vue";

  import { mapActions, mapGetters } from "../store/tools/map-state.js";

  const { startGame } = mapActions('game');
  const { generateCells } = mapActions('cells');
  const { getFieldSize } = mapGetters('cells');
  const { getGameStatus } = mapGetters('game');

  generateCells();

  function clickOnFieldHandler() {
    if (getGameStatus.value === 'beforePlaying') {
      startGame();
    }
  }



</script>

<style lang="scss" scoped>

  .field {
    border: 3px inset rgb(224, 224, 224);
  }
  .row {
    display: flex;
  }
</style>

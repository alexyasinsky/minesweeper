<template>
  <header>
    <digits-view
        :number="getFieldSize - getMarkedCellsCount"
        :digits-quantity="2"
    />
    <game-status/>
    <digits-view
        :number="getStopwatchCount"
        :digits-quantity="3"
    />
  </header>

</template>
<script setup>
import DigitsView from "./DigitsView.vue";
import GameStatus from "./gameStatus.vue";
import {mapGetters} from "../store/tools/map-state.js";

const { getFieldSize } = mapGetters('cells');
const { getMarkedCellsCount, getStopwatchCount } = mapGetters('game');

</script>

<style lang="scss" scoped>
  header {
    display: flex;
    border: 2px inset rgb(224, 224, 224);
    padding: 3px;
    margin-bottom: 5px;
  }
</style>
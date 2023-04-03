<template>
  <div class="status">
    <button
      :class="getGameStatus"
      @click="getButtonHandler"
    />
  </div>
</template>


<script setup>

import { mapActions, mapGetters} from "../store/tools/map-state.js";
import {computed} from "vue";

const { startGame, stopGame, unsetGameStateToDefault } = mapActions('game');
const { generateCells } = mapActions('cells');

function startNewGame() {
  generateCells();
  unsetGameStateToDefault();
  startGame();
}

const { getGameStatus } = mapGetters('game');

const getButtonHandler = computed(() => {
  switch (getGameStatus) {
    case 'beforePlaying':
      return startGame;
    case 'playing':
      return stopGame;
    case 'paused':
      return startGame;
    default:
      return startNewGame;
  }
})

</script>

<style lang="scss" scoped>
  .status {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      height: 25px;
      width: 25px;
      background-image: url(/src/assets/minesweeper-sprites_9TPZzv3.png);
      border: 0;
    }
    .beforePlaying {
      background-position: -1px -25px;
    }
    .playing {
      background-position: -28px -25px;
    }
    .paused {
      background-position: -54px -25px;
    }
    .gamerWon {
      background-position: -82px -25px;
    }
    .gamerLoosed {
      background-position: -109px -25px;
    }
  }
</style>
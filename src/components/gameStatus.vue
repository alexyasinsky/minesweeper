<template>
  <div class="status">
    <button
      :class="getGameStatus"
      @click="getButtonHandler"
    />
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "gameStatus",
  methods: {
    ...mapActions('game', [
        'startGame',
        'stopGame',
        'unsetGameStateToDefault',
    ]),
    ...mapActions('cells', ['generateCells']),
    startNewGame() {
      this.generateCells();
      this.unsetGameStateToDefault();
      this.startGame();
    }
  },
  computed: {
    ...mapGetters('game', [
      'getGameStatus',
      'getIsGamerWon'
    ]),
    getButtonHandler(){
      switch (this.getGameStatus) {
        case 'beforePlaying':
          return this.startGame;
        case 'playing':
          return this.stopGame;
        case 'paused':
          return this.startGame;
        default:
          return this.startNewGame;
      }
    },

  },

}
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
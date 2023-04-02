<template>
  <div
    :class="getCellClass"
    @click="leftMouseClickHandler"
    @contextmenu.prevent="rightMouseClickHandler"
  >
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "MineCell",
  props: ['id'],

  methods: {
    ...mapMutations('game', [
        'setIsGamerWon',
        'setGameStatus',
        'decrementMarkedCellsCount',
        'incrementMarkedCellsCount',
    ]),
    ...mapMutations('cells', [
      'setCellClassName',
      'toggleCellMarkingStatus'
    ]),
    ...mapActions('game', ['stopGame']),
    ...mapActions('cells', [
      'openCell',
      'openAllMinedCells',
      'checkMarking'
    ]),
    rightMouseClickHandler() {
      if (!this.getCellMarkingStatus(this.id)) {
        this.incrementMarkedCellsCount();
        this.toggleCellMarkingStatus(this.id);
        this.setCellClassName({id: this.id, className: 'marked'});
        this.checkWinning();
      } else {
        this.decrementMarkedCellsCount();
        this.toggleCellMarkingStatus(this.id);
        this.setCellClassName({id: this.id, className: 'closed'});
      }
    },
    checkWinning() {
      if (this.checkHowManyMarksAreLeft()) {
        this.stopGame();
        this.checkMarking();
        if (this.getIsMarkingCorrect) {
          this.setGameStatus('gamerWon');
          this.setIsGamerWon(true);
        } else {
          this.openAllMinedCells();
          this.setGameStatus('gamerLoosed');
          this.setIsGamerWon(false);
        }
      }
    },

    checkHowManyMarksAreLeft() {
      return this.getMarkedCellsCount - this.getFieldSize === 0
    },

    leftMouseClickHandler() {
      this.openCell(this.id);
      const className = this.getCellClassName(this.id);
      if (className === 'mine_activated') {
        this.setIsGamerWon(false);
        this.openAllMinedCells();
        this.stopGame();
        this.setGameStatus('gamerLoosed');
      }
    }
  },

  computed: {
    ...mapGetters('game', ['getMarkedCellsCount',]),
    ...mapGetters('cells', [
      'getCellClassName',
      'getCellMarkingStatus',
      'getFieldSize',
      'getIsMarkingCorrect'
    ]),
    getCellClass() {
      return `cell cell_small cell_${this.getCellClassName(this.id)}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .cell {
    background-image: url("../assets/minesweeper-sprites_9TPZzv3.png");
    &_small {
      height: 17px;
      width: 17px;
    }
    &_closed {
      background-position: 0 34px;
    }
    &_empty {
      background-position: -17px 34px;
    }
    &_marked {
      background-position: -34px 34px;
    }
    &_question_closed {
      background-position: -51px 34px;
    }
    &_question {
      background-position: -68px 34px;
    }
    &_mine {
      background-position: -85px 34px;
    }
    &_mine_activated {
      background-position: -102px 34px;
    }
    &_mine_deactivated {
      background-position: -119px 34px;
    }
    &_1 {
      background-position: 0 17px;
    }
    &_2 {
      background-position: -17px 17px;
    }
    &_3 {
      background-position: -34px 17px;
    }
    &_4 {
      background-position: -51px 17px;
    }
    &_5 {
      background-position: -68px 17px;
    }
    &_6 {
      background-position: -85px 17px;
    }
    &_7 {
      background-position: -102px 17px;
    }
    &_8 {
      background-position: -119px 17px;
    }

  }
</style>
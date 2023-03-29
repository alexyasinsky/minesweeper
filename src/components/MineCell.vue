<template>
  <div
    :class="getCellClass"
    @click="openCell(this.id)"
  >
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "MineCell",
  props: [
      'id'
  ],

  data() {
    return {
      isClosed: true,
      cell: {},
      isMined: false,
    }
  },

  methods: {
    ...mapMutations('game', ['addGamerStep']),
    ...mapMutations('cells', [
      'setCellClassName'
    ]),
    ...mapActions('cells', ['openCell']),
    // openCellll() {
      // this.openCell('this.id');

      // const isMined = this.checkMining(cell);
      // this.addGamerStep(cell);
      // if (isMined) {
      //   this.element = 'mine_activated';
      //   return
      // }
      // const {x, y} = this.getCoordsFromId(cell);
      // const cellsAround = this.getCellsToCheck(x, y);
      // const minesAroundAmount = this.checkMinesAround(cellsAround);
      // if (minesAroundAmount) {
      //   switch (minesAroundAmount) {
      //     case 1:
      //       this.element = 'one';
      //       break
      //     case 2:
      //       this.element = 'two';
      //       break
      //     case 3:
      //       this.element = 'three';
      //       break
      //     case 4:
      //       this.element = 'four';
      //       break
      //     case 5:
      //       this.element = 'five';
      //       break
      //     case 6:
      //       this.element = 'six';
      //       break
      //     case 7:
      //       this.element = 'seven';
      //       break
      //     case 8:
      //       this.element = 'eight';
      //       break
      //     default:
      //       break
      //   }
      //   return;
      // }
      // this.element = 'empty';
      // cellsAround.forEach(cell => {
      //   this.openCell(cell);
      // })
    // },

    checkMining(cell) {
      return [...this.getMinedCellsIds].find(id => {
        return id === cell
      })
    },

    checkMinesAround(cells) {
      let count = 0;
      for (let cell of cells) {
        if (this.checkMining(cell)) {
          count++
        }
      }
      return count;
    },

    

    getCellsToCheck(x, y) {
      let cells = [];
      const steps = [...this.getGamerSteps];
      if (x - 1 > 0 && y - 1 > 0) {
        cells.push(`x${x - 1}y${y - 1}`);
      }
      if (y - 1 > 0) {
        cells.push(`x${x}y${y - 1}`);
      }
      if (x + 1 <= this.getFieldSize && y - 1 > 0) {
        cells.push(`x${x + 1}y${y - 1}`);
      }
      if (x - 1 > 0) {
        cells.push(`x${x - 1}y${y}`);
      }
      if (x + 1 <= this.getFieldSize) {
        cells.push(`x${x + 1}y${y}`);
      }
      if (x - 1 > 0 && y + 1 <= this.getFieldSize) {
        cells.push(`x${x - 1}y${y + 1}`);
      }
      if (y + 1 <= this.getFieldSize) {
        cells.push(`x${x}y${y + 1}`);
      }
      if (x + 1 <= this.getFieldSize && y + 1 <= this.getFieldSize) {
        cells.push(`x${x + 1}y${y + 1}`);
      }
      cells = cells.filter(cell => {
        if (!steps.includes(cell)) return cell
      })
      return cells;
    }
  },

  computed: {
    ...mapGetters('cells', [
      'getCellMineStatus',
      'getCellOpeningStatus',
      'getCellClassName'
    ]),
    ...mapGetters('game', [
        'getFieldSize',
        'getGamerSteps'
    ]),
    getCellClass() {
      return `cell cell_small cell_${this.getCellClassName(this.id)}`
    }
  },

  mounted() {
    this.isMined = this.getCellMineStatus(this.id);
  },


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
    &_flag {
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
    &_one {
      background-position: 0 17px;
    }
    &_two {
      background-position: -17px 17px;
    }
    &_three {
      background-position: -34px 17px;
    }
    &_four {
      background-position: -51px 17px;
    }
    &_five {
      background-position: -68px 17px;
    }
    &_six {
      background-position: -85px 17px;
    }
    &_seven {
      background-position: -102px 17px;
    }
    &_eight {
      background-position: -119px 17px;
    }

  }
</style>
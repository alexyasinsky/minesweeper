<template>
  <div
    :class="getCellClass"
    @click="openCell(x,y)"
  >
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "MineCell",
  props: [
      'x',
      'y',
  ],

  data() {
    return {
      element: 'closed',
      isClosed: true,
    }
  },

  methods: {
    ...mapMutations('game', ['addGamerStep']),

    openCell(x, y) {
      this.addGamerStep({x:x,y:y});
      const isMined = this.checkMining(x, y);
      if (isMined) {
        this.element = 'mine_activated';
        return
      }
      const cellsAround = this.getCellsToCheck(x, y);
      const minesAroundAmount = this.checkMinesAround(cellsAround);
      if (minesAroundAmount) {
        switch (minesAroundAmount) {
          case 1:
            this.element = 'one';
            break
          case 2:
            this.element = 'two';
            break
          case 3:
            this.element = 'three';
            break
          case 4:
            this.element = 'four';
            break
          case 5:
            this.element = 'five';
            break
          case 6:
            this.element = 'six';
            break
          case 7:
            this.element = 'seven';
            break
          case 8:
            this.element = 'eight';
            break
          default:
            break
        }
        return;
      }
      this.element = 'empty';
    },

    checkMining(x, y) {
      return [...this.getMinesCoords].find(coord => {
        const left = JSON.stringify(coord);
        const right = `{\"x\":${x},\"y\":${y}}`;
        return left === right;
      })
    },

    checkMinesAround(cells) {
      let count = 0;
      for (let cell of cells) {
        if (this.checkMining(cell.x, cell.y)) {
          count++
        }
      }
      return count;
    },

    getCellsToCheck(x, y) {
      let cells = [];
      const steps = [...this.getGamerSteps];
      if (x - 1 > 0 && y - 1 > 0) {
        cells.push({x: x - 1, y: y - 1});
      }
      if (y - 1 > 0) {
        cells.push({x: x, y: y - 1});
      }
      if (x + 1 <= this.getFieldSize && y - 1 > 0) {
        cells.push({x: x + 1, y: y - 1});
      }
      if (x - 1 > 0) {
        cells.push({x: x - 1, y: y});
      }
      if (x + 1 <= this.getFieldSize) {
        cells.push({x: x + 1, y: y});
      }
      if (x - 1 > 0 && y + 1 <= this.getFieldSize) {
        cells.push({x: x - 1, y: y + 1});
      }
      if (y + 1 <= this.getFieldSize) {
        cells.push({x: x, y: y + 1});
      }
      if (x + 1 <= this.getFieldSize && y + 1 <= this.getFieldSize) {
        cells.push({x: x + 1, y: y + 1});
      }
      // cells.forEach(cell => {
      //   console.log(steps.find(step => step.x !== cell.x || step.y !== cell.y));
      // })
      cells = cells.map(cell => {
        if (steps.find(step => step.x !== cell.x || step.y !== cell.y)) return cell;
      })
      console.log(cells);
      return cells;
    }
  },

  computed: {
    ...mapGetters('mines', ['getMinesCoords']),
    ...mapGetters('game', [
        'getFieldSize',
        'getGamerSteps'
    ]),
    getCellClass() {
      return `cell cell_small cell__${this.element}`
    }
  },

  mounted() {

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
    &__closed {
      background-position: 0 34px;
    }
    &__empty {
      background-position: -17px 34px;
    }
    &__flag {
      background-position: -34px 34px;
    }
    &__question_closed {
      background-position: -51px 34px;
    }
    &__question {
      background-position: -68px 34px;
    }
    &__mine {
      background-position: -85px 34px;
    }
    &__mine_activated {
      background-position: -102px 34px;
    }
    &__mine_deactivated {
      background-position: -119px 34px;
    }
    &__one {
      background-position: 0 17px;
    }
    &__two {
      background-position: -17px 17px;
    }
    &__three {
      background-position: -34px 17px;
    }
    &__four {
      background-position: -51px 17px;
    }
    &__five {
      background-position: -68px 17px;
    }
    &__six {
      background-position: -85px 17px;
    }
    &__seven {
      background-position: -102px 17px;
    }
    &__eight {
      background-position: -119px 17px;
    }

  }
</style>
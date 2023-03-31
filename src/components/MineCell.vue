<template>
  <div
    :class="getCellClass"
    @click="openCell(this.id)"
    @contextmenu.prevent="rightClickHandler"
  >
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "MineCell",
  props: ['id'],

  methods: {
    ...mapActions('game', [
      'openCell',
      'markCell',
      'checkHowManyMarksAreLeft'
    ]),
    rightClickHandler() {
      this.markCell(this.id);
      this.checkHowManyMarksAreLeft();
    }
  },

  computed: {
    ...mapGetters('game', ['getCellClassName']),
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
<template>
  <div
    :class="getCellClass"
    @click="leftMouseClickHandler"
    @contextmenu.prevent="rightMouseClickHandler"
  >
  </div>
</template>

<script setup>

  import {mapMutations, mapActions, mapGetters} from "../store/tools/map-state.js";
  import {computed, defineProps} from "vue";

  const props = defineProps({
    id: String
  })

  const { setIsGamerWon, setGameStatus, decrementMarksLeft, incrementMarksLeft } = mapMutations('game');
  const { setCellClassName, toggleCellMarkingStatus } = mapMutations('cells');

  const { finishGame } = mapActions('game');
  const { openCell, openAllMinedCells, checkMarking } = mapActions('cells');


  function leftMouseClickHandler() {
    openCell(props.id);
    const className = getCellClassName.value(props.id);
    if (className === 'mine-activated') {
      finishGameWithLoosing();
    }
  }

  function rightMouseClickHandler() {
    if (!getCellMarkingStatus.value(props.id)) {
      decrementMarksLeft();
      toggleCellMarkingStatus(props.id);
      setCellClassName({id: props.id, className: 'marked'});
      if (getMarksLeft.value === 0) {
        checkWinning();
      }
    } else {
      incrementMarksLeft();
      toggleCellMarkingStatus(props.id);
      setCellClassName({id: props.id, className: 'closed'});
    }
  }

  function checkWinning() {
    checkMarking();
    if (getIsMarkingCorrect.value) {
      finishGameWithWinning()
    } else {
      finishGameWithLoosing()
    }
  }

  function finishGameWithWinning() {
    finishGame('gamerWon');
    setIsGamerWon(true);
  }

  function finishGameWithLoosing() {
    finishGame('gamerLoosed');
    setIsGamerWon(false);
    openAllMinedCells();
  }

  const { getMarksLeft } = mapGetters('game');

  const {getCellClassName, getCellMarkingStatus, getIsMarkingCorrect } = mapGetters('cells');

  const getCellClass = computed(()=> {
    return `cell cell_small cell_${getCellClassName.value(props.id)}`
  })

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
    &_question-closed {
      background-position: -51px 34px;
    }
    &_question {
      background-position: -68px 34px;
    }
    &_mine {
      background-position: -85px 34px;
    }
    &_mine-activated {
      background-position: -102px 34px;
    }
    &_mine-wrongly-marked {
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
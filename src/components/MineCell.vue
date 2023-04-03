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

  const { setIsGamerWon, setGameStatus, decrementMarkedCellsCount, incrementMarkedCellsCount } = mapMutations('game');
  const { setCellClassName, toggleCellMarkingStatus } = mapMutations('cells');

  const { stopGame } = mapActions('game');
  const { openCell, openAllMinedCells, checkMarking } = mapActions('cells');

  function rightMouseClickHandler() {
    if (!getCellMarkingStatus.value(props.id)) {
      incrementMarkedCellsCount();
      toggleCellMarkingStatus(props.id);
      setCellClassName({id: props.id, className: 'marked'});
      checkWinning();
    } else {
      decrementMarkedCellsCount();
      toggleCellMarkingStatus(props.id);
      setCellClassName({id: props.id, className: 'closed'});
    }
  }

  function checkWinning() {
    if (checkHowManyMarksAreLeft()) {
      stopGame();
      checkMarking();
      if (getIsMarkingCorrect) {
        setGameStatus('gamerWon');
        setIsGamerWon(true);
      } else {
        openAllMinedCells();
        setGameStatus('gamerLoosed');
        setIsGamerWon(false);
      }
    }
  }

  function checkHowManyMarksAreLeft() {
    return getMarkedCellsCount - getFieldSize === 0
  }

  function leftMouseClickHandler() {
    openCell(props.id);
    const className = getCellClassName.value(props.id);
    if (className === 'mine_activated') {
      setIsGamerWon(false);
      openAllMinedCells();
      stopGame();
      setGameStatus('gamerLoosed');
    }
  }

  const { getMarkedCellsCount } = mapGetters('game');

  const {getCellClassName, getCellMarkingStatus, getFieldSize, getIsMarkingCorrect } = mapGetters('cells');

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
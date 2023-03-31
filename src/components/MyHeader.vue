<template>
  <header>
    <div class="digit__box">
      <div class="digit digit_1"></div>
      <div class="digit digit_2"></div>
    </div>
    <div class="status">
      <button></button>
    </div>
    <div class="digit__box">
      <div 
        v-for="digit of getDigitsArray" 
        :key="digit"
        :class="`digit digit_${digit}`"
      >
      </div>
    </div>
  </header>

</template>
<script>
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: 'MyHeader',

    computed: {
      ...mapGetters('game', [
        'getFieldSize',
        'getMarkedCellsCount'
      ]),
      getDigitsArray(){
        const digits = this.getFieldSize - this.getMarkedCellsCount;
        debugger
        const hundreds = Math.floor(digits / 100);
        const tens = Math.floor(digits % 100 / 10);
        const ones = digits % 100 % 10;
        return [hundreds, tens, ones]
      }
    }
  }
</script>

<style lang="scss" scoped>
  header {
    display: flex;
    border: 2px inset rgb(224, 224, 224);
    padding: 3px;
    margin-bottom: 5px;
    .status {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        height: 25px;
        width: 25px;
        background-image: url(/src/assets/minesweeper-sprites_9TPZzv3.png);
        background-position: -1px -25px;
        border: 0;
      }
    }
    .digit {
        height: 22px;
        width: 12px;
        background-image: url(/src/assets/minesweeper-sprites_9TPZzv3.png);
        &__box {
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px inset rgb(224, 224, 224);
        }
        &_1 {
          background-position: 0px 0px;
        }
        &_2 {
          background-position: -14px 0;
        }
        &_3 {
          background-position: -28px 0;
        }
        &_4 {
          background-position: -42px 0;
        }
        &_5 {
          background-position: -56px 0;
        }
        &_6 {
          background-position: -70px 0;
        }
        &_7 {
          background-position: -84px 0;
        }
        &_8 {
          background-position: -98px 0;
        }
        &_9 {
          background-position: -112px 0;
        }
        &_0 {
          background-position: -126px 0;
        }
      }
  }
</style>
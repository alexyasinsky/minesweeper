<template>
  <div class="digit__box">
    <div
        v-for="(digit, ind) of getDigitsArray"
        :key="ind"
        :class="`digit digit_${digit}`"
    >
    </div>
  </div>
</template>

<script>
export default {
  name: "DigitsView",
  components: {},
  props: {
    number: Number,
    digitsQuantity: Number
  },
  data() {
    return {}
  },
  methods: {
    convertStringToArray(str){
      return str.split('');
    },
    increaseDigitsNumber(number) {
      let numberStr = String(number);
      const increaseCount = this.digitsQuantity - numberStr.length;
      if (increaseCount > 0) {
        for (let i = 1; i <= increaseCount; i++) {
          numberStr = '0' + numberStr;
        }
      }
      return numberStr;
    }
  },
  computed: {
    getDigitsArray(){
      let digits = this.increaseDigitsNumber(this.number);
      return this.convertStringToArray(digits);
    }
  },
}
</script>

<style lang="scss" scoped>
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
      background-position: 0 0;
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
</style>
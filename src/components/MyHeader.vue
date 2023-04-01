<template>
  <header>
    <digits-view
        :number="this.getFieldSize - this.getMarkedCellsCount"
        :digits-quantity="2"
    />
    <div class="status">
      <button></button>
    </div>
    <digits-view
        :number="this.getStopwatchCounter"
        :digits-quantity="3"
    />
  </header>

</template>
<script>
  import {mapGetters} from "vuex";
  import DigitsView from "./DigitsView.vue";

  export default {
    name: 'MyHeader',
    components: {DigitsView},
    methods: {

    },
    computed: {
      ...mapGetters('game', [
        'getFieldSize',
        'getMarkedCellsCount',
        'getStopwatchCounter'
      ]),
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
  }
</style>
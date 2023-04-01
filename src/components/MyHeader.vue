<template>
  <header>
    <digits-view
        :number="getFieldSize - getMarkedCellsCount"
        :digits-quantity="2"
    />
    <game-status/>
    <digits-view
        :number="getStopwatchCount"
        :digits-quantity="3"
    />
  </header>

</template>
<script>
  import {mapGetters} from "vuex";
  import DigitsView from "./DigitsView.vue";
  import GameStatus from "./gameStatus.vue";

  export default {
    name: 'MyHeader',
    components: {GameStatus, DigitsView},
    methods: {

    },
    computed: {
      ...mapGetters('game', [
        'getFieldSize',
        'getMarkedCellsCount',
        'getStopwatchCount'
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
  }
</style>
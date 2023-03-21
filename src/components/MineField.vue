
<template >
  <div 
    class="row" 
    v-for="row in fieldSize"
    :key="row" 
    >
    <mine-cell
        v-for="column in getColumns"
        :x="column.x"
        :y="row"
        :key="column.key"
    />
  </div>
</template>
// поправить key
<script>
  import MineCell from "./MineCell.vue";

  import {mapActions, mapGetters} from "vuex";

  export default {
    name: "MineField",
    components: {MineCell},
    props: {
    },
    data() {
      return {
        fieldSize: 0
      }
    },
    methods: {
      ...mapActions('mines', ['generateMinesCoords'])
    },
    computed: {
      ...mapGetters('mines', ['getMinesCoords', 'getGamerSteps']),
      ...mapGetters('game', ['getFieldSize']),
      getColumns() {
        const columns = [];
        for (let i = 1; i <= this.fieldSize; i++) {
          columns.push({
              variant: 'eight',
              x: i,
              key: Math.floor(Math.random()*100000)
              // поправить key
            }
          )
        }
        return columns;
      }
    },
    created() {
      this.generateMinesCoords(this.getFieldSize);
    },
    mounted() {
      this.fieldSize = this.getFieldSize;
    }
  }
</script>

<style lang="scss" scoped>
  .row {
    display: flex;
  }
</style>

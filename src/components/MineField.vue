
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
        :key="`x${column.x}y${row}`"
        :id="`x${column.x}y${row}`"
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
      ...mapActions('cells', ['generateCells'])
    },
    computed: {
      ...mapGetters('game', ['getFieldSize']),
      ...mapGetters('cells', ['getCells']),
      getColumns() {
        const columns = [];
        for (let i = 1; i <= this.fieldSize; i++) {
          columns.push({
              x: i,
            }
          )
        }
        return columns;
      }
    },
    created() {
      this.generateCells(this.getFieldSize);
    },
    mounted() {
      this.fieldSize = this.getFieldSize;
      console.log(this.getCells);
    }
  }
</script>

<style lang="scss" scoped>
  .row {
    display: flex;
  }
</style>


<template >
  <div 
    class="row" 
    v-for="row in this.getFieldSize"
    :key="row" 
    >
    <mine-cell
        v-for="column in getColumns"
        :key="`x${column.x}y${row}`"
        :id="`x${column.x}y${row}`"
    />
  </div>
</template>
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
      }
    },
    methods: {
      ...mapActions('game/cells', ['generateCells'])
    },
    computed: {
      ...mapGetters('game', ['getFieldSize']),
      ...mapGetters('game/cells', ['getCells']),
      getColumns() {
        const columns = [];
        for (let i = 1; i <= this.getFieldSize; i++) {
          columns.push({
              x: i,
            }
          )
        }
        return columns;
      }
    },
    created() {
      this.generateCells();
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  .row {
    display: flex;
  }
</style>

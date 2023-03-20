
<template >
  <div class="row" v-for="row in fieldSize">
    <mine-cell
        v-for="column in getColumns"
        :variant="column.variant"
        :y="row"
        :x="column.x"
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
        fieldSize: 0
      }
    },
    methods: {
      ...mapActions('mines', ['generateMinesCoords'])
    },
    computed: {
      ...mapGetters('mines', ['getMinesCoords']),
      ...mapGetters('game', ['getFieldSize']),
      getColumns() {
        const columns = [];
        for (let i = 1; i <= this.fieldSize; i++) {
          columns.push({
              variant: 'eight',
              x: i
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
      // console.log(this.getMinesCoords)
    }
  }
</script>

<style lang="scss" scoped>
  .row {
    display: flex;
  }
</style>

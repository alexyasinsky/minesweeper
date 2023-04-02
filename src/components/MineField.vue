
<template>
  <div class="field"
       @click.once ="startGame"
       @contextmenu.once="startGame"
  >
    <div 
    class="row" 
    v-for="row in getFieldSize"
    :key="row" 
    >
    <mine-cell
        v-for="column in getFieldSize"
        :key="`x${column}y${row}`"
        :id="`x${column}y${row}`"
    />
  </div>
  </div>
  
</template>
<script>
  import MineCell from "./MineCell.vue";

  import {mapActions, mapGetters} from "vuex";

  export default {
    name: "MineField",
    components: {MineCell},
    methods: {
      ...mapActions('game', ['startGame']),
      ...mapActions('cells', ['generateCells',])
    },
    computed: {
      ...mapGetters('cells', ['getFieldSize']),
    },
    created() {
      this.generateCells();
    },
  }
</script>

<style lang="scss" scoped>

  .field {
    border: 3px inset rgb(224, 224, 224);
  }
  .row {
    display: flex;
  }
</style>

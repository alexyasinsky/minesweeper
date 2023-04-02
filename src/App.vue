<template>
  <div class="wrapper">
    <myHeader/>
    <mine-field /> 
  </div>
    
</template>
<script>


import MineField from "./components/MineField.vue";
import MyHeader from "./components/TheHeader.vue";
import {mapMutations} from "vuex";

export default {
  components: {
    MineField,
    MyHeader
  },

  methods: {
    ...mapMutations('cells', ['setFieldSize']),
  },

  created() {
    this.setFieldSize(10);
  }
}

</script>

<style lang="scss" scoped>
  .wrapper {
    background-color: rgb(192, 192, 192);
    width: min-content;
    padding: 5px;
    border: 3px outset rgb(224, 224, 224);
  }
</style>

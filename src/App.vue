<template>
  <div class="wrapper">
    <myHeader/>
    <mine-field /> 
  </div>
    
</template>
<script>


import MineField from "./components/MineField.vue";
import MyHeader from "./components/MyHeader.vue";
import {mapMutations} from "vuex";

export default {
  components: {
    MineField,
    MyHeader
  },

  methods: {
    ...mapMutations('game', ['setFieldSize'])
  },

  created() {
    this.setFieldSize(10);
  }
}

</script>

<style lang="scss" scoped>
  .wrapper {
    background-color: gainsboro;
    width: min-content;
    padding: 10px;
  }
</style>

<template>
  <div class="wrapper">
    <my-header/>
    <mine-field /> 
  </div>
    
</template>
<script setup>


import MineField from "./components/MineField.vue";
import MyHeader from "./components/TheHeader.vue";
import {mapMutations} from "./store/tools/map-state.js";

const { setFieldSize } = mapMutations("cells");

setFieldSize(10);


</script>

<style lang="scss" scoped>
  .wrapper {
    background-color: rgb(192, 192, 192);
    width: min-content;
    padding: 5px;
    border: 3px outset rgb(224, 224, 224);
  }
</style>

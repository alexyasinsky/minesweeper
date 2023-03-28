<template>
  <mine-field/>
</template>

<script>


import MineField from "./components/MineField.vue";
import {mapMutations} from "vuex";
//check
export default {
  components: {
    MineField
  },
  data() {
    return {

    }
  },

  methods: {
    ...mapMutations('game', [
      'setFieldSize'
    ])
  },

  created() {
    this.setFieldSize(10);
  }


}

</script>

<style lang="scss" scoped>

</style>

import cells from './cells';

export default {

  namespaced: true,

  state: {
    fieldSize: 0,
  },

  modules: {
    cells
  },

  mutations: {
    setFieldSize(state, payload) {
      return state.fieldSize = payload
    },
  },

  getters: {
    getFieldSize: state => {
      return state.fieldSize;
    },
  }
}
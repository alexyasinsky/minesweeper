

export default {

  namespaced: true,

  state: {
    fieldSize: 0,
    gamerSteps: []
  },

  actions: {

  },

  mutations: {
    setFieldSize(state, payload) {
      return state.fieldSize = payload
    },
    addGamerStep(state, payload) {
      return state.gamerSteps.push(payload);
    }
  },

  getters: {
    getFieldSize: state => {
      return state.fieldSize;
    },
    getGamerSteps: state => {
      return state.gamerSteps;
    }
  }

}
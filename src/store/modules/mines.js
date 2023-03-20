

export default {

  namespaced: true,

  state: {
    minesCoords: []
  },

  actions: {
    generateMinesCoords({commit}, fieldSize) {
      const coords = [];
      while (coords.length < fieldSize) {
        const x =  Math.floor(Math.random() * fieldSize + 1);
        const y =  Math.floor(Math.random() * fieldSize + 1);
        if (!coords.find(coord => JSON.stringify(coord) === `{\"x\":${x},\"y\":${y}}`)) {
          coords.push({
            x: x,
            y: y
          })
        }
      }
      commit('setMinesCoords', coords);
    },
  },

  mutations: {
    setMinesCoords(state, payload) {
      return state.minesCoords.push(...payload)
    }
  },

  getters: {
    getMinesCoords: state => {
      return state.minesCoords;
    }
  }

}
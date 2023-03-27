

export default {

  namespaced: true,

  state: {
    minedCellsIds: []
  },

  actions: {
    generateMinedCellsIds({commit}, fieldSize) {
      const ids = [];
      while (ids.length < fieldSize) {
        const x =  Math.floor(Math.random() * fieldSize + 1);
        const y =  Math.floor(Math.random() * fieldSize + 1);
        if (!ids.find(id => id === `x${x}y${y}`)) {
          ids.push(`x${x}y${y}`)
        }
      }
      commit('setMinedCellsIds', ids);
    },
  },

  mutations: {
    setMinedCellsIds(state, payload) {
      return state.minedCellsIds.push(...payload)
    }
  },

  getters: {
    getMinedCellsIds: state => {
      return state.minedCellsIds;
    }
  }

}
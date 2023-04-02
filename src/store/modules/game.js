export default {

  namespaced: true,

  state: {
    markedCellsCount: 0,
    gameStatus: 'beforePlaying',
    isGamerWon: undefined,
    stopwatchCount: 0,
    stopwatchId: 0,
  },

  actions: {

    startGame({commit, state}) {
      if (state.isGamerWon === undefined && state.stopwatchId === 0) {
        const id = setInterval(()=> {
          return commit('tickStopwatchCount');
        }, 1000);
        commit('setStopwatchId', id);
        commit('setGameStatus', 'playing');
      }
    },

    stopGame({commit, state}) {
      commit('setGameStatus', 'paused');
      clearInterval(state.stopwatchId);
      commit('setStopwatchId', 0);
    },

    unsetGameStateToDefault({commit}) {
      commit('setIsGamerWon', undefined);
      commit('setGameStatus', 'beforePlaying');
      commit('refreshStopwatchCount');
      commit('setStopwatchId', 0);
    },

  },

  mutations: {
    setGameStatus(state, payload) {
      return state.gameStatus = payload;
    },

    tickStopwatchCount(state) {
      return state.stopwatchCount++;
    },

    setStopwatchId(state, payload) {
      return state.stopwatchId = payload;
    },

    incrementMarkedCellsCount(state) {
      return state.markedCellsCount++;
    },

    decrementMarkedCellsCount(state) {
      return state.markedCellsCount--;
    },

    refreshStopwatchCount(state) {
      return state.stopwatchCount = 0;
    },

    setIsGamerWon(state, payload) {
      return state.isGamerWon = payload;
    }
  },

  getters: {

    getMarkedCellsCount: state => {
      return state.markedCellsCount
    },

    getStopwatchCount: state => {
      return state.stopwatchCount
    },

    getGameStatus: state => {
      return state.gameStatus;
    },

    getIsGamerWon: state => {
      return state.isGamerWon;
    },

  }
}
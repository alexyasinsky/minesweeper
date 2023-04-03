export default {

  namespaced: true,

  state: {
    markedCellsCount: 0,
    gameStatus: 'beforePlaying',
    isGamerWon: undefined,
    stopwatchCount: 0,
    stopwatchWebWorker: undefined
  },

  actions: {

    startGame({commit, state}) {
      if (state.isGamerWon === undefined && state.stopwatchWebWorker === undefined) {
        commit('setStopwatchWebWorker', new Worker('src/store/tools/stopwatch-web-worker.js'));
        state.stopwatchWebWorker.postMessage(state.stopwatchCount);
        state.stopwatchWebWorker.onmessage = () => {
          return commit('tickStopwatchCount');
        }
        commit('setGameStatus', 'playing');
      }
    },

    stopGame({commit, state}) {
      commit('setGameStatus', 'paused');
      state.stopwatchWebWorker.terminate();
      commit('setStopwatchWebWorker', undefined);
    },

    unsetGameStateToDefault({commit}) {
      commit('setIsGamerWon', undefined);
      commit('setGameStatus', 'beforePlaying');
      commit('refreshStopwatchCount');
    },

  },

  mutations: {
    setGameStatus(state, payload) {
      return state.gameStatus = payload;
    },

    tickStopwatchCount(state) {
      return state.stopwatchCount++;
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
    },

    setStopwatchWebWorker(state, payload) {
      return state.stopwatchWebWorker = payload;
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
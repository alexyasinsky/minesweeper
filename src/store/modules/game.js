export default {

  namespaced: true,

  state: {
    marksLeft: 10,
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
      commit('refreshMarksLeft');
    },

  },

  mutations: {
    setGameStatus(state, payload) {
      return state.gameStatus = payload;
    },

    tickStopwatchCount(state) {
      return state.stopwatchCount++;
    },

    incrementMarksLeft(state) {
      return state.marksLeft++;
    },

    decrementMarksLeft(state) {
      return state.marksLeft--;
    },

    refreshMarksLeft(state) {
      return state.marksLeft = 10;
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

    getMarksLeft: state => {
      return state.marksLeft;
    },

    getStopwatchCount: state => {
      return state.stopwatchCount;
    },

    getGameStatus: state => {
      return state.gameStatus;
    },

    getIsGamerWon: state => {
      return state.isGamerWon;
    },

  }
}
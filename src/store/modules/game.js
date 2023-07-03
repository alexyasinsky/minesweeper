export default {

  namespaced: true,

  state: {
    marksLeft: 10,
    gameStatus: 'beforePlaying',
    stopwatchCount: 0,
    stopwatchWebWorker: undefined
  },

  actions: {

    startGame({commit, dispatch}) {
      commit('setGameStatus', 'playing');
      dispatch('addStopwatchWebWorker');
    },

    pauseGame({commit, dispatch}) {
      commit('setGameStatus', 'paused');
      dispatch('deleteStopwatchWebWorker');
    },

    finishGame({commit, dispatch, state}, gameStatus) {
      commit('setGameStatus', gameStatus);
      if (state.stopwatchWebWorker !== undefined) {
        dispatch('deleteStopwatchWebWorker');
      }

    },

    addStopwatchWebWorker({commit, state}) {
      commit('setStopwatchWebWorker', new Worker('src/store/tools/stopwatch-web-worker.js'));
      state.stopwatchWebWorker.postMessage(state.stopwatchCount);
      state.stopwatchWebWorker.onmessage = () => {
        return commit('tickStopwatchCount');
      }
    },

    deleteStopwatchWebWorker({commit, state}) {
      state.stopwatchWebWorker.terminate();
      commit('setStopwatchWebWorker', undefined);
    },


    unsetGameStateToDefault({commit}) {
      commit('refreshMarksLeft');
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


  }
}
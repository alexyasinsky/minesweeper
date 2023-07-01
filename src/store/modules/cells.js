import {getClosedCellsAround, checkMinesAround} from "../tools/tools.js";

export default {

  namespaced: true,

  state: {
    fieldSize: 0,
    cells: {},
    isMarkingCorrect: true,
  },

  actions: {

    generateCells({dispatch, state}) {
      const cells = {};
      for (let i = 1; i <= state.fieldSize; i++) {
        for (let j = 1; j <= state.fieldSize; j++) {
          cells[`x${j}y${i}`] = {
            id: `x${j}y${i}`,
            isMined: false,
            isClosed: true,
            className: 'closed',
            isMarked: false,
          }
        }
      }
      dispatch('mineCells', cells)
    },

    mineCells({commit, state}, cells) {
      const ids = [];
      while (ids.length < state.fieldSize) {
        const x = Math.floor(Math.random() * state.fieldSize + 1);
        const y = Math.floor(Math.random() * state.fieldSize + 1);
        if (!ids.find(id => id === `x${x}y${y}`)) {
          ids.push(`x${x}y${y}`)
        }
      }
      ids.forEach(id => {
        cells[id].isMined = true;
      })
      commit('setCells', cells);
    },

    openCell({commit, state, dispatch}, id) {
      commit('toggleCellCloseStatus', id);
      if (state.cells[id].isMined) {
        return commit('setCellClassName', {id, className: 'mine_activated'});
      }
      const closedCellsAround = getClosedCellsAround(id, state.cells, state.fieldSize);
      const minesAroundAmount = checkMinesAround(closedCellsAround, state.cells);
      if (minesAroundAmount) {
        return commit('setCellClassName', {id, className: minesAroundAmount});
      }
      commit('setCellClassName', {id, className: 'empty'});
      closedCellsAround.forEach(cell => {
        dispatch('openCell', cell)
      });
    },

    checkMarking({commit, state}) {
      for (let cell in state.cells) {
        if (state.cells[cell].isMarked !== state.cells[cell].isMined) {
          commit('toggleIsMarkingCorrect');
        }
      }
    },

    openAllMinedCells({commit, state}) {
      for (let cell in state.cells) {
        if (state.cells[cell].isClosed && state.cells[cell].isMined) {
          commit('setCellClassName', {id: state.cells[cell].id, className: 'mine'});
        }
      }
    },

  },

  mutations: {

    toggleIsMarkingCorrect(state) {
      return state.isMarkingCorrect = !state.isMarkingCorrect;
    },

    setFieldSize(state, payload) {
      return state.fieldSize = payload
    },

    setCells(state, payload) {
      return state.cells = payload;
    },

    setCellClassName(state, payload) {
      return state.cells[payload.id].className = payload.className;
    },

    toggleCellCloseStatus(state, payload) {
      return state.cells[payload].isClosed = !state.cells[payload].isClosed;
    },

    toggleCellMarkingStatus(state, payload) {
      return state.cells[payload].isMarked = !state.cells[payload].isMarked;
    },
  },

  getters: {

    getFieldSize: state => {
      return state.fieldSize;
    },

    getCellMarkingStatus: state => id => {
      return state.cells[id].isMarked;
    },

    getCellClassName: state => id => {
      return state.cells[id].className
    },
    getIsMarkingCorrect: state => {
      return state.isMarkingCorrect;
    }
  }
}

// import cells from './cells';

function getCoordsFromId(id) {
  let coordArray = id.match(/\d+/g);
  return {
    x: +coordArray[0],
    y: +coordArray[1]
  }
}

function getClosedCellsAround(id, allCells, fieldSize) {
  const {x, y} = getCoordsFromId(id);
  let closedCellsAround = [];
  if (x - 1 > 0 && y - 1 > 0 && allCells[`x${x - 1}y${y - 1}`].isClosed === true) {
    closedCellsAround.push(`x${x - 1}y${y - 1}`);
  }
  if (y - 1 > 0 && allCells[`x${x}y${y - 1}`].isClosed === true) {
    closedCellsAround.push(`x${x}y${y - 1}`);
  }
  if (x + 1 <= fieldSize && y - 1 > 0 && allCells[`x${x + 1}y${y - 1}`].isClosed === true) {
    closedCellsAround.push(`x${x + 1}y${y - 1}`);
  }
  if (x - 1 > 0 && allCells[`x${x - 1}y${y}`].isClosed === true) {
    closedCellsAround.push(`x${x - 1}y${y}`);
  }
  if (x + 1 <= fieldSize && allCells[`x${x + 1}y${y}`].isClosed === true) {
    closedCellsAround.push(`x${x + 1}y${y}`);
  }
  if (x - 1 > 0 && y + 1 <= fieldSize && allCells[`x${x - 1}y${y + 1}`].isClosed === true) {
    closedCellsAround.push(`x${x - 1}y${y + 1}`);
  }
  if (y + 1 <= fieldSize && allCells[`x${x}y${y + 1}`].isClosed === true) {
    closedCellsAround.push(`x${x}y${y + 1}`);
  }
  if (x + 1 <= fieldSize && y + 1 <= fieldSize && allCells[`x${x + 1}y${y + 1}`].isClosed === true) {
    closedCellsAround.push(`x${x + 1}y${y + 1}`);
  }

  return closedCellsAround;
}

function checkMinesAround(closedCells, allCells) {
  let count = 0;
  for (let cell of closedCells) {
    if (allCells[cell].isMined) {
      count++
    }
  }
  return count;
}

export default {

  namespaced: true,

  state: {
    cells: {},
    fieldSize: 0,
    markedCellsCount: 0,
    gameStatus: 'stop',
    isGamerWon: undefined,
    stopWatchCounter: 12
  },

  // modules: {
  //   cells
  // },

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
        const x =  Math.floor(Math.random() * state.fieldSize + 1);
        const y =  Math.floor(Math.random() * state.fieldSize + 1);
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
      commit('setCellCloseStatus', id);
      if (state.cells[id].isMined) {
        return commit('setCellClassName', {id, className: 'mine_activated'})
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
    markCell({commit}, id) {
      commit('incrementMarkedCellsCount');
      commit('setCellMarkedStatus', id);
      commit('setCellClassName', {id, className: 'marked'});
    },

    checkHowManyMarksAreLeft({dispatch, state}) {
      if (state.markedCellsCount - state.fieldSize === 0) {
        dispatch('checkWinning');
      }
    },
    checkWinning({commit, state}) {
      commit('stopGame');
      for (let cell in state.cells) {
        if (state.cells[cell].isMarked !== state.cells[cell].isMined) {
          debugger
          return commit('setIsGamerWon', false);
        }
      }
      return commit('setIsGamerWon', true);
    }
  },

  mutations: {
    setFieldSize(state, payload) {
      return state.fieldSize = payload
    },
    incrementMarkedCellsCount(state) {
      return state.markedCellsCount++;
    },
    stopGame(state) {
      return state.gameStatus = 'stop';
    },
    setCells(state, payload) {
      return state.cells = payload;
    },
    setCellCloseStatus(state, payload) {
      return state.cells[payload].isClosed = false;
    },
    setCellClassName(state, payload) {
      return state.cells[payload.id].className = payload.className;
    },
    setCellMarkedStatus(state, payload) {
      return state.cells[payload].isMarked = true;
    },
    setIsGamerWon(state, payload) {
      return state.isGamerWon = payload;
    }
  },

  getters: {
    getFieldSize: state => {
      return state.fieldSize;
    },
    getMarkedCellsCount: state => {
      return state.markedCellsCount
    },
    getCells: state => {
      return state.cells;
    },

    getCellMineStatus: state => id => {
      return state.cells[id].isMined;
    }, 

    getCellCloseStatus: state => id => {
      return state.cells[id].isClosed;
    }, 

    getCellClassName: state => id => {
      return state.cells[id].className
    },

    getStopwatchCounter: state => {
      return state.stopWatchCounter
    }
  }
}
function getCoordsFromId(id) {
  let coordArray = id.match(/\d+/g);
  return {
    x: +coordArray[0],
    y: +coordArray[1]
  }
}

function getCellsToCheck(id, allCells, fieldSize) {

  const {x, y} = getCoordsFromId(id);
  let cellsToCheck = [];
  if (x - 1 > 0 && y - 1 > 0 && allCells[id].isOpened === false) {
    cellsToCheck.push(`x${x - 1}y${y - 1}`);
  }
  if (y - 1 > 0 && allCells[id].isOpened === false) {
    cellsToCheck.push(`x${x}y${y - 1}`);
  }
  if (x + 1 <= fieldSize && y - 1 > 0 && allCells[id].isOpened === false) {
    cellsToCheck.push(`x${x + 1}y${y - 1}`);
  }
  if (x - 1 > 0 && allCells[id].isOpened === false) {
    cellsToCheck.push(`x${x - 1}y${y}`);
  }
  if (x + 1 <= fieldSize && allCells[id].isOpened === false) {
    cellsToCheck.push(`x${x + 1}y${y}`);
  }
  if (x - 1 > 0 && y + 1 <= fieldSize && allCells[id].isOpened === false) {
    cellsToCheck.push(`x${x - 1}y${y + 1}`);
  }
  if (y + 1 <= fieldSize && allCells[id].isOpened === false) {
    cellsToCheck.push(`x${x}y${y + 1}`);
  }
  if (x + 1 <= fieldSize && y + 1 <= fieldSize && allCells[id].isOpened === false) {
    cellsToCheck.push(`x${x + 1}y${y + 1}`);
  }

  return cellsToCheck;
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
    fieldSize: 10
  },

  actions: {
    generateCells({dispatch, state}) {
      const cells = {};
      for (let i = 1; i <= state.fieldSize; i++) {
        for (let j = 1; j <= state.fieldSize; j++) {
          cells[`x${j}y${i}`] = {
              id: `x${j}y${i}`,
              isMined: false,
              isOpened: false,
              className: 'closed'
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

    openCell({commit, state}, id) {
      commit('setCellOpeningStatus', id);
      if (state.cells[id].isMined) {
        return commit('setCellClassName', {id, className: 'mine_activated'})
      }
      const closedCellsAround = getCellsToCheck(id, state.cells, state.fieldSize);
      const minesAroundAmount = checkMinesAround(closedCellsAround, state.cells);
      if (minesAroundAmount) {
        switch (minesAroundAmount) {
          case 1:
            return commit('setCellClassName', {id, className: 'one'});
          case 2:
            return commit('setCellClassName', {id, className: 'two'});
          case 3:
            return commit('setCellClassName', {id, className: 'three'});
          case 4:
            return commit('setCellClassName', {id, className: 'four'});
          case 5:
            return commit('setCellClassName', {id, className: 'five'});
          case 6:
            return commit('setCellClassName', {id, className: 'six'});
          case 7:
            return commit('setCellClassName', {id, className: 'seven'});
          case 8:
            return commit('setCellClassName', {id, className: 'eight'});
          default:
            break
        }
      }
      return commit('setCellClassName', {id, className: 'empty'});
    }

  },

  mutations: {
    setCells(state, payload) {
      return state.cells = payload;
    },
    setCellOpeningStatus(state, payload) {
      return state.cells[payload].isOpened = true;
    },
    setCellClassName(state, payload) {
      return state.cells[payload.id].className = payload.className;
    }
  },

  getters: {
    getCells: state => {
      return state.cells;
    },
    getCellMineStatus: state => id => {
      return state.cells[id].isMined;
    }, 
    getCellOpeningStatus: state => id => {
      return state.cells[id].isOpened;
    }, 
    getCellClassName: state => id => {
      return state.cells[id].className
    }
  }
}
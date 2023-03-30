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
    cells: {},

    actions: {
      generateCells({dispatch, rootState}) {
        const cells = {};
        for (let i = 1; i <= rootState.game.fieldSize; i++) {
          for (let j = 1; j <= rootState.game.fieldSize; j++) {
            cells[`x${j}y${i}`] = {
                id: `x${j}y${i}`,
                isMined: false,
                isClosed: true,
                className: 'closed'
              }
          }
        }
        dispatch('mineCells', cells)
      },
  
      mineCells({commit, rootState}, cells) {
        const ids = [];
        while (ids.length < rootState.game.fieldSize) {
          const x =  Math.floor(Math.random() * rootState.game.fieldSize + 1);
          const y =  Math.floor(Math.random() * rootState.game.fieldSize + 1);
          if (!ids.find(id => id === `x${x}y${y}`)) {
            ids.push(`x${x}y${y}`)
          }
        }
        ids.forEach(id => {
          cells[id].isMined = true;
        })
        commit('setCells', cells);
      },
  
      openCell({commit, state, rootState, dispatch}, id) {
        commit('setCellCloseStatus', id);
        if (state.cells[id].isMined) {
          return commit('setCellClassName', {id, className: 'mine_activated'})
        }
        const closedCellsAround = getClosedCellsAround(id, state.cells, rootState.game.fieldSize);
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
        commit('setCellClassName', {id, className: 'empty'});
        closedCellsAround.forEach(cell => {
          dispatch('openCell', cell)
        });
      }
    },

    mutations: {
      setCells(state, payload) {
        return state.cells = payload;
      },
      setCellCloseStatus(state, payload) {
        return state.cells[payload].isClosed = false;
      },
      setCellClassName(state, payload) {
        return state.cells[payload.id].className = payload.className;
      },
    },

    getters: {
      
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
    }

}
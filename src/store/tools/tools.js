export function getCoordsFromId(id) {
  let coordArray = id.match(/\d+/g);
  return {
    x: +coordArray[0],
    y: +coordArray[1]
  }
}

export function getClosedCellsAround(id, allCells, fieldSize) {
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

export function checkMinesAround(closedCells, allCells) {
  let count = 0;
  for (let cell of closedCells) {
    if (allCells[cell].isMined) {
      count++
    }
  }
  return count;
}
/**
 * Return a string representing the path through the maze.
 * @param {array} maze
 * @param {array} index The starting point
 */
function mazeSolver(maze, index = [0, 0], path = "") {
  const row = index[0];
  const col = index[1];
  let currentCell = maze[row][col]
  
  if(currentCell !== 'e' && currentCell !== '*') maze[row][col] = 'o';
  
  if(currentCell === 'e'){
    let mapString = ''
    for(let i = 0; i < maze.length; i++){
      mapString += `${maze[i]}\n`;
    }
    return path;
  }
  if(isValidNextCell(maze, [row, col-1])) {
    return mazeSolver(maze, [row, col-1], path + "L")
  }
  if(isValidNextCell(maze, [row, col+1])) {
    return mazeSolver(maze, [row, col+1], path + "R")
  }
  if(isValidNextCell(maze, [row+1, col])) {
    return mazeSolver(maze, [row+1, col], path + "D")
  }
  
}
function isValidNextCell(maze, nextCell){
  const maxRow = maze[0].length -1;
  const maxCol = maze.length -1;
  const nextRow = nextCell[0];
  const nextCol = nextCell[1];
  
  if(nextCol >= 0 && nextCol <= maxCol && nextRow <= maxRow){
    const cell = maze[nextRow][nextCol];
    return (cell !== '*' && cell !== 'o')
  }
  return false;
  
}
module.exports = mazeSolver;



function init() {
  // variables
  const grid = document.querySelector('.grid')
  const width = 21
  const cellCount = width * width
  const cells = []

  const playerClass = 'player'
  const borderClass = 'border'
  const playerStartPosition = 22
  let playerCurrentPosition = 22

  const level = 'beginner'

  const borderArray = []

  // functions

  // create the grid
  function createGrid(playerStartPosition) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.innerText = i
      grid.appendChild(cell)
      cells.push(cell)
      // generate borders and map
      if (level === 'beginner') {
        if (i < width || (i % width === 0 && i !== 210) || (i % width === width - 1 && i !== 230) || i + width > width * width - 1 || borderArray.includes(i)) {
          cell.classList.add('border')
        }
      }
    }
    addPlayer(playerStartPosition)
  }

  // add the player 
  function addPlayer(position) {
    console.log('position passed in ->', position)
    console.log('cell being used', cells[position])
    cells[position].classList.add(playerClass)
  }

  // remove the player
  function removePlayer(position) {
    console.log('position passed in ->', position)
    console.log('position being used ->', cells[position])
    cells[position].classList.remove(playerClass)
  }

  // move the player
  function handleKeyDown(event) {
    const key = event.keyCode
    console.log('position before moving ->', playerCurrentPosition)
    console.log(key)
    removePlayer(playerCurrentPosition)

    if (key === 38 && !cells[playerCurrentPosition - width].classList.contains(borderClass)) { // up
      playerCurrentPosition -= width
    } else if (key === 39 && (!cells[playerCurrentPosition + 1].classList.contains(borderClass) || playerCurrentPosition === 230)) { // right
      if (playerCurrentPosition === 230) {
        playerCurrentPosition = 210
      } else {
        playerCurrentPosition ++
      }
    } else if (key === 40 && !cells[playerCurrentPosition + width].classList.contains(borderClass)) { // down
      playerCurrentPosition += width
    } else if (key === 37 && (!cells[playerCurrentPosition - 1].classList.contains(borderClass) || playerCurrentPosition === 210)) {// left
      if (playerCurrentPosition === 210) {
        playerCurrentPosition = 230
      } else {
        playerCurrentPosition--
      }
    }
    console.log('position after moving ->', playerCurrentPosition)
    addPlayer(playerCurrentPosition)
  }

  createGrid(playerStartPosition)

  // event listeners
  document.addEventListener('keydown', handleKeyDown)

}

window.addEventListener('DOMContentLoaded', init)
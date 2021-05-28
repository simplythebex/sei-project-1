function init() {
  // variables
  const grid = document.querySelector('.grid')
  const width = 11
  const cellCount = width * width
  const cells = []

  // player info
  const playerClass = 'player'
  const playerStartPosition = 12
  let playerCurrentPosition = 12

  // first ghost info
  const ghostClass = 'ghost'
  const ghostStartPosition = 65
  let ghostCurrentPosition = 65

  // level
  const level = 'beginner'

  // border info
  const borderClass = 'border'
  const borderArray = [24, 25, 26, 28, 29, 30, 45, 46, 48, 50, 52, 53, 59, 61, 67, 68, 70, 71, 72, 74, 75, 90, 91, 92, 94, 95, 96]

  // food info
  const foodClass = 'food'
  let score = 0
  const grabScore = document.querySelector('.score span')

  // fossil info
  const fossilClass = 'fossil'
  let lives = 2
  const grabLives = document.querySelector('.lives span')

  // functions

  // create the grid
  function createGrid(playerStartPosition) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      // cell.innerText = i
      grid.appendChild(cell)
      cells.push(cell)
      // generate borders and map
      if (level === 'beginner') {
        if (i < width || (i % width === 0 && i !== 55) || (i % width === width - 1 && i !== 65) || i + width > width * width - 1 || borderArray.includes(i)) {
          cell.classList.add(borderClass)
        } else if (i === 82) {
          cell.classList.add(fossilClass)
        } else if (!cell.classList.contains(borderClass) && !cell.classList.contains(fossilClass)) {
          console.log(cell)
          cell.classList.add(foodClass)
        }
      }
    }
    addPlayer(playerStartPosition)
    // addFirstGhost(ghostStartPosition)
    // moveGhost()
  }

  // add the player 
  function addPlayer(position) {
    cells[position].classList.add(playerClass)
  }

  // remove the player
  function removePlayer(position) {
    cells[position].classList.remove(playerClass)
  }

  // add first ghost
  function addFirstGhost(position) {
    cells[position].classList.add(ghostClass)
  }

  // remove first ghost
  function removeFirstGhost(position) {
    cells[position].classList.remove(ghostClass)
  }

  // move the player
  function handleKeyDown(event) {
    const key = event.keyCode
    console.log('position before moving ->', playerCurrentPosition)
    console.log(key)
    removePlayer(playerCurrentPosition)

    if (key === 38 && !cells[playerCurrentPosition - width].classList.contains(borderClass)) { // up
      playerCurrentPosition -= width
      eatFruit(playerCurrentPosition)
      getFossil(playerCurrentPosition)
    } else if (key === 39 && (!cells[playerCurrentPosition + 1].classList.contains(borderClass) || playerCurrentPosition === 65)) { // right
      if (playerCurrentPosition === 65) {
        playerCurrentPosition = 55
        eatFruit(playerCurrentPosition)
        getFossil(playerCurrentPosition)
      } else {
        playerCurrentPosition ++
        eatFruit(playerCurrentPosition)
        getFossil(playerCurrentPosition)
      }
    } else if (key === 40 && !cells[playerCurrentPosition + width].classList.contains(borderClass)) { // down
      playerCurrentPosition += width
      eatFruit(playerCurrentPosition)
      getFossil(playerCurrentPosition)
    } else if (key === 37 && (!cells[playerCurrentPosition - 1].classList.contains(borderClass) || playerCurrentPosition === 55)) {// left
      if (playerCurrentPosition === 55) {
        playerCurrentPosition = 65
        eatFruit(playerCurrentPosition)
        getFossil(playerCurrentPosition)
      } else {
        playerCurrentPosition--
        eatFruit(playerCurrentPosition)
        getFossil(playerCurrentPosition)
      }
    }
    console.log('position after moving ->', playerCurrentPosition)
    addPlayer(playerCurrentPosition)
  }

  // move the ghost
  function moveGhost() {
    const randomIndex = Math.floor(Math.random() * 4)
    removeFirstGhost(ghostCurrentPosition)
    console.log(ghostCurrentPosition)
    if (randomIndex === 0 && !cells[ghostCurrentPosition - width].classList.contains(borderClass)) {
      ghostCurrentPosition -= width
    } else if (randomIndex === 1 && (!cells[ghostCurrentPosition + 1].classList.contains(borderClass) || ghostCurrentPosition === 65)) { // right
      if (ghostCurrentPosition === 65) {
        ghostCurrentPosition = 55
      } else {
        ghostCurrentPosition ++
      }
    } else if (randomIndex === 2 && !cells[ghostCurrentPosition + width].classList.contains(borderClass)) { // down
      ghostCurrentPosition += width
    } else if (randomIndex === 3 && (!cells[ghostCurrentPosition - 1].classList.contains(borderClass) || ghostCurrentPosition === 55)) {// left
      if (ghostCurrentPosition === 55) {
        ghostCurrentPosition = 65
      } else {
        ghostCurrentPosition--
      }
    } 
    // addFirstGhost(ghostCurrentPosition)
  }

  // call move ghost
  // const move = setInterval(() => {
  //   moveGhost()
  // }, 300)

  // eat fruit
  function eatFruit(playerCurrentPosition) {
    if (cells[playerCurrentPosition].classList.contains(foodClass)) {
      cells[playerCurrentPosition].classList.remove(foodClass)
      score++
      updateScore(score)
    }
  }

  // update score
  function updateScore(score) {
    grabScore.innerText = score
  }

  // get fossil
  function getFossil(playerCurrentPosition) {
    if (cells[playerCurrentPosition].classList.contains(fossilClass)) {
      cells[playerCurrentPosition].classList.remove(fossilClass)
      lives++
      updateLives(lives)
    }
  }

  // update lives
  function updateLives(lives) {
    grabLives.innerText = lives
  }


  createGrid(playerStartPosition)

  // event listeners
  document.addEventListener('keydown', handleKeyDown)

}

window.addEventListener('DOMContentLoaded', init)
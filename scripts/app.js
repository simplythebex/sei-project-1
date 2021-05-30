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
  const ghostStartPosition = 38
  let ghostCurrentPosition = 38

  // level
  const level = 'beginner'

  // border info
  const borderClass = 'border'
  const borderArray = [24, 25, 26, 28, 29, 30, 45, 46, 48, 50, 52, 53, 59, 61, 67, 68, 70, 71, 72, 74, 75, 90, 91, 92, 94, 95, 96]

  // food info
  const foodClass = 'food'
  let score = 0
  const grabScore = document.querySelector('.score p')

  // fossil info
  const fossilClass = 'fossil'
  let lives = 2
  const grabLives = document.querySelectorAll('.life')
  console.log(grabLives)

  const hiddenClass = 'hidden'

  // player coordinates
  let x = 1
  let y = 1

  // ghost coordinater
  let a = 5
  let b = 3

  // results
  const result = document.querySelector('.display-result')
  console.log(result)

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
        if (i < width || (i % width === 0 && i !== 55) || (i % width === width - 1 && i !== 65) || i + width > width * width - 1 || borderArray.includes(i)) {
          cell.classList.add(borderClass)
        } else if (i === 82) {
          cell.classList.add(fossilClass)
        } else if (!cell.classList.contains(borderClass) && !cell.classList.contains(fossilClass)) {
          cell.classList.add(foodClass)
        }

        grabLives[2].classList.add(hiddenClass)
      }
    }
    addPlayer(playerStartPosition)
    addFirstGhost(ghostStartPosition)
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

  // eat fruit/fossil
  function handleInteraction(playerCurrentPosition) {
    eatFruit(playerCurrentPosition)
    getFossil(playerCurrentPosition)
  }

  // move the player
  function handleKeyDown(event) {
    const key = event.keyCode
    removePlayer(playerCurrentPosition)

    // prevents scrolling
    if (key === 38 || key === 40) {
      event.preventDefault()
    }

    // checks which key is pressed, whether there is a border in the direction of press, whether there is a ghost on new tile
    if (key === 38 && !cells[playerCurrentPosition - width].classList.contains(borderClass)) { // up
      playerCurrentPosition -= width
      handleInteraction(playerCurrentPosition)
    } else if (key === 39 && (!cells[playerCurrentPosition + 1].classList.contains(borderClass) || playerCurrentPosition === 65)) { // right
      if (playerCurrentPosition === 65) {
        playerCurrentPosition = 55
        handleInteraction(playerCurrentPosition)
      } else {
        playerCurrentPosition ++
        handleInteraction(playerCurrentPosition)
      }
    } else if (key === 40 && !cells[playerCurrentPosition + width].classList.contains(borderClass)) { // down
      playerCurrentPosition += width
      handleInteraction(playerCurrentPosition)
    } else if (key === 37 && (!cells[playerCurrentPosition - 1].classList.contains(borderClass) || playerCurrentPosition === 55)) {// left
      if (playerCurrentPosition === 55) {
        playerCurrentPosition = 65
        handleInteraction(playerCurrentPosition)
      } else {
        playerCurrentPosition--
        handleInteraction(playerCurrentPosition)
      }
    }
    // adds the player back in, checks for ghosts
    addPlayer(playerCurrentPosition)
    if (cells[playerCurrentPosition].classList.contains(ghostClass)) {
      touchGhost(playerCurrentPosition)
      playerCurrentPosition = playerStartPosition
    } 
    setPlayerCoordinates()
  }

  // move the ghost
  // function moveGhost() {
  //   const randomIndex = Math.floor(Math.random() * 4)
  //   removeFirstGhost(ghostCurrentPosition)
  //   if (randomIndex === 0 && !cells[ghostCurrentPosition - width].classList.contains(borderClass)) { //up
  //     ghostCurrentPosition -= width
  //   } else if (randomIndex === 1 && (!cells[ghostCurrentPosition + 1].classList.contains(borderClass) || ghostCurrentPosition === 65)) { // right
  //     if (ghostCurrentPosition === 65) {
  //       ghostCurrentPosition = 55
  //     } else {
  //       ghostCurrentPosition ++
  //     }
  //   } else if (randomIndex === 2 && !cells[ghostCurrentPosition + width].classList.contains(borderClass)) { // down
  //     ghostCurrentPosition += width
  //   } else if (randomIndex === 3 && (!cells[ghostCurrentPosition - 1].classList.contains(borderClass) || ghostCurrentPosition === 55)) {// left
  //     if (ghostCurrentPosition === 55) {
  //       ghostCurrentPosition = 65
  //     } else {
  //       ghostCurrentPosition--
  //     }
  //   } 
  //   // adds the ghost back in, checks for player
  //   addFirstGhost(ghostCurrentPosition)
  //   if (cells[ghostCurrentPosition].classList.contains(playerClass)) {
  //     touchGhost(playerCurrentPosition)
  //     playerCurrentPosition = playerStartPosition
  //   }
  // }

  // coordinates
  function setPlayerCoordinates () {
    if (playerCurrentPosition > 11 && playerCurrentPosition <= 21) {
      y = 1
    } else if (playerCurrentPosition > 22 && playerCurrentPosition <= 32) {
      y = 2
    } else if (playerCurrentPosition > 33 && playerCurrentPosition <= 43) {
      y = 3
    } else if (playerCurrentPosition > 44 && playerCurrentPosition <= 54) {
      y = 4
    } else if (playerCurrentPosition >= 55 && playerCurrentPosition <= 65) {
      y = 5
    } else if (playerCurrentPosition > 66 && playerCurrentPosition <= 76) {
      y = 6
    } else if (playerCurrentPosition > 77 && playerCurrentPosition <= 87) {
      y = 7
    } else if (playerCurrentPosition > 88 && playerCurrentPosition <= 98) {
      y = 8
    } else if (playerCurrentPosition > 99 && playerCurrentPosition <= 109) {
      y = 9
    }
    x = playerCurrentPosition % 11
    console.log(x, y)
  }

  function setGhostCoordinates () {
    if (ghostCurrentPosition > 11 && ghostCurrentPosition <= 21) {
      b = 1
    } else if (ghostCurrentPosition > 22 && ghostCurrentPosition <= 32) {
      b = 2
    } else if (ghostCurrentPosition > 33 && ghostCurrentPosition <= 43) {
      b = 3
    } else if (ghostCurrentPosition > 44 && ghostCurrentPosition <= 54) {
      b = 4
    } else if (ghostCurrentPosition >= 55 && ghostCurrentPosition <= 65) {
      b = 5
    } else if (ghostCurrentPosition > 66 && ghostCurrentPosition <= 76) {
      b = 6
    } else if (ghostCurrentPosition > 77 && ghostCurrentPosition <= 87) {
      b = 7
    } else if (ghostCurrentPosition > 88 && ghostCurrentPosition <= 98) {
      b = 8
    } else if (ghostCurrentPosition > 99 && ghostCurrentPosition <= 109) {
      b = 9
    }
    a = ghostCurrentPosition % 11
    console.log(a, b)
  }

  // move the ghost intellegently
  function moveGhost() {
    console.log('called move ghost')
    console.log('player coordinater ->', x, y)
    console.log('ghost coordinates ->', a, b)
    // compare y and b
    // if y > b:
    removeFirstGhost(ghostCurrentPosition)
    if (y > b) {
      console.log('ghost higher than player')
      if (!cells[ghostCurrentPosition + width].classList.contains(borderClass)) {
        ghostCurrentPosition += width
        console.log('moving down')
      } else {
        if (x > a) {
          console.log('ghost left of player')
          if (!cells[ghostCurrentPosition + 1].classList.contains(borderClass)) {
            ghostCurrentPosition++ 
            console.log('moving right')
          } else if (x < a) {
            console.log('ghost right of player')
            ghostCurrentPosition--
            console.log('moving left')
          } else if (x === a) {
            console.log('ghost on same vertical plane as player')
          }
        }
      }
    } else if (y < b) {
      console.log('ghost lower than player')
      if (!cells[ghostCurrentPosition - width].classList.contains(borderClass)) {
        ghostCurrentPosition -= width
        console.log('moving up')
      } else {
        if (x > a) {
          console.log('ghost left of player')
          if (!cells[ghostCurrentPosition + 1].classList.contains(borderClass)) {
            ghostCurrentPosition++ 
            console.log('moving right')
          } else if (x < a) {
            console.log('ghost right of player')
            ghostCurrentPosition--
            console.log('moving left')
          } else if (x === a) {
            console.log('ghost on same vertical plane as player')
          }
        }
      }
    } else if (y === b) {
      console.log('ghost on same horizontal plane as player')
      if (x > a) {
        console.log('ghost left of player')
        if (!cells[ghostCurrentPosition + 1].classList.contains(borderClass)) {
          ghostCurrentPosition++ 
          console.log('moving right')
        } else if (x < a) {
          console.log('ghost right of player')
          ghostCurrentPosition--
          console.log('moving left')
        } else if (x === a) [
          console.log('ghost on same vertical plane as player')
        ]
      }
    }
    

    addFirstGhost(ghostCurrentPosition)
    if (cells[ghostCurrentPosition].classList.contains(playerClass)) {
      touchGhost(playerCurrentPosition)
      playerCurrentPosition = playerStartPosition
    }

    //      check for border below
    //      if no border below, move down
    //      if border below, compare x and a
    //      if x > a:
    //            check border right
    //            if no border right, move right
    //            else move left


    // if y < b ghost move up
    setGhostCoordinates()
  }



  // call move ghost
  const move = setInterval(() => {
    console.log('ready to move')
    moveGhost()
  }, 300)

  // eat fruit
  function eatFruit(playerCurrentPosition) {
    if (cells[playerCurrentPosition].classList.contains(foodClass)) {
      cells[playerCurrentPosition].classList.remove(foodClass)
      score += 10
      updateScore(score)
      console.log('fruits?', fruitCheck())
    } 
  }

  // update score
  function updateScore(score) {
    if (score < 10) {
      grabScore.innerText = `0${score}`
    } else {
      grabScore.innerText = score
    }
  }

  // get fossil
  function getFossil(playerCurrentPosition) {
    if (cells[playerCurrentPosition].classList.contains(fossilClass)) {
      cells[playerCurrentPosition].classList.remove(fossilClass)
      increaseLives(lives)
      console.log('lives pre-fossil ->', lives)
      lives++
      console.log('lives post fossil->', lives)
    }
  }

  // update life display:
  // increases life display 
  function increaseLives(lives) {
    if (lives === 1) {
      grabLives[1].classList.remove(hiddenClass)
    } else if (lives === 2) {
      grabLives[2].classList.remove(hiddenClass)
    }
  }
  // decreases life display
  function decreaseLives(lives) {
    if (lives === 3) {
      grabLives[2].classList.add(hiddenClass)
    } else if (lives === 2) {
      grabLives[1].classList.add(hiddenClass)
    } else if (lives === 1) {
      grabLives[0].classList.add(hiddenClass)
    }
  }

  // caught by ghost
  function touchGhost(playerCurrentPosition) {
    removePlayer(playerCurrentPosition)
    decreaseLives(lives)
    lives--
    console.log('lives post catch ->', lives)
    playerCurrentPosition = playerStartPosition
    addPlayer(playerStartPosition)
    gameOver(score, lives)
  }

  // checks if game is won
  let fruitCount = 0
  function fruitCheck () {
    fruitCount = 0
    cells.forEach(cell => {
      if (cell.classList.contains(foodClass)) {
        console.log(cell)
        fruitCount += 1
      }
    }) 
    if (fruitCount === 0) {
      clearInterval(move)
      result.classList.remove('hidden')
      result.innerText = `You win! Your score: ${score}`
      // grid.classList.add(hiddenClass)
    }
  }

  // game over
  function gameOver(score, lives) {
    if (lives === 0) {
      clearInterval(move)
      for (let i = 0; i < cellCount; i++) {
        cells[i].classList.remove(playerClass)
      }
      result.classList.remove('hidden')
      result.innerText = `You were caught too many times! Game Over! Your score: ${score}`
      // grid.classList.add(hiddenClass)
    }
  }

  // makes the grid
  createGrid(playerStartPosition)

  // event listeners
  document.addEventListener('keydown', handleKeyDown)

}

window.addEventListener('DOMContentLoaded', init)
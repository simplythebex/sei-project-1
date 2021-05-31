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
  const scorpianClass = 'scorpian'
  const scorpianStartPosition = 60
  let scorpianCurrentPosition = 60
  let scorpianPreviousPosition = 0
  // let newPosition = 38

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
    addScorpian(scorpianStartPosition)
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
  function addScorpian(position) {
    cells[position].classList.add(scorpianClass)
  }

  // remove first ghost
  function removeScorpian(position) {
    cells[position].classList.remove(scorpianClass)
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
    if (cells[playerCurrentPosition].classList.contains(scorpianClass)) {
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
    if (scorpianCurrentPosition > 11 && scorpianCurrentPosition <= 21) {
      b = 1
    } else if (scorpianCurrentPosition > 22 && scorpianCurrentPosition <= 32) {
      b = 2
    } else if (scorpianCurrentPosition > 33 && scorpianCurrentPosition <= 43) {
      b = 3
    } else if (scorpianCurrentPosition > 44 && scorpianCurrentPosition <= 54) {
      b = 4
    } else if (scorpianCurrentPosition >= 55 && scorpianCurrentPosition <= 65) {
      b = 5
    } else if (scorpianCurrentPosition > 66 && scorpianCurrentPosition <= 76) {
      b = 6
    } else if (scorpianCurrentPosition > 77 && scorpianCurrentPosition <= 87) {
      b = 7
    } else if (scorpianCurrentPosition > 88 && scorpianCurrentPosition <= 98) {
      b = 8
    } else if (scorpianCurrentPosition > 99 && scorpianCurrentPosition <= 109) {
      b = 9
    }
    a = scorpianCurrentPosition % 11
    console.log(a, b)
  }

  // moves ghost right
  function moveGhostRight() {
    scorpianPreviousPosition = scorpianCurrentPosition
    scorpianCurrentPosition++ 
    // console.log('moving right')
  }

  // move ghost left
  function moveGhostLeft () {
    scorpianPreviousPosition = scorpianCurrentPosition
    scorpianCurrentPosition--
    // console.log('moving left')
  }

  // moves ghost up
  function moveGhostUp () {
    scorpianPreviousPosition = scorpianCurrentPosition
    scorpianCurrentPosition -= width
    // console.log('moving up')
  }

  // moves ghost down
  function moveGhostDown () {
    scorpianPreviousPosition = scorpianCurrentPosition
    scorpianCurrentPosition += width
    // console.log('moving down')
  }

  // checks tile to right is clear
  function isRightClear () {
    if (!cells[scorpianCurrentPosition + 1].classList.contains(borderClass)) {
      // console.log('right clear')
      return true
    }
  }

  // checks tile to left is clear
  function isLeftClear () {
    if (!cells[scorpianCurrentPosition - 1].classList.contains(borderClass)) {
      // console.log('left clear')
      return true
    }
  }

  // check tile above is clear
  function isUpClear () {
    if (!cells[scorpianCurrentPosition - width].classList.contains(borderClass)) {
      // console.log('up clear')
      return true
    }
  }

  // check tile below is clear
  function isDownClear () {
    if (!cells[scorpianCurrentPosition + width].classList.contains(borderClass)) {
      // console.log('down clear')
      return true
    }
  }

  // previous position = store position before moving
  // new position == move that is about to happen
  


  // move the ghost intellegently
  function moveGhost() {

    const down = scorpianCurrentPosition + width
    const left = scorpianCurrentPosition - 1
    const right = scorpianCurrentPosition + 1
    const up = scorpianCurrentPosition - width

    removeScorpian(scorpianCurrentPosition)

    // checks movement through tunnel
    if (scorpianCurrentPosition === 55 && x > a && scorpianPreviousPosition !== 65) {
      scorpianPreviousPosition = scorpianCurrentPosition
      scorpianCurrentPosition = 65
    } else if (scorpianCurrentPosition === 65 && x < a && scorpianPreviousPosition !== 55) {
      console.log(scorpianPreviousPosition)
      scorpianPreviousPosition = scorpianCurrentPosition
      scorpianCurrentPosition = 55
    } else if (y > b) {
      console.log('ghost higher than player')      
      if (isDownClear() === true && down !== scorpianPreviousPosition) { // check tile below is clear, check previous position
        moveGhostDown() // move down
      } else { // if below is blocked, do the following
        if (x > a) { // if ghost left of player
          console.log('ghost left of player')
          if (isRightClear() === true && right !== scorpianPreviousPosition) { // check tile to right is clear
            moveGhostRight() // move right
          } else { // if down and right is blocked
            console.log('border to right')
            if (isLeftClear() === true && left !== scorpianPreviousPosition) { // check tile to left is clear
              moveGhostLeft() // move left
            } else { // if down, right and left is blocked
              console.log('border to left')
              if (isUpClear() === true && up !== scorpianPreviousPosition) { // check tile above is clear
                moveGhostUp() // move up
              } 
            }
          }
        } else if (x < a) { // if ghost is to right of player
          console.log('ghost to right of player')
          if (isLeftClear() === true && left !== scorpianPreviousPosition) { // check tile to left is clear
            moveGhostLeft() // move left
          } else { // if down and left is blocked
            console.log('border to left') 
            if (isUpClear() === true && up !== scorpianPreviousPosition) { // check tile above is clear
              moveGhostUp() // move up
            } else { // if down, left and above is blocked
              console.log('border below')
              if (isRightClear() === true && right !== scorpianPreviousPosition) { // check tile to right is clear
                moveGhostRight() // move right
              }
            }
          }
        } else if (x === a) { // if player and ghost are in line on y-axis
          console.log('ghost directly above player')
          if (isLeftClear() === true && left !== scorpianPreviousPosition) { // check if left tile is clear
            moveGhostLeft() // move left
          } else if (isRightClear() === true && right !== scorpianPreviousPosition) { // if down and left are blocked, check if right tile is clear
            moveGhostRight() // move right
          } else if (isUpClear() === true) { // if down, left and right are blocked, check if tile above is clear
            moveGhostUp() // move up
          }
        }
      }
    } else if (y < b) { // if ghost is below player
      console.log('ghost lower than player')
      if (isUpClear() === true && up !== scorpianPreviousPosition) { // check tile above is clear
        moveGhostUp() // move ghost up 
      } else { // if above is blocked
        if (x > a) { // check if ghost is left of player
          console.log('ghost left of player')
          if (isRightClear() === true && right !== scorpianPreviousPosition) { // check if tile to right is clear
            console.log(right)
            moveGhostRight() // move ghost right
          } else if (isLeftClear() === true && left !== scorpianPreviousPosition) { // if above and right is blocked, check left is clear
            moveGhostLeft() // move ghost left
          } else if (isDownClear() === true && down !== scorpianPreviousPosition) { // if above, right and left is blocked, check down is clear
            moveGhostDown() // move ghost down
          }
        } else if (x < a) { // if ghost is right of player
          console.log('ghost right of player')
          if (isLeftClear() === true && left !== scorpianPreviousPosition) { // check tile to left is clear
            moveGhostLeft() // move ghost left
          } else if (isDownClear() === true && down !== scorpianPreviousPosition) { // if above and left is blocked, check if tile below is clear
            moveGhostDown() // move ghost down
          } else if (isRightClear() === true && right !== scorpianPreviousPosition) { // if above, left and below is blocked, check right is clear
            moveGhostRight() // move ghost right
          }
        } else if (x === a) { // if ghost and player are in line on the y-axis
          console.log('ghost on same vertical plane as player')
          if (isLeftClear() === true && left !== scorpianPreviousPosition) { // check left tile is clear
            console.log('move left')
            moveGhostLeft() // move ghost left
          } else if (isRightClear() === true && right !== scorpianPreviousPosition) { // if above and left tile is blocked, check right is clear
            moveGhostRight() // move ghost right
          } else if (isDownClear() === true && down !== scorpianPreviousPosition) { // if above, left and right tile is blocked, check below is clear 
            moveGhostDown() // move ghost down
          }
        }
      }
    } else if (y === b) { // if ghost and player are in line on x-axis
      console.log('ghost on same horizontal plane as player')
      if (x > a) { // if ghost to left of player
        console.log('ghost left of player')
        if (isRightClear() === true && right !== scorpianPreviousPosition) { // check tile to right is clear
          moveGhostRight() // move right
        }  else if (isLeftClear() === true && left !== scorpianPreviousPosition) { // if right is blocked, check tile to left is clear
          moveGhostLeft() // move left
        } else if (isDownClear() === true && down !== scorpianPreviousPosition) { // if right and left blocked, check tile below is clear
          moveGhostDown() // move down
        } else if (isUpClear() === true) { // if right, left and down blocked, check tile above is clear
          moveGhostUp() // move up
        }
      } else if (x < a) { // if ghost to right of player
        console.log('ghost right of player')
        if (isLeftClear() === true && left !== scorpianPreviousPosition) { // check left is clear
          moveGhostLeft() // move left
        } else if (isDownClear() === true && down !== scorpianPreviousPosition) { // if left blocked, check down is clear
          console.log('left not clear')
          moveGhostDown() // move down
        } else if (isRightClear() === true && right !== scorpianPreviousPosition) { // if left and down blocked, check right is clear
          console.log('down not clear')
          moveGhostRight() // move right
        } else if (isUpClear() === true) { // if left, down and right blocked, check up is clear
          console.log('right not clear, moving up')
          moveGhostUp() // move up
        }
      }
    }  
  
    
    

    addScorpian(scorpianCurrentPosition)
    if (cells[scorpianCurrentPosition].classList.contains(playerClass)) {
      touchGhost(playerCurrentPosition)
      playerCurrentPosition = playerStartPosition
    }
    setGhostCoordinates()
  }



  // call move ghost
  const move = setInterval(() => {
    console.log('ready to move')
    moveGhost()
  }, 500)

  // eat fruit
  function eatFruit(playerCurrentPosition) {
    if (cells[playerCurrentPosition].classList.contains(foodClass)) {
      cells[playerCurrentPosition].classList.remove(foodClass)
      score += 10
      updateScore(score)
      fruitCheck()
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
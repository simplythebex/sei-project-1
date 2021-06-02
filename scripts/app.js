function init() {

  // ! variables
  const grid = document.querySelector('.grid')
  // const audio = document.querySelector('audio')
  const start = document.querySelector('.start')
  const reset = document.querySelector('.reset')
  const help = document.querySelector('.help')
  // const sound = document.querySelector('.sound')
  const width = 11
  const cellCount = width * width
  const cells = []
  let pauseStatus = false
  let gameStarted = false

  // player info
  const playerClass = 'player'
  const playerStartPosition = 12
  let playerCurrentPosition = 12

  // scorpian info
  const scorpianClass = 'scorpian'
  const scorpianStartPosition = 60
  let scorpianCurrentPosition = 60
  let scorpianPreviousPosition = 0
  
  // tarantula info
  const tarantulaClass = 'tarantula'
  const tarantulaStartPosition = 49
  let tarantulaCurrentPosition = 49
  let tarantulaPreviousPosition = 0

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

  // hide classes
  const hiddenClass = 'hidden'

  // player coordinates
  let x = 1
  let y = 1

  // scorpian coordinates
  let a = 5
  let b = 5

  // tarantula coordinates
  let c = 5
  let d = 4

  // tarantula goal coordinates
  let x1 = 2

  // results
  const result = document.querySelector('.display-result')
  // console.log(result)

  // help
  const displayHelp = document.querySelector('.display-help')

  // ! functions

  // create the grid
  function createGrid() {
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
    addGhost(scorpianStartPosition, scorpianClass)
    addGhost(tarantulaStartPosition, tarantulaClass)
  }

  function handleEscapeKey(event) {
    // console.log('escape key listening')
    const key = event.keyCode
    if (key === 27) {
      displayHelp.classList.add(hiddenClass)
      if (pauseStatus === true && gameStarted === true) {
        move = setInterval(() => {
          moveScorpian()
          moveTarantula()
        }, 500)
        pauseStatus = false
      }
    }
    // console.log('pause status ->', pauseStatus)
  }  

  // add the player 
  function addPlayer(position) {
    cells[position].classList.add(playerClass)
  }

  // remove the player
  function removePlayer(position) {
    cells[position].classList.remove(playerClass)
  }

  // add ghost
  function addGhost(position, ghostClass) {
    cells[position].classList.add(ghostClass)
  }

  // remove ghost
  function removeGhost(position, ghostClass) {
    cells[position].classList.remove(ghostClass)
  }

  // reset characters
  function resetAllCharacters() {
    removePlayer(playerCurrentPosition)
    removeGhost(scorpianCurrentPosition, scorpianClass)
    removeGhost(tarantulaCurrentPosition, tarantulaClass)
    playerCurrentPosition = playerStartPosition
    scorpianCurrentPosition = scorpianStartPosition
    tarantulaCurrentPosition = tarantulaStartPosition
    addPlayer(playerCurrentPosition)
    addGhost(scorpianCurrentPosition, scorpianClass)
    addGhost(tarantulaCurrentPosition, tarantulaClass)
  }

  // eat fruit/fossil
  function handleInteraction(playerCurrentPosition) {
    eatFruit(playerCurrentPosition)
    getFossil(playerCurrentPosition)
  }

  // key events
  function handleKeyDown(event) {
    const key = event.keyCode
    if (key === 80) { // pauses game
      if (pauseStatus === false) {
        clearInterval(move)
        pauseStatus = true
      } else {
        move = setInterval(() => {
          moveScorpian()
          moveTarantula()
        }, 500)
        pauseStatus = false
      }
    } 

    removePlayer(playerCurrentPosition)

    // prevents scrolling
    if (key === 38 || key === 40) {
      event.preventDefault()
    }
    console.log('x-axis', x)
    // moves the player
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
    if (cells[playerCurrentPosition].classList.contains(scorpianClass) || cells[playerCurrentPosition].classList.contains(tarantulaClass)) {
      touchGhost(playerCurrentPosition)
      playerCurrentPosition = playerStartPosition
    } 
    // setPlayerCoordinates()
    setCharacterCoordinates(playerClass, playerCurrentPosition, x, y)
    // setCharacterCoordinates(tarantulaClass, c, d)
  }

  function setCharacterCoordinates (characterClass, characterPosition, xAxis, yAxis) {

    if (characterPosition > 11 && characterPosition <= 21) {
      yAxis = 1
    } else if (characterPosition > 22 && characterPosition <= 32) {
      yAxis = 2
    } else if (characterPosition > 33 && characterPosition <= 43) {
      yAxis = 3
    } else if (characterPosition > 44 && characterPosition <= 54) {
      yAxis = 4
    } else if (characterPosition >= 55 && characterPosition <= 65) {
      yAxis = 5
    } else if (characterPosition > 66 && characterPosition <= 76) {
      yAxis = 6
    } else if (characterPosition > 77 && characterPosition <= 87) {
      yAxis = 7
    } else if (characterPosition > 88 && characterPosition <= 98) {
      yAxis = 8
    } else if (characterPosition > 99 && characterPosition <= 109) {
      yAxis = 9
    }
    xAxis = characterPosition % 11
    if (characterClass === playerClass) {
      x = xAxis
      y = yAxis
    } else if (characterClass === scorpianClass) {
      a = xAxis
      b = yAxis
    } else if (characterClass === tarantulaClass) {
      c = xAxis
      d = yAxis
    }
  }

  // coordinates
  // function setPlayerCoordinates () {
  //   if (playerCurrentPosition > 11 && playerCurrentPosition <= 21) {
  //     y = 1
  //   } else if (playerCurrentPosition > 22 && playerCurrentPosition <= 32) {
  //     y = 2
  //   } else if (playerCurrentPosition > 33 && playerCurrentPosition <= 43) {
  //     y = 3
  //   } else if (playerCurrentPosition > 44 && playerCurrentPosition <= 54) {
  //     y = 4
  //   } else if (playerCurrentPosition >= 55 && playerCurrentPosition <= 65) {
  //     y = 5
  //   } else if (playerCurrentPosition > 66 && playerCurrentPosition <= 76) {
  //     y = 6
  //   } else if (playerCurrentPosition > 77 && playerCurrentPosition <= 87) {
  //     y = 7
  //   } else if (playerCurrentPosition > 88 && playerCurrentPosition <= 98) {
  //     y = 8
  //   } else if (playerCurrentPosition > 99 && playerCurrentPosition <= 109) {
  //     y = 9
  //   }
  //   x = playerCurrentPosition % 11
  //   x1 = playerCurrentPosition % 11 + 1
  //   // console.log(x, y)
  // }

  // function setScorpianCoordinates () {
  //   if (scorpianCurrentPosition > 11 && scorpianCurrentPosition <= 21) {
  //     b = 1
  //   } else if (scorpianCurrentPosition > 22 && scorpianCurrentPosition <= 32) {
  //     b = 2
  //   } else if (scorpianCurrentPosition > 33 && scorpianCurrentPosition <= 43) {
  //     b = 3
  //   } else if (scorpianCurrentPosition > 44 && scorpianCurrentPosition <= 54) {
  //     b = 4
  //   } else if (scorpianCurrentPosition >= 55 && scorpianCurrentPosition <= 65) {
  //     b = 5
  //   } else if (scorpianCurrentPosition > 66 && scorpianCurrentPosition <= 76) {
  //     b = 6
  //   } else if (scorpianCurrentPosition > 77 && scorpianCurrentPosition <= 87) {
  //     b = 7
  //   } else if (scorpianCurrentPosition > 88 && scorpianCurrentPosition <= 98) {
  //     b = 8
  //   } else if (scorpianCurrentPosition > 99 && scorpianCurrentPosition <= 109) {
  //     b = 9
  //   }
  //   a = scorpianCurrentPosition % 11
  //   // console.log(a, b)
  // }

  // function setTarantulaCoordinates () {
  //   if (tarantulaCurrentPosition > 11 && tarantulaCurrentPosition <= 21) {
  //     c = 1
  //   } else if (tarantulaCurrentPosition > 22 && tarantulaCurrentPosition <= 32) {
  //     c = 2
  //   } else if (tarantulaCurrentPosition > 33 && tarantulaCurrentPosition <= 43) {
  //     c = 3
  //   } else if (tarantulaCurrentPosition > 44 && tarantulaCurrentPosition <= 54) {
  //     c = 4
  //   } else if (tarantulaCurrentPosition >= 55 && tarantulaCurrentPosition <= 65) {
  //     c = 5
  //   } else if (tarantulaCurrentPosition > 66 && tarantulaCurrentPosition <= 76) {
  //     c = 6
  //   } else if (tarantulaCurrentPosition > 77 && tarantulaCurrentPosition <= 87) {
  //     c = 7
  //   } else if (tarantulaCurrentPosition > 88 && tarantulaCurrentPosition <= 98) {
  //     c = 8
  //   } else if (tarantulaCurrentPosition > 99 && tarantulaCurrentPosition <= 109) {
  //     c = 9
  //   }
  //   d = tarantulaCurrentPosition % 11
  //   // console.log(c, d)
  // }

  // moves scorpian right
  function moveScorpianRight() {
    scorpianPreviousPosition = scorpianCurrentPosition
    scorpianCurrentPosition++ 
    // console.log('moving right')
  }

  // move scorpian left
  function moveScorpianLeft () {
    // console.log(scorpianCurrentPosition)
    scorpianPreviousPosition = scorpianCurrentPosition
    scorpianCurrentPosition--
    // console.log('moving left')
  }

  // moves scorpian up
  function moveScorpianUp () {
    scorpianPreviousPosition = scorpianCurrentPosition
    scorpianCurrentPosition -= width
    // console.log('moving up')
  }

  // moves scorpian down
  function moveScorpianDown () {
    scorpianPreviousPosition = scorpianCurrentPosition
    scorpianCurrentPosition += width
    // console.log('moving down')
  }

  // checks tile to right is clear
  function isRightClear (ghostCurrentPosition) {
    if (!cells[ghostCurrentPosition + 1].classList.contains(borderClass)) {
      // console.log('right clear')
      return true
    }
  }

  // checks tile to left is clear
  function isLeftClear (ghostCurrentPosition) {
    if (!cells[ghostCurrentPosition - 1].classList.contains(borderClass)) {
      // console.log('left clear')
      return true
    }
  }

  // check tile above is clear
  function isUpClear (ghostCurrentPosition) {
    if (!cells[ghostCurrentPosition - width].classList.contains(borderClass)) {
      // console.log('up clear')
      return true
    }
  }

  // check tile below is clear
  function isDownClear (ghostCurrentPosition) {
    if (!cells[ghostCurrentPosition + width].classList.contains(borderClass)) {
      // console.log('down clear')
      return true
    }
  }


  // move the scorpian intellegently
  function moveScorpian() {
    const down = scorpianCurrentPosition + width
    const left = scorpianCurrentPosition - 1
    const right = scorpianCurrentPosition + 1
    const up = scorpianCurrentPosition - width

    removeGhost(scorpianCurrentPosition, scorpianClass)

    // checks movement through tunnel
    if (scorpianCurrentPosition === 55 && x > a && scorpianPreviousPosition !== 65) {
      scorpianPreviousPosition = scorpianCurrentPosition
      scorpianCurrentPosition = 65
    } else if (scorpianCurrentPosition === 65 && x < a && scorpianPreviousPosition !== 55) {
      console.log(scorpianPreviousPosition)
      scorpianPreviousPosition = scorpianCurrentPosition
      scorpianCurrentPosition = 55
    } else if (y > b) {
      // console.log('ghost higher than player')      
      if (isDownClear(scorpianCurrentPosition) === true && down !== scorpianPreviousPosition) { // check tile below is clear, check previous position
        moveScorpianDown() // move down
      } else { // if below is blocked, do the following
        if (x > a) { // if ghost left of player
          // console.log('ghost left of player')
          if (isRightClear(scorpianCurrentPosition) === true && right !== scorpianPreviousPosition) { // check tile to right is clear
            moveScorpianRight() // move right
          } else { // if down and right is blocked
            // console.log('border to right')
            if (isLeftClear(scorpianCurrentPosition) === true && left !== scorpianPreviousPosition) { // check tile to left is clear
              moveScorpianLeft() // move left
            } else { // if down, right and left is blocked
              // console.log('border to left')
              if (isUpClear(scorpianCurrentPosition) === true) { // check tile above is clear
                moveScorpianUp() // move up
              } 
            }
          }
        } else if (x < a) { // if ghost is to right of player
          // console.log('ghost to right of player')
          if (isLeftClear(scorpianCurrentPosition) === true && left !== scorpianPreviousPosition) { // check tile to left is clear
            moveScorpianLeft() // move left
          } else { // if down and left is blocked
            // console.log('border to left') 
            if (isRightClear(scorpianCurrentPosition) === true && up !== scorpianPreviousPosition) { // check tile to right is clear
              moveScorpianRight() // move right
            } else { // if down, left and right is blocked
              // console.log('border below')
              if (isUpClear(scorpianCurrentPosition) === true) { // check tile above is clear
                moveScorpianUp() // move up
              }
            }
          }
        } else if (x === a) { // if player and ghost are in line on y-axis
          // console.log('ghost directly above player')
          if (isLeftClear(scorpianCurrentPosition) === true && left !== scorpianPreviousPosition) { // check if left tile is clear
            moveScorpianLeft() // move left
          } else if (isRightClear(scorpianCurrentPosition) === true && right !== scorpianPreviousPosition) { // if down and left are blocked, check if right tile is clear
            moveScorpianRight() // move right
          } else if (isUpClear(scorpianCurrentPosition) === true) { // if down, left and right are blocked, check if tile above is clear
            moveScorpianUp() // move up
          }
        }
      }
    } else if (y < b) { // if ghost is below player
      // console.log('ghost lower than player')
      if (isUpClear(scorpianCurrentPosition) === true && up !== scorpianPreviousPosition) { // check tile above is clear
        moveScorpianUp() // move ghost up 
      } else { // if above is blocked
        if (x > a) { // check if ghost is left of player
          // console.log('ghost left of player')
          if (isRightClear(scorpianCurrentPosition) === true && right !== scorpianPreviousPosition) { // check if tile to right is clear
            console.log(right)
            moveScorpianRight() // move ghost right
          } else if (isLeftClear(scorpianCurrentPosition) === true && left !== scorpianPreviousPosition) { // if above and right is blocked, check left is clear
            moveScorpianLeft() // move ghost left
          } else if (isDownClear(scorpianCurrentPosition) === true && down !== scorpianPreviousPosition) { // if above, right and left is blocked, check down is clear
            moveScorpianDown() // move ghost down
          }
        } else if (x < a) { // if ghost is right of player
          // console.log('ghost right of player')
          if (isLeftClear(scorpianCurrentPosition) === true && left !== scorpianPreviousPosition) { // check tile to left is clear
            moveScorpianLeft() // move ghost left
          } else if (isDownClear(scorpianCurrentPosition) === true && down !== scorpianPreviousPosition) { // if above and left is blocked, check if tile below is clear
            moveScorpianDown() // move ghost down
          } else if (isRightClear(scorpianCurrentPosition) === true && right !== scorpianPreviousPosition) { // if above, left and below is blocked, check right is clear
            moveScorpianRight() // move ghost right
          }
        } else if (x === a) { // if ghost and player are in line on the y-axis
          // console.log('ghost on same vertical plane as player')
          if (isLeftClear(scorpianCurrentPosition) === true && left !== scorpianPreviousPosition) { // check left tile is clear
            // console.log('move left')
            moveScorpianLeft() // move ghost left
          } else if (isRightClear(scorpianCurrentPosition) === true && right !== scorpianPreviousPosition) { // if above and left tile is blocked, check right is clear
            moveScorpianRight() // move ghost right
          } else if (isDownClear(scorpianCurrentPosition) === true && down !== scorpianPreviousPosition) { // if above, left and right tile is blocked, check below is clear 
            moveScorpianDown() // move ghost down
          }
        }
      }
    } else if (y === b) { // if ghost and player are in line on x-axis
      // console.log('ghost on same horizontal plane as player')
      if (x > a) { // if ghost to left of player
        // console.log('ghost left of player')
        if (isRightClear(scorpianCurrentPosition) === true && right !== scorpianPreviousPosition) { // check tile to right is clear
          moveScorpianRight() // move right
        }  else if (isLeftClear(scorpianCurrentPosition) === true && left !== scorpianPreviousPosition) { // if right is blocked, check tile to left is clear
          moveScorpianLeft() // move left
        } else if (isDownClear(scorpianCurrentPosition) === true && down !== scorpianPreviousPosition) { // if right and left blocked, check tile below is clear
          moveScorpianDown() // move down
        } else if (isUpClear(scorpianCurrentPosition) === true) { // if right, left and down blocked, check tile above is clear
          moveScorpianUp() // move up
        }
      } else if (x < a) { // if ghost to right of player
        // console.log('ghost right of player')
        if (isLeftClear(scorpianCurrentPosition) === true && left !== scorpianPreviousPosition) { // check left is clear
          moveScorpianLeft() // move left
        } else if (isDownClear(scorpianCurrentPosition) === true && down !== scorpianPreviousPosition) { // if left blocked, check down is clear
          // console.log('left not clear')
          moveScorpianDown() // move down
        } else if (isRightClear(scorpianCurrentPosition) === true && right !== scorpianPreviousPosition) { // if left and down blocked, check right is clear
          // console.log('down not clear')
          moveScorpianRight() // move right
        } else if (isUpClear(scorpianCurrentPosition) === true) { // if left, down and right blocked, check up is clear
          // console.log('right not clear, moving up')
          moveScorpianUp() // move up
        }
      }
    }  
  
    addGhost(scorpianCurrentPosition, scorpianClass)
    if (cells[scorpianCurrentPosition].classList.contains(playerClass)) {
      touchGhost(playerCurrentPosition)
      playerCurrentPosition = playerStartPosition
    }
    setCharacterCoordinates(scorpianClass, scorpianCurrentPosition, a, b)
  }

  // moves tarantula right
  function moveTarantulaRight() {
    tarantulaPreviousPosition = tarantulaCurrentPosition
    tarantulaCurrentPosition++ 
    // console.log('moving right')
  }
  
  // move scorpian left
  function moveTarantulaLeft () {
    // console.log(scorpianCurrentPosition)
    tarantulaPreviousPosition = tarantulaCurrentPosition
    tarantulaCurrentPosition--
    // console.log('moving left')
  }
  
  // moves scorpian up
  function moveTarantulaUp () {
    tarantulaPreviousPosition = tarantulaCurrentPosition
    tarantulaCurrentPosition -= width
    // console.log('moving up')
  }
  
  // moves scorpian down
  function moveTarantulaDown () {
    tarantulaPreviousPosition = tarantulaCurrentPosition
    tarantulaCurrentPosition += width
    // console.log('moving down')
  }

  // move the tarantula intellegently
  function moveTarantula() {
    console.log('x', x)
    console.log('y', y)

    const down = tarantulaCurrentPosition + width
    const left = tarantulaCurrentPosition - 1
    const right = tarantulaCurrentPosition + 1
    const up = tarantulaCurrentPosition - width
  
    removeGhost(tarantulaCurrentPosition, tarantulaClass)
  
    // checks movement through tunnel
    if (tarantulaCurrentPosition === 55 && x1 > a && tarantulaPreviousPosition !== 65) {
      tarantulaPreviousPosition = tarantulaCurrentPosition
      tarantulaCurrentPosition = 65
    } else if (tarantulaCurrentPosition === 65 && x1 < a && tarantulaPreviousPosition !== 55) {
      console.log(tarantulaPreviousPosition)
      tarantulaPreviousPosition = tarantulaCurrentPosition
      tarantulaCurrentPosition = 55
    } else if (y > d) {
      console.log('ghost higher than player')      
      if (isDownClear(tarantulaCurrentPosition) === true && down !== tarantulaPreviousPosition) { // check tile below is clear, check previous position
        moveTarantulaDown() // move down
      } else { // if below is blocked, do the following
        if (x1 > c) { // if ghost left of player
          console.log('ghost left of player')
          if (isRightClear(tarantulaCurrentPosition) === true && right !== tarantulaPreviousPosition) { // check tile to right is clear
            moveTarantulaRight() // move right
          } else { // if down and right is blocked
            console.log('border to right')
            if (isLeftClear(tarantulaCurrentPosition) === true && left !== tarantulaPreviousPosition) { // check tile to left is clear
              moveTarantulaLeft() // move left
            } else { // if down, right and left is blocked
              console.log('border to left')
              if (isUpClear(tarantulaCurrentPosition) === true) { // check tile above is clear
                moveTarantulaUp() // move up
              } 
            }
          }
        } else if (x1 < c) { // if ghost is to right of player
          console.log('ghost to right of player')
          if (isLeftClear(tarantulaCurrentPosition) === true && left !== tarantulaPreviousPosition) { // check tile to left is clear
            moveTarantulaLeft() // move left
          } else { // if down and left is blocked
            console.log('border to left') 
            if (isRightClear(tarantulaCurrentPosition) === true && up !== tarantulaPreviousPosition) { // check tile to right is clear
              moveTarantulaRight() // move right
            } else { // if down, left and right is blocked
              console.log('border below')
              if (isUpClear(tarantulaCurrentPosition) === true) { // check tile above is clear
                moveTarantulaUp() // move up 
              }
            }
          }
        } else if (x1 === c) { // if player and ghost are in line on y-axis
          console.log('ghost directly above player')
          if (isLeftClear(tarantulaCurrentPosition) === true && left !== tarantulaPreviousPosition) { // check if left tile is clear
            moveTarantulaLeft() // move left
          } else if (isRightClear(tarantulaCurrentPosition) === true && right !== tarantulaPreviousPosition) { // if down and left are blocked, check if right tile is clear
            moveTarantulaRight() // move right
          } else if (isUpClear(tarantulaCurrentPosition) === true) { // if down, left and right are blocked, check if tile above is clear
            moveTarantulaUp() // move up
          }
        }
      }
    } else if (y < d) { // if ghost is below player
      console.log('ghost lower than player')
      if (isUpClear(tarantulaCurrentPosition) === true && up !== tarantulaPreviousPosition) { // check tile above is clear
        moveTarantulaUp() // move ghost up 
      } else { // if above is blocked
        if (x1 > c) { // check if ghost is left of player
          console.log('ghost left of player')
          if (isRightClear(tarantulaCurrentPosition) === true && right !== tarantulaPreviousPosition) { // check if tile to right is clear
            // console.log(right)
            moveTarantulaRight() // move ghost right
          } else if (isLeftClear(tarantulaCurrentPosition) === true && left !== tarantulaPreviousPosition) { // if above and right is blocked, check left is clear
            moveTarantulaLeft() // move ghost left
          } else if (isDownClear(scorpianCurrentPosition) === true && down !== tarantulaPreviousPosition) { // if above, right and left is blocked, check down is clear
            moveTarantulaDown() // move ghost down
          }
        } else if (x1 < c) { // if ghost is right of player
          console.log('ghost right of player')
          if (isLeftClear(tarantulaCurrentPosition) === true && left !== tarantulaPreviousPosition) { // check tile to left is clear
            moveTarantulaLeft() // move ghost left
          } else if (isDownClear(tarantulaCurrentPosition) === true && down !== tarantulaPreviousPosition) { // if above and left is blocked, check if tile below is clear
            moveTarantulaDown() // move ghost down
          } else if (isRightClear(tarantulaCurrentPosition) === true && right !== tarantulaPreviousPosition) { // if above, left and below is blocked, check right is clear
            moveTarantulaRight() // move ghost right
          }
        } else if (x1 === c) { // if ghost and player are in line on the y-axis
          console.log('ghost on same vertical plane as player')
          if (isLeftClear(tarantulaCurrentPosition) === true && left !== tarantulaPreviousPosition) { // check left tile is clear
            console.log('move left')
            moveTarantulaLeft() // move ghost left
          } else if (isRightClear(tarantulaCurrentPosition) === true && right !== tarantulaPreviousPosition) { // if above and left tile is blocked, check right is clear
            moveTarantulaRight() // move ghost right
          } else if (isDownClear(tarantulaCurrentPosition) === true && down !== tarantulaPreviousPosition) { // if above, left and right tile is blocked, check below is clear 
            moveTarantulaDown() // move ghost down
          }
        }
      }
    } else if (y === d) { // if ghost and player are in line on x-axis
      console.log('ghost on same horizontal plane as player')
      if (x1 > c) { // if ghost to left of player
        console.log('ghost left of player')
        if (isRightClear(tarantulaCurrentPosition) === true && right !== tarantulaPreviousPosition) { // check tile to right is clear
          moveTarantulaRight() // move right
        }  else if (isLeftClear(tarantulaCurrentPosition) === true && left !== tarantulaPreviousPosition) { // if right is blocked, check tile to left is clear
          moveTarantulaLeft() // move left
        } else if (isDownClear(tarantulaCurrentPosition) === true && down !== tarantulaPreviousPosition) { // if right and left blocked, check tile below is clear
          moveTarantulaDown() // move down
        } else if (isUpClear(tarantulaCurrentPosition) === true) { // if right, left and down blocked, check tile above is clear
          moveTarantulaUp() // move up
        }
      } else if (x1 < c) { // if ghost to right of player
        console.log('ghost right of player')
        if (isLeftClear(tarantulaCurrentPosition) === true && left !== tarantulaPreviousPosition) { // check left is clear
          moveTarantulaLeft() // move left
        } else if (isDownClear(tarantulaCurrentPosition) === true && down !== tarantulaPreviousPosition) { // if left blocked, check down is clear
          console.log('left not clear')
          moveTarantulaDown() // move down
        } else if (isRightClear(tarantulaCurrentPosition) === true && right !== tarantulaPreviousPosition) { // if left and down blocked, check right is clear
          console.log('down not clear')
          moveTarantulaRight() // move right
        } else if (isUpClear(tarantulaCurrentPosition) === true) { // if left, down and right blocked, check up is clear
          console.log('right not clear, moving up')
          moveTarantulaUp() // move up
        }
      }
    }  
    
    addGhost(tarantulaCurrentPosition, tarantulaClass)
    if (cells[tarantulaCurrentPosition].classList.contains(playerClass)) {
      touchGhost(playerCurrentPosition)
      playerCurrentPosition = playerStartPosition
    }
    setCharacterCoordinates(tarantulaClass, tarantulaCurrentPosition, c, d)
  }

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
      // console.log('lives pre-fossil ->', lives)
      lives++
      // console.log('lives post fossil->', lives)
    }
  }

  // ! update life display:

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
  function touchGhost() {
    decreaseLives(lives)
    lives--
    resetAllCharacters()
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
      result.innerText = `Game Over! Your score: ${score}`
    }
  }

  // defines move
  let move 

  // ! start game
  function handleStart (event) {

    // removes start button
    event.target.classList.add(hiddenClass)
    reset.classList.remove(hiddenClass)
    gameStarted = true

    // starts player moving
    document.addEventListener('keydown', handleKeyDown)

    // calls move
    move = setInterval(() => {
      // console.log('ready to move')
      moveScorpian()
      moveTarantula()
    }, 500)
  }

  // reset game 
  function handleReset (event) {
    // console.log('reset')
    clearInterval(move)
    removePlayer(playerCurrentPosition)
    playerCurrentPosition = playerStartPosition
    resetAllCharacters()
    score = 0 
    updateScore(score)
    lives = 2
    grabLives[0].classList.remove(hiddenClass)
    grabLives[1].classList.remove(hiddenClass)
    event.target.classList.add(hiddenClass)
    start.classList.remove(hiddenClass)
    gameStarted = false

    for (let i = 0; i < cellCount; i ++) {
      if (i === 82) {
        cells[i].classList.add(fossilClass)
      } else if (!cells[i].classList.contains(borderClass) && !cells[i].classList.contains(fossilClass)) {
        cells[i].classList.add(foodClass)
      }
    }
    grabLives[2].classList.add(hiddenClass)
    result.classList.add('hidden')

  }

  // help
  function handleHelp () {
    displayHelp.classList.remove('hidden')
    if (pauseStatus === false && gameStarted === true) {
      clearInterval(move)
      pauseStatus = true
      start.classList.add(hiddenClass)
      reset.classList.remove(hiddenClass)
    }
  }

  // make the grid
  createGrid(playerStartPosition)

  // ! event listeners

  document.addEventListener('keydown', handleEscapeKey)
  start.addEventListener('click', handleStart)
  reset.addEventListener('click', handleReset)
  help.addEventListener('click', handleHelp)
  // document.addEventListener('click', handleSound)

}

window.addEventListener('DOMContentLoaded', init)
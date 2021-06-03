function init() {

  // ! variables
  const grid = document.querySelector('.grid')
  const start = document.querySelector('.start')
  const reset = document.querySelector('.reset')
  const help = document.querySelector('.help')
  const audio = document.querySelector('#audio')
  const backgroundAudio = document.querySelector('#background-audio')
  const sound = document.querySelector('.sound')
  const width = 11
  const cellCount = width * width
  const cells = []
  let pauseStatus = false
  let gameStarted = false
  let soundOn = true
  let randomIndex

  // player info
  const playerClass = 'player'
  const playerStartPosition = 82
  let playerCurrentPosition = 82

  // scorpian info
  const scorpianClass = 'scorpian'
  const scorpianStartPosition = 60
  let scorpianCurrentPosition = 60
  let scorpianPreviousPosition = 0
  let scorpianXGoal
  let scorpianYGoal
  
  // tarantula info
  const tarantulaClass = 'tarantula'
  const tarantulaStartPosition = 61
  let tarantulaCurrentPosition = 61
  let tarantulaPreviousPosition = 0
  let tarantulaXGoal
  let tarantulaYGoal

  //wasp info
  const waspClass = 'wasp'
  const waspStartPosition = 59
  let waspCurrentPosition = 59
  let waspPreviousPosition = 0
  let waspXGoal
  let waspYGoal

  // level
  const level = 'beginner'

  // border info
  const borderClass = 'border'
  const borderArray = [24, 25, 26, 28, 29, 30, 45, 47, 49, 51, 53, 58, 62, 67, 69, 70, 71, 72, 73, 75, 90, 91, 92, 94, 95, 96]

  // food info
  const foodClass = 'food'
  let score = 0
  const grabScore = document.querySelector('.score p')
  const highscore = localStorage.getItem('highscore')

  // fossil info
  const fossilClass = 'fossil'
  let lives = 2
  const grabLives = document.querySelectorAll('.life')

  // net info
  const netClass = 'net'
  const glowClass = 'glow'

  // fence info
  const fenceClass = 'fence'

  // hide classes
  const hiddenClass = 'hidden'

  // timer info
  let counterTimer
  let count = 0

  let hideTimer
  let hideCount = 0

  // player coordinates
  let x = 5
  let y = 7

  // scorpian coordinates
  let a = 5
  let b = 5

  // tarantula coordinates
  let c = 5
  let d = 4

  // tarantula goal coordinates
  let x1 = 2

  // wasp coordinates
  let e = 5
  let f = 3

  // wasp goal coordinates 
  let x2 = 1

  // results
  const result = document.querySelector('.display-result')

  // help
  const displayHelp = document.querySelector('.display-help')

  // ghost modes
  let ghostMode = ''

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
        } else if (i === 27) {
          cell.classList.add(fossilClass)
        } else if (i === 20 || i === 100) {
          cell.classList.add(netClass)
        } else if (i === 48 || i === 50) {
          cell.classList.add(fenceClass)
        } else if (!cell.classList.contains(borderClass) && !cell.classList.contains(fossilClass) && !cell.classList.contains(netClass) & !cell.classList.contains(fenceClass) && i !== 59 & i !== 60 & i !== 61) {
          cell.classList.add(foodClass)
        }

        grabLives[2].classList.add(hiddenClass)
      }
    }

    addPlayer(playerStartPosition)
    console.log('player added at start')
    addGhost(scorpianStartPosition, scorpianClass)
    addGhost(tarantulaStartPosition, tarantulaClass)
    addGhost(waspStartPosition, waspClass)
  }

  function handleEscapeKey(event) {
    const key = event.keyCode
    if (key === 27) {
      displayHelp.classList.add(hiddenClass)
      if (pauseStatus === true && gameStarted === true) {
        move = setInterval(() => {
          moveScorpian()
          moveTarantula()
          moveWasp()
          // moveGhost(scorpianClass, scorpianCurrentPosition, scorpianPreviousPosition, x, y, a, b)
        }, 500)
        if (soundOn === true) {
          backgroundAudio.play()
        }
        pauseStatus = false
        console.log('pause status on escape', pauseStatus)
      }
    }
  }  

  // add the player 
  function addPlayer(position) {
    // console.log('player added')
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
    console.log('reset')
    removePlayer(playerCurrentPosition)
    removeGhost(scorpianCurrentPosition, scorpianClass)
    removeGhost(tarantulaCurrentPosition, tarantulaClass)
    removeGhost(waspCurrentPosition, waspClass)
    playerCurrentPosition = playerStartPosition
    console.log('player current pos ->', playerCurrentPosition)
    scorpianCurrentPosition = scorpianStartPosition
    console.log('scorpian current pos ->', scorpianCurrentPosition)
    tarantulaCurrentPosition = tarantulaStartPosition
    console.log('tarantula current pos ->', tarantulaCurrentPosition)
    waspCurrentPosition = waspStartPosition
    console.log('wasp current pos ->', waspCurrentPosition)
    scorpianPreviousPosition = 0
    tarantulaPreviousPosition = 0
    waspPreviousPosition = 0
    addPlayer(playerCurrentPosition)
    // console.log('player added all characters reset')
    addGhost(scorpianCurrentPosition, scorpianClass)
    addGhost(tarantulaCurrentPosition, tarantulaClass)
    addGhost(waspCurrentPosition, waspClass)
    ghostMode = 'split mode'
    count = 0
    startTimer()
  }

  function resetGhost(ghostClass, ghostCurrentPosition, ghostStartPosition) {
    removeGhost(ghostCurrentPosition, ghostClass)
    ghostCurrentPosition = ghostStartPosition

    if (ghostClass === scorpianClass) {
      scorpianCurrentPosition = ghostCurrentPosition
    } else if (ghostClass === tarantulaClass) {
      tarantulaCurrentPosition = ghostCurrentPosition
    } else if (ghostClass === waspClass) {
      waspCurrentPosition = ghostCurrentPosition
    }

    addGhost(ghostCurrentPosition, ghostClass)
  }

  // eat fruit/fossil
  function handleInteraction(playerCurrentPosition) {
    eatFruit(playerCurrentPosition)
    getFossil(playerCurrentPosition)
    getNet(playerCurrentPosition)
  }

  // key events
  function handleKeyDown(event) {
    const key = event.keyCode
    // pauses game
    if (key === 80) { 
      if (pauseStatus === false) {
        clearInterval(move)
        backgroundAudio.pause()
        pauseStatus = true
      } else {
        move = setInterval(() => {
          moveScorpian()
          // moveGhost(scorpianClass, scorpianCurrentPosition, scorpianPreviousPosition, x, y, a, b)
          moveTarantula()
          moveWasp()
        }, 500)
        if (soundOn === true) {
          backgroundAudio.play()
        }
        pauseStatus = false
      }
      console.log('pause status on pause', pauseStatus)
    } 

    removePlayer(playerCurrentPosition)

    // prevents scrolling
    if (key === 38 || key === 40) {
      event.preventDefault()
    }
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
    } else if (key === 40 && !cells[playerCurrentPosition + width].classList.contains(borderClass) && !cells[playerCurrentPosition + width].classList.contains(fenceClass)) { // down
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
    if (cells[playerCurrentPosition].classList.contains(scorpianClass) || cells[playerCurrentPosition].classList.contains(tarantulaClass) || cells[playerCurrentPosition].classList.contains(waspClass)) {
      touchGhost(playerCurrentPosition)
      // playerCurrentPosition = playerStartPosition
    } 
    setCharacterCoordinates(playerClass, playerCurrentPosition, x, y)
  }

  // set coordiates
  function setCharacterCoordinates (characterClass, characterPosition, xAxis, yAxis) {

    // sets y co-ordinate
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
    // sets x-coordinate
    xAxis = characterPosition % 11

    // checks player and sets coordinate to correct variable
    if (characterClass === playerClass) {
      x = xAxis
      y = yAxis
      x1 = xAxis + 1
      x2 = xAxis - 1
    } else if (characterClass === scorpianClass) {
      a = xAxis
      b = yAxis
    } else if (characterClass === tarantulaClass) {
      c = xAxis
      d = yAxis
    } else if (characterClass === waspClass) {
      e = xAxis
      f = yAxis
    }
  }
  
  // moves ghosts
  function moveCharacter (direction, characterClass, characterPreviousPosition, characterCurrentPosition) {
    if (direction === 'right') {
      characterPreviousPosition = characterCurrentPosition
      characterCurrentPosition++
    } else if (direction === 'left') {
      characterPreviousPosition = characterCurrentPosition
      characterCurrentPosition--
    } else if (direction === 'up') {
      characterPreviousPosition = characterCurrentPosition 
      characterCurrentPosition -= width
    } else if (direction === 'down') {
      characterPreviousPosition = characterCurrentPosition 
      characterCurrentPosition += width
    }
    
    if (characterClass === scorpianClass) {
      scorpianCurrentPosition = characterCurrentPosition
      scorpianPreviousPosition = characterPreviousPosition
    } else if (characterClass === tarantulaClass) {
      tarantulaCurrentPosition = characterCurrentPosition
      tarantulaPreviousPosition = characterPreviousPosition
    } else if (characterClass === waspClass) {
      waspCurrentPosition = characterCurrentPosition
      waspPreviousPosition = characterPreviousPosition
    }
  }

  // checks tile to right is clear
  function isRightClear (ghostCurrentPosition) {
    if (!cells[ghostCurrentPosition + 1].classList.contains(borderClass) && (!cells[ghostCurrentPosition + 1].classList.contains(tarantulaClass) || !cells[ghostCurrentPosition].classList.contains(scorpianClass) || !cells[ghostCurrentPosition].classList.contains(waspClass))) {
      // console.log('right clear')
      return true
    }
  }

  // checks tile to left is clear
  function isLeftClear (ghostCurrentPosition) {
    if (!cells[ghostCurrentPosition - 1].classList.contains(borderClass) && (!cells[ghostCurrentPosition - 1].classList.contains(tarantulaClass) || !cells[ghostCurrentPosition].classList.contains(scorpianClass) || !cells[ghostCurrentPosition].classList.contains(waspClass))) {
      // console.log('left clear')
      return true
    }
  }

  // check tile above is clear
  function isUpClear (ghostCurrentPosition) {
    if (!cells[ghostCurrentPosition - width].classList.contains(borderClass) && (!cells[ghostCurrentPosition - width].classList.contains(tarantulaClass) || !cells[ghostCurrentPosition].classList.contains(scorpianClass) || !cells[ghostCurrentPosition].classList.contains(waspClass))) {
      // console.log('up clear')
      return true
    }
  }

  // check tile below is clear
  function isDownClear (ghostCurrentPosition) {
    if (!cells[ghostCurrentPosition + width].classList.contains(borderClass) && (!cells[ghostCurrentPosition + width].classList.contains(tarantulaClass) || !cells[ghostCurrentPosition].classList.contains(scorpianClass) || !cells[ghostCurrentPosition].classList.contains(waspClass))) {
      // console.log('down clear')
      return true
    }
  }

  // ! move the scorpian intellegently
  function moveScorpian() {
    const down = scorpianCurrentPosition + width
    const left = scorpianCurrentPosition - 1
    const right = scorpianCurrentPosition + 1
    const up = scorpianCurrentPosition - width

    checkGhostMode(scorpianClass, scorpianCurrentPosition)
    removeGhost(scorpianCurrentPosition, scorpianClass)

    if (!cells[scorpianCurrentPosition].classList.contains(waspClass)) {
      // checks movement through tunnel
      if (scorpianCurrentPosition === 55 && scorpianXGoal > a && scorpianPreviousPosition !== 65) {
        scorpianPreviousPosition = scorpianCurrentPosition
        scorpianCurrentPosition = 65
      } else if (scorpianCurrentPosition === 65 && scorpianXGoal < a && scorpianPreviousPosition !== 55) {
        scorpianPreviousPosition = scorpianCurrentPosition
        scorpianCurrentPosition = 55
      } else if (scorpianYGoal > b) {
      // console.log('ghost higher than player')      
        if (isDownClear(scorpianCurrentPosition) === true && down !== scorpianPreviousPosition) { // check tile below is clear, check previous position
          moveCharacter('down', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition) // move down
        } else { // if below is blocked, do the following
          if (scorpianXGoal > a) { // if ghost left of player
          // console.log('ghost left of player')
            if (isRightClear(scorpianCurrentPosition) === true && right !== scorpianPreviousPosition) { // check tile to right is clear
              moveCharacter('right', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition) // move right
            } else { // if down and right is blocked
            // console.log('border to right')
              if (isLeftClear(scorpianCurrentPosition) === true && left !== scorpianPreviousPosition) { // check tile to left is clear
                moveCharacter('left', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition) // move left
              } else { // if down, right and left is blocked
              // console.log('border to left')
                if (isUpClear(scorpianCurrentPosition) === true) { // check tile above is clear
                  moveCharacter('up', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition) // move up
                } 
              }
            }
          } else if (scorpianXGoal < a) { // if ghost is to right of player
          // console.log('ghost to right of player')
            if (isLeftClear(scorpianCurrentPosition) === true && left !== scorpianPreviousPosition) { // check tile to left is clear
              moveCharacter('left', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition) // move left
            } else { // if down and left is blocked
            // console.log('border to left') 
              if (isRightClear(scorpianCurrentPosition) === true && right !== scorpianPreviousPosition) { // check tile to right is clear
                moveCharacter('right', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition) // move right
              } else { // if down, left and right is blocked
              // console.log('border below')
                if (isUpClear(scorpianCurrentPosition) === true) { // check tile above is clear
                  moveCharacter('up', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition) // move up
                }
              }
            }
          } else if (scorpianXGoal === a) { // if player and ghost are in line on y-axis
          // console.log('ghost directly above player')
            if (isLeftClear(scorpianCurrentPosition) === true && left !== scorpianPreviousPosition) { // check if left tile is clear
              moveCharacter('left', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition) // move left
            } else if (isRightClear(scorpianCurrentPosition) === true && right !== scorpianPreviousPosition) { // if down and left are blocked, check if right tile is clear
              moveCharacter('right', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition) // move right
            } else if (isUpClear(scorpianCurrentPosition) === true) { // if down, left and right are blocked, check if tile above is clear
              moveCharacter('up', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition) // move up
            }
          }
        }
      } else if (scorpianYGoal < b) { // if ghost is below player
      // console.log('ghost lower than player')
        if (isUpClear(scorpianCurrentPosition) === true && up !== scorpianPreviousPosition) { // check tile above is clear
          moveCharacter('up', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition) // move ghost up 
        } else { // if above is blocked
          if (scorpianXGoal > a) { // check if ghost is left of player
          // console.log('ghost left of player')
            if (isRightClear(scorpianCurrentPosition) === true && right !== scorpianPreviousPosition) { // check if tile to right is clear
            // console.log(right)
              moveCharacter('right', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition) // move ghost right
            } else if (isLeftClear(scorpianCurrentPosition) === true && left !== scorpianPreviousPosition) { // if above and right is blocked, check left is clear
              moveCharacter('left', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition) // move ghost left
            } else if (isDownClear(scorpianCurrentPosition) === true) { // if above, right and left is blocked, check down is clear
              moveCharacter('down', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition) // move ghost down
            } else if (isUpClear(scorpianCurrentPosition) === true) {
              moveCharacter('up', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition)
            }
          } else if (scorpianXGoal < a) { // if ghost is right of player
          // console.log('ghost right of player')
            if (isLeftClear(scorpianCurrentPosition) === true && left !== scorpianPreviousPosition) { // check tile to left is clear
              moveCharacter('left', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition) // move ghost left
            } else if (isDownClear(scorpianCurrentPosition) === true && down !== scorpianPreviousPosition) { // if above and left is blocked, check if tile below is clear
              moveCharacter('down', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition) // move ghost down
            } else if (isRightClear(scorpianCurrentPosition) === true) { // if above, left and below is blocked, check right is clear
              moveCharacter('right', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition) // move ghost right
            } else if (isUpClear(scorpianCurrentPosition) === true) {
              moveCharacter('up', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition)
            }
          } else if (scorpianXGoal === a) { // if ghost and player are in line on the y-axis
          // console.log('ghost on same vertical plane as player')
            if (isLeftClear(scorpianCurrentPosition) === true && left !== scorpianPreviousPosition) { // check left tile is clear
            // console.log('move left')
              moveCharacter('left', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition) // move ghost left
            } else if (isRightClear(scorpianCurrentPosition) === true && right !== scorpianPreviousPosition) { // if above and left tile is blocked, check right is clear
              moveCharacter('right', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition) // move ghost right
            } else if (isDownClear(scorpianCurrentPosition) === true && down !== scorpianPreviousPosition) { // if above, left and right tile is blocked, check below is clear 
              moveCharacter('down', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition) // move ghost down
            } else if (isUpClear(scorpianCurrentPosition) === true) {
              moveCharacter('up', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition)
            }
          }
        }
      } else if (scorpianYGoal === b) { // if ghost and player are in line on x-axis
      // console.log('ghost on same horizontal plane as player')
        if (scorpianXGoal > a) { // if ghost to left of player
        // console.log('ghost left of player')
          if (isRightClear(scorpianCurrentPosition) === true && right !== scorpianPreviousPosition) { // check tile to right is clear
            moveCharacter('right', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition) // move right
          }  else if (isLeftClear(scorpianCurrentPosition) === true && left !== scorpianPreviousPosition) { // if right is blocked, check tile to left is clear
            moveCharacter('left', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition) // move left
          } else if (isDownClear(scorpianCurrentPosition) === true && down !== scorpianPreviousPosition) { // if right and left blocked, check tile below is clear
            moveCharacter('down', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition) // move down
          } else if (isUpClear(scorpianCurrentPosition) === true) { // if right, left and down blocked, check tile above is clear
            moveCharacter('up', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition) // move up
          }
        } else if (scorpianXGoal < a) { // if ghost to right of player
        // console.log('ghost right of player')
          if (isLeftClear(scorpianCurrentPosition) === true && left !== scorpianPreviousPosition) { // check left is clear
            moveCharacter('left', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition) // move left
          } else if (isDownClear(scorpianCurrentPosition) === true && down !== scorpianPreviousPosition) { // if left blocked, check down is clear
          // console.log('left not clear')
            moveCharacter('down', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition) // move down
          } else if (isRightClear(scorpianCurrentPosition) === true && right !== scorpianPreviousPosition) { // if left and down blocked, check right is clear
          // console.log('down not clear')
            moveCharacter('right', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition) // move right
          } else if (isUpClear(scorpianCurrentPosition) === true) { // if left, down and right blocked, check up is clear
          // console.log('right not clear, moving up')
            moveCharacter('up', scorpianClass, scorpianPreviousPosition, scorpianCurrentPosition) // move up
          }
        }
      }  
    }
  
    addGhost(scorpianCurrentPosition, scorpianClass)
    if (cells[scorpianCurrentPosition].classList.contains(playerClass)) {
      touchGhost(playerCurrentPosition)
      if (ghostMode === 'split class' || ghostMode === 'chase class') {
        playerCurrentPosition = playerStartPosition
      }
    }
    setCharacterCoordinates(scorpianClass, scorpianCurrentPosition, a, b)
  }

  // ! move the tarantula intellegently
  function moveTarantula() {
    const down = tarantulaCurrentPosition + width
    const left = tarantulaCurrentPosition - 1
    const right = tarantulaCurrentPosition + 1
    const up = tarantulaCurrentPosition - width
  
    checkGhostMode(tarantulaClass, tarantulaCurrentPosition)
    removeGhost(tarantulaCurrentPosition, tarantulaClass)
  
    if (!cells[tarantulaCurrentPosition].classList.contains(scorpianClass)) {
    // checks movement through tunnel
      if (tarantulaCurrentPosition === 55 && tarantulaXGoal > c && tarantulaPreviousPosition !== 65) {
        tarantulaPreviousPosition = tarantulaCurrentPosition
        tarantulaCurrentPosition = 65
      } else if (tarantulaCurrentPosition === 65 && tarantulaXGoal < c && tarantulaPreviousPosition !== 55) {
        tarantulaPreviousPosition = tarantulaCurrentPosition
        tarantulaCurrentPosition = 55
      } else if (tarantulaYGoal > d) {
      // console.log('ghost higher than player')      
        if (isDownClear(tarantulaCurrentPosition) === true && down !== tarantulaPreviousPosition) { // check tile below is clear, check previous position
          moveCharacter('down', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move down
        } else { // if below is blocked, do the following
          if (tarantulaXGoal > c) { // if ghost left of player
          // console.log('ghost left of player')
            if (isRightClear(tarantulaCurrentPosition) === true && right !== tarantulaPreviousPosition) { // check tile to right is clear
              moveCharacter('right', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move right
            } else { // if down and right is blocked
            // console.log('border to right')
              if (isLeftClear(tarantulaCurrentPosition) === true && left !== tarantulaPreviousPosition) { // check tile to left is clear
                moveCharacter('left', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move left
              } else { // if down, right and left is blocked
              // console.log('border to left')
                if (isUpClear(tarantulaCurrentPosition) === true) { // check tile above is clear
                  moveCharacter('up', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move up
                } 
              }
            }
          } else if (tarantulaXGoal < c) { // if ghost is to right of player
          // console.log('ghost to right of player')
            if (isLeftClear(tarantulaCurrentPosition) === true && left !== tarantulaPreviousPosition) { // check tile to left is clear
              moveCharacter('left', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move left
            } else { // if down and left is blocked
            // console.log('border to left') 
              if (isRightClear(tarantulaCurrentPosition) === true && up !== tarantulaPreviousPosition) { // check tile to right is clear
                moveCharacter('right', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move right
              } else { // if down, left and right is blocked
              // console.log('border below')
                if (isUpClear(tarantulaCurrentPosition) === true) { // check tile above is clear
                  moveCharacter('up', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move up 
                }
              }
            }
          } else if (tarantulaXGoal === c) { // if player and ghost are in line on y-axis
          // console.log('ghost directly above player')
            if (isLeftClear(tarantulaCurrentPosition) === true && left !== tarantulaPreviousPosition) { // check if left tile is clear
              moveCharacter('left', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move left
            } else if (isRightClear(tarantulaCurrentPosition) === true && right !== tarantulaPreviousPosition) { // if down and left are blocked, check if right tile is clear
              moveCharacter('right', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move right
            } else if (isUpClear(tarantulaCurrentPosition) === true) { // if down, left and right are blocked, check if tile above is clear
              moveCharacter('up', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move up
            }
          }
        }
      } else if (tarantulaYGoal < d) { // if ghost is below player
      // console.log('ghost lower than player')
        if (isUpClear(tarantulaCurrentPosition) === true && up !== tarantulaPreviousPosition) { // check tile above is clear
          console.log('moving up')
          moveCharacter('up', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move ghost up 
        } else { // if above is blocked
          if (tarantulaXGoal > c) { // check if ghost is left of player
          // console.log('ghost left of player')
            if (isRightClear(tarantulaCurrentPosition) === true && right !== tarantulaPreviousPosition) { // check if tile to right is clear
            // console.log(right)
              moveCharacter('right', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move ghost right
            } else if (isLeftClear(tarantulaCurrentPosition) === true && left !== tarantulaPreviousPosition) { // if above and right is blocked, check left is clear
              moveCharacter('left', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move ghost left
            } else if (isDownClear(tarantulaCurrentPosition) === true && down !== tarantulaPreviousPosition) { // if above, right and left is blocked, check down is clear
              moveCharacter('down', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move ghost down
            } else if (isUpClear(tarantulaCurrentPosition) === true) { // check tile above is clear
              moveCharacter('up', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move up
            } 
          } else if (tarantulaXGoal < c) { // if ghost is right of player
          // console.log('ghost right of player')
            if (isLeftClear(tarantulaCurrentPosition) === true && left !== tarantulaPreviousPosition) { // check tile to left is clear
              moveCharacter('left', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move ghost left
            } else if (isDownClear(tarantulaCurrentPosition) === true && down !== tarantulaPreviousPosition) { // if above and left is blocked, check if tile below is clear
              moveCharacter('down', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move ghost down
            } else if (isRightClear(tarantulaCurrentPosition) === true && right !== tarantulaPreviousPosition) { // if above, left and below is blocked, check right is clear
              moveCharacter('right', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move ghost right
            } else if (isUpClear(tarantulaCurrentPosition) === true) { // check tile above is clear
              moveCharacter('up', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move up
            } 
          } else if (tarantulaXGoal === c) { // if ghost and player are in line on the y-axis
          // console.log('ghost on same vertical plane as player')
            if (isLeftClear(tarantulaCurrentPosition) === true && left !== tarantulaPreviousPosition) { // check left tile is clear
            // console.log('move left')
              moveCharacter('left', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move ghost left
            } else if (isRightClear(tarantulaCurrentPosition) === true && right !== tarantulaPreviousPosition) { // if above and left tile is blocked, check right is clear
              moveCharacter('right', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move ghost right
            } else if (isDownClear(tarantulaCurrentPosition) === true && down !== tarantulaPreviousPosition) { // if above, left and right tile is blocked, check below is clear 
              moveCharacter('down', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move ghost down
            } else if (isUpClear(tarantulaCurrentPosition) === true) { // check tile above is clear
              moveCharacter('up', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move up
            } 
          }
        }
      } else if (tarantulaYGoal === d) { // if ghost and player are in line on x-axis
      // console.log('ghost on same horizontal plane as player')
        if (tarantulaXGoal > c) { // if ghost to left of player
        // console.log('ghost left of player')
          if (isRightClear(tarantulaCurrentPosition) === true && right !== tarantulaPreviousPosition) { // check tile to right is clear
            moveCharacter('right', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move right
          }  else if (isLeftClear(tarantulaCurrentPosition) === true && left !== tarantulaPreviousPosition) { // if right is blocked, check tile to left is clear
            moveCharacter('left', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move left
          } else if (isDownClear(tarantulaCurrentPosition) === true && down !== tarantulaPreviousPosition) { // if right and left blocked, check tile below is clear
            moveCharacter('down', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move down
          } else if (isUpClear(tarantulaCurrentPosition) === true) { // if right, left and down blocked, check tile above is clear
            moveCharacter('up', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move up
          }
        } else if (tarantulaXGoal < c) { // if ghost to right of player
        // console.log('ghost right of player')
          if (isLeftClear(tarantulaCurrentPosition) === true && left !== tarantulaPreviousPosition) { // check left is clear
            moveCharacter('left', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move left
          } else if (isDownClear(tarantulaCurrentPosition) === true && down !== tarantulaPreviousPosition) { // if left blocked, check down is clear
          // console.log('left not clear')
            moveCharacter('down', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move down
          } else if (isRightClear(tarantulaCurrentPosition) === true && right !== tarantulaPreviousPosition) { // if left and down blocked, check right is clear
          // console.log('down not clear')
            moveCharacter('right', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move right
          } else if (isUpClear(tarantulaCurrentPosition) === true) { // if left, down and right blocked, check up is clear
          // console.log('right not clear, moving up')
            moveCharacter('up', tarantulaClass, tarantulaPreviousPosition, tarantulaCurrentPosition) // move up
          }
        }
      } 
    }
    
    addGhost(tarantulaCurrentPosition, tarantulaClass)
    if (cells[tarantulaCurrentPosition].classList.contains(playerClass)) {
      touchGhost(playerCurrentPosition)
      if (ghostMode === 'split class' || ghostMode === 'chase class') {
        playerCurrentPosition = playerStartPosition
      }
    }
    setCharacterCoordinates(tarantulaClass, tarantulaCurrentPosition, c, d)
  }

  // ! move the wasp intelligently
  function moveWasp() {
    const down = waspCurrentPosition + width
    const left = waspCurrentPosition - 1
    const right = waspCurrentPosition + 1
    const up = waspCurrentPosition - width

    checkGhostMode(waspClass, waspCurrentPosition)
    removeGhost(waspCurrentPosition, waspClass)

    // checks movement through tunnel
    if (waspCurrentPosition === 55 && waspXGoal > e && waspPreviousPosition !== 65) {
      waspPreviousPosition = waspCurrentPosition
      waspCurrentPosition = 65
    } else if (waspCurrentPosition === 65 && waspXGoal < e && waspPreviousPosition !== 55) {
      waspPreviousPosition = waspCurrentPosition
      waspCurrentPosition = 55
    } else if (waspYGoal > f) {
      // console.log('ghost higher than player')      
      if (isDownClear(waspCurrentPosition) === true && down !== waspPreviousPosition) { // check tile below is clear, check previous position
        moveCharacter('down', waspClass, waspPreviousPosition, waspCurrentPosition) // move down
      } else { // if below is blocked, do the following
        if (waspXGoal > e) { // if ghost left of player
          // console.log('ghost left of player')
          if (isRightClear(waspCurrentPosition) === true && right !== waspPreviousPosition) { // check tile to right is clear
            moveCharacter('right', waspClass, waspPreviousPosition, waspCurrentPosition) // move right
          } else { // if down and right is blocked
            // console.log('border to right')
            if (isLeftClear(waspCurrentPosition) === true && left !== waspPreviousPosition) { // check tile to left is clear
              moveCharacter('left', waspClass, waspPreviousPosition, waspCurrentPosition) // move left
            } else { // if down, right and left is blocked
              // console.log('border to left')
              if (isUpClear(waspCurrentPosition) === true) { // check tile above is clear
                moveCharacter('up', waspClass, waspPreviousPosition, waspCurrentPosition) // move up
              } 
            }
          }
        } else if (waspXGoal < e) { // if ghost is to right of player
          // console.log('ghost to right of player')
          if (isLeftClear(waspCurrentPosition) === true && left !== waspPreviousPosition) { // check tile to left is clear
            moveCharacter('left', waspClass, waspPreviousPosition, waspCurrentPosition) // move left
          } else { // if down and left is blocked
            // console.log('border to left') 
            if (isRightClear(waspCurrentPosition) === true && right !== waspPreviousPosition) { // check tile to right is clear
              moveCharacter('right', waspClass, waspPreviousPosition, waspCurrentPosition) // move right
            } else { // if down, left and right is blocked
              // console.log('border below')
              if (isUpClear(waspCurrentPosition) === true) { // check tile above is clear
                moveCharacter('up', waspClass, waspPreviousPosition, waspCurrentPosition) // move up
              }
            }
          }
        } else if (waspXGoal === e) { // if player and ghost are in line on y-axis
          // console.log('ghost directly above player')
          if (isLeftClear(waspCurrentPosition) === true && left !== waspPreviousPosition) { // check if left tile is clear
            moveCharacter('left', waspClass, waspPreviousPosition, waspCurrentPosition) // move left
          } else if (isRightClear(waspCurrentPosition) === true && right !== waspPreviousPosition) { // if down and left are blocked, check if right tile is clear
            moveCharacter('right', waspClass, waspPreviousPosition, waspCurrentPosition) // move right
          } else if (isUpClear(waspCurrentPosition) === true) { // if down, left and right are blocked, check if tile above is clear
            moveCharacter('up', waspClass, waspPreviousPosition, waspCurrentPosition) // move up
          }
        }
      }
    } else if (waspYGoal < f) { // if ghost is below player
      // console.log('ghost lower than player')
      if (isUpClear(waspCurrentPosition) === true && up !== waspPreviousPosition) { // check tile above is clear
        moveCharacter('up', waspClass, waspPreviousPosition, waspCurrentPosition) // move ghost up 
      } else { // if above is blocked
        if (waspXGoal > e) { // check if ghost is left of player
          // console.log('ghost left of player')
          if (isRightClear(waspCurrentPosition) === true && right !== waspPreviousPosition) { // check if tile to right is clear
            // console.log(right)
            moveCharacter('right', waspClass, waspPreviousPosition, waspCurrentPosition) // move ghost right
          } else if (isLeftClear(waspCurrentPosition) === true && left !== waspPreviousPosition) { // if above and right is blocked, check left is clear
            moveCharacter('left', waspClass, waspPreviousPosition, waspCurrentPosition) // move ghost left
          } else if (isDownClear(waspCurrentPosition) === true) { // if above, right and left is blocked, check down is clear
            moveCharacter('down', waspClass, waspPreviousPosition, waspCurrentPosition) // move ghost down
          } else if (isUpClear(waspCurrentPosition) === true) {
            moveCharacter('up', waspClass, waspPreviousPosition, waspCurrentPosition)
          }
        } else if (waspXGoal < e) { // if ghost is right of player
          // console.log('ghost right of player')
          if (isLeftClear(waspCurrentPosition) === true && left !== waspPreviousPosition) { // check tile to left is clear
            moveCharacter('left', waspClass, waspPreviousPosition, waspCurrentPosition) // move ghost left
          } else if (isDownClear(waspCurrentPosition) === true && down !== waspPreviousPosition) { // if above and left is blocked, check if tile below is clear
            moveCharacter('down', waspClass, waspPreviousPosition, waspCurrentPosition) // move ghost down
          } else if (isRightClear(waspCurrentPosition) === true) { // if above, left and below is blocked, check right is clear
            moveCharacter('right', waspClass, waspPreviousPosition, waspCurrentPosition) // move ghost right
          } else if (isUpClear(waspCurrentPosition) === true) {
            moveCharacter('up', waspClass, waspPreviousPosition, waspCurrentPosition)
          }
        } else if (waspXGoal === e) { // if ghost and player are in line on the y-axis
          // console.log('ghost on same vertical plane as player')
          if (isLeftClear(waspCurrentPosition) === true && left !== waspPreviousPosition) { // check left tile is clear
            // console.log('move left')
            moveCharacter('left', waspClass, waspPreviousPosition, waspCurrentPosition) // move ghost left
          } else if (isRightClear(waspCurrentPosition) === true && right !== scorpianPreviousPosition) { // if above and left tile is blocked, check right is clear
            moveCharacter('right', waspClass, waspPreviousPosition, waspCurrentPosition) // move ghost right
          } else if (isDownClear(waspCurrentPosition) === true && down !== waspPreviousPosition) { // if above, left and right tile is blocked, check below is clear 
            moveCharacter('down', waspClass, waspPreviousPosition, waspCurrentPosition) // move ghost down
          } else if (isUpClear(waspCurrentPosition) === true) {
            moveCharacter('up', waspClass, waspPreviousPosition, waspCurrentPosition)
          }
        }
      }
    } else if (waspYGoal === f) { // if ghost and player are in line on x-axis
      // console.log('ghost on same horizontal plane as player')
      if (waspXGoal > e) { // if ghost to left of player
        // console.log('ghost left of player')
        if (isRightClear(waspCurrentPosition) === true && right !== waspPreviousPosition) { // check tile to right is clear
          moveCharacter('right', waspClass, waspPreviousPosition, waspCurrentPosition) // move right
        }  else if (isLeftClear(waspCurrentPosition) === true && left !== waspPreviousPosition) { // if right is blocked, check tile to left is clear
          moveCharacter('left', waspClass, waspPreviousPosition, waspCurrentPosition) // move left
        } else if (isDownClear(waspCurrentPosition) === true && down !== waspPreviousPosition) { // if right and left blocked, check tile below is clear
          moveCharacter('down', waspClass, waspPreviousPosition, waspCurrentPosition) // move down
        } else if (isUpClear(waspCurrentPosition) === true) { // if right, left and down blocked, check tile above is clear
          moveCharacter('up', waspClass, waspPreviousPosition, waspCurrentPosition) // move up
        }
      } else if (waspXGoal < e) { // if ghost to right of player
        // console.log('ghost right of player')
        if (isLeftClear(waspCurrentPosition) === true && left !== waspPreviousPosition) { // check left is clear
          moveCharacter('left', waspClass, waspPreviousPosition, waspCurrentPosition) // move left
        } else if (isDownClear(waspCurrentPosition) === true && down !== waspPreviousPosition) { // if left blocked, check down is clear
          // console.log('left not clear')
          moveCharacter('down', waspClass, waspPreviousPosition, waspCurrentPosition) // move down
        } else if (isRightClear(waspCurrentPosition) === true && right !== waspPreviousPosition) { // if left and down blocked, check right is clear
          // console.log('down not clear')
          moveCharacter('right', waspClass, waspPreviousPosition, waspCurrentPosition) // move right
        } else if (isUpClear(waspCurrentPosition) === true) { // if left, down and right blocked, check up is clear
          // console.log('right not clear, moving up')
          moveCharacter('up', waspClass, waspPreviousPosition, waspCurrentPosition) // move up
        }
      }
    }  
  
    addGhost(waspCurrentPosition, waspClass)
    if (cells[waspCurrentPosition].classList.contains(playerClass)) {
      touchGhost(playerCurrentPosition)
      if (ghostMode === 'split class' || ghostMode === 'chase class') {
        playerCurrentPosition = playerStartPosition
      }
    }
    setCharacterCoordinates(waspClass, waspCurrentPosition, e, f)
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
      lives++
      audio.src = 'styles/sounds/acnl_-_exclamation.mp3'
      if (soundOn === true) {
        audio.play()
      }
    }
  }

  // get net
  function getNet(playerCurrentPosition) {
    if (cells[playerCurrentPosition].classList.contains(netClass)) {
      hideCount = 0
      audio.src = 'styles/sounds/acnl_-_exclamation.mp3'
      if (soundOn === true) {
        audio.play()
      }
      cells[playerCurrentPosition].classList.remove(netClass)
      ghostMode = 'hide mode'
      checkGhostMode(scorpianClass, scorpianCurrentPosition)
      checkGhostMode(tarantulaClass, tarantulaCurrentPosition)
      checkGhostMode(waspClass, waspCurrentPosition)
      grid.classList.add(glowClass)
      hideCount = 0
      startHideTimer()
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
  function touchGhost(playerCurrentPosition) {
    if (ghostMode === 'split mode' || ghostMode === 'chase mode') {
      audio.src = './styles/sounds/animal-crossing-shocked-sound-effect.mp3'
      console.log(audio)
      if (soundOn === true) {
        audio.play()
      }
      decreaseLives(lives)
      lives--
      clearInterval(move)
      resetAllCharacters()
      move = setInterval(() => {
        moveScorpian()
        moveTarantula()
        moveWasp()
      }, 500)
      removePlayer(playerCurrentPosition)
      playerCurrentPosition = playerStartPosition
      addPlayer(playerCurrentPosition)
      gameOver(score, lives)
    } else if (ghostMode === 'hide mode') {
      score += 200
      audio.src = 'styles/sounds/animal_crossing.mp3'
      if (soundOn === true) {
        audio.play()
      }
      updateScore(score)
      if (cells[playerCurrentPosition].classList.contains(scorpianClass)) {
        resetGhost(scorpianClass, scorpianCurrentPosition, scorpianStartPosition)
      } else if (cells[playerCurrentPosition].classList.contains(tarantulaClass)) {
        resetGhost(tarantulaClass, tarantulaCurrentPosition, tarantulaStartPosition)
      } else if (cells[playerCurrentPosition].classList.contains(waspClass)) {
        resetGhost(waspClass, waspCurrentPosition, waspStartPosition)
      }
    }
  }

  // checks if game is won
  let fruitCount = 0
  function fruitCheck () {
    fruitCount = 0
    cells.forEach(cell => {
      if (cell.classList.contains(foodClass)) {
        fruitCount += 1
        console.log('fruit', fruitCount)
      }
    }) 
    if (fruitCount === 0) {
      clearInterval(move)
      result.classList.remove('hidden')
      grid.classList.remove(glowClass)
      result.innerText = `You win! Your score: ${score}`
      document.removeEventListener('keydown', handleKeyDown)
      backgroundAudio.pause()
      audio.src = 'styles/sounds/new-leaf-alert.mp3'
      if (soundOn === true) {
        audio.play()
      }
      if (score > highscore) {
        localStorage.setItem('highscore', score)      
      }
    }
  }

  // game over
  function gameOver(score, lives) {
    if (lives === 0) {
      clearInterval(move)
      document.removeEventListener('keydown', handleKeyDown)
      for (let i = 0; i < cellCount; i++) {
        cells[i].classList.remove(playerClass)
      }
      result.classList.remove('hidden')
      grid.classList.remove(glowClass)
      backgroundAudio.pause()
      result.innerText = `Game Over! Your score: ${score}`
      audio.src = 'styles/sounds/animal-crossing-nh.mp3'
      if (soundOn === true) {
        audio.play()
      }
      if (score > highscore) {
        localStorage.setItem('highscore', score)      
      }
    }
  }

  // defines move
  let move 

  function checkGhostMode (ghostClass, ghostCurrentPosition) {
    if (ghostMode === 'split mode') {
      // console.log('split mode on')
      grid.classList.remove(glowClass)
      if (count < 3) {
        waspXGoal = 1
        waspYGoal = 1
        tarantulaXGoal = 9
        tarantulaYGoal = 9
        scorpianXGoal = 9
        scorpianYGoal = 1
      } else {
        ghostMode = 'chase mode'
      }
    } else if (ghostMode === 'chase mode') {
      // console.log('chase mode on')
      grid.classList.remove(glowClass)
      waspXGoal = x2
      waspYGoal = y
      tarantulaXGoal = x1
      tarantulaYGoal = y
      scorpianXGoal = x
      scorpianYGoal = y
    } else if (ghostMode === 'hide mode') {
      // console.log('hide mode on')
      if (hideCount < 8) {
        grid.classList.add(glowClass)
        result.classList.remove(hiddenClass)
        result.innerText = 'Catch the ghosts while you can!'
        moveGhostRandomly(ghostClass, ghostCurrentPosition)
      } else {
        // clearInterval(hideTimer)
        ghostMode = 'chase mode'
        result.classList.add(hiddenClass)
      }
    }
  }

  function moveGhostRandomly (ghostClass, ghostCurrentPosition) {
    removeGhost(ghostCurrentPosition, ghostClass)
    randomIndex = Math.floor(Math.random() * 4)
    console.log(ghostClass, randomIndex)
    if (randomIndex === 0 && !cells[ghostCurrentPosition - width].classList.contains(borderClass)) { //up
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

    if (ghostClass === tarantulaClass) {
      tarantulaCurrentPosition = ghostCurrentPosition
    } else if (ghostClass === scorpianClass) {
      scorpianCurrentPosition = ghostCurrentPosition
    } else if (ghostClass === waspClass) {
      waspCurrentPosition = ghostCurrentPosition
    }

    addGhost(ghostCurrentPosition, ghostClass)
  }

  function startTimer() {
    counterTimer = setInterval(() => {
      count++
      if (count > 3) {
        clearInterval(counterTimer)
      } else {
        console.log('split count ->', count)
      }
    }, 1000)
  }

  function startHideTimer() {
    hideTimer = setInterval(() => {
      hideCount++
      if (hideCount > 8) {
        clearInterval(hideTimer)
        ghostMode = 'split mode'
      } else {
        console.log('hideCount', hideCount)
      }
    }, 1000)
  }

  // ! start game
  function handleStart (event) {
    // adds background audio and plays
    if (soundOn === true) {
      backgroundAudio.play()
    }
    // removes start button
    event.target.classList.add(hiddenClass)
    reset.classList.remove(hiddenClass)
    gameStarted = true
    pauseStatus = false
    // starts player moving
    document.addEventListener('keydown', handleKeyDown)

    // changes mode
    ghostMode = 'split mode'
    startTimer()
    count = 0

    // calls move
    move = setInterval(() => {
      moveScorpian()
      moveTarantula()
      moveWasp()
      // moveGhost(scorpianClass, scorpianCurrentPosition, scorpianPreviousPosition, x, y, a, b)
      // console.log('move called')
    }, 500)
  }

  // reset game 
  function handleReset (event) {
    clearInterval(move)
    resetAllCharacters()
    score = 0 
    updateScore(score)
    lives = 2
    grabLives[0].classList.remove(hiddenClass)
    grabLives[1].classList.remove(hiddenClass)
    event.target.classList.add(hiddenClass)
    start.classList.remove(hiddenClass)
    gameStarted = false
    grid.classList.remove(glowClass)
    clearInterval(hideTimer)
    backgroundAudio.pause()

    for (let i = 0; i < cellCount; i ++) {
      if (i === 27) {
        cells[i].classList.add(fossilClass)
      } else if (i === 20 || i === 100) {
        cells[i].classList.add(netClass)
      } else if (!cells[i].classList.contains(borderClass) && !cells[i].classList.contains(fossilClass) && !cells[i].classList.contains(netClass) && !cells[i].classList.contains(fenceClass) && i !== 59 && i !== 60 && i !== 61) {
        cells[i].classList.add(foodClass)
      }
    }
    grabLives[2].classList.add(hiddenClass)
    result.classList.add('hidden')

  }

  // help
  function handleHelp () {
    displayHelp.classList.remove('hidden')
    console.log('pause status on help', pauseStatus)
    backgroundAudio.pause()
    if (pauseStatus === false && gameStarted === true) {
      clearInterval(move)
      pauseStatus = true
      start.classList.add(hiddenClass)
      reset.classList.remove(hiddenClass)
    }
  }

  function handleSound () {
    console.log('sound clicked')
    if (soundOn === true) {
      soundOn = false
      backgroundAudio.pause()
      audio.pause()
    } else {
      soundOn = true
      if (gameStarted === true) {
        backgroundAudio.play()
      }
    }
  }

  // make the grid
  createGrid(playerStartPosition)

  // ! event listeners

  document.addEventListener('keydown', handleEscapeKey)
  start.addEventListener('click', handleStart)
  reset.addEventListener('click', handleReset)
  help.addEventListener('click', handleHelp)
  sound.addEventListener('click', handleSound)

}

window.addEventListener('DOMContentLoaded', init)









// // ! move the ghost intellegently
// function moveGhost(ghostClass, ghostCurrentPosition, ghostPreviousPosition, xAxisPlayer, yAxisPlayer, xAxisGhost, yAxisGhost) {
//   const down = ghostCurrentPosition + width
//   const left = ghostCurrentPosition - 1
//   const right = ghostCurrentPosition + 1
//   const up = ghostCurrentPosition - width
  
//   removeGhost(ghostCurrentPosition, ghostClass)
  
//   // checks movement through tunnel
//   if (ghostCurrentPosition === 55 && xAxisPlayer > xAxisGhost && ghostPreviousPosition !== 65) {
//     ghostPreviousPosition = ghostCurrentPosition
//     ghostCurrentPosition = 65
//     console.log('previous, current ->', ghostPreviousPosition, ghostCurrentPosition)
//   } else if (ghostCurrentPosition === 65 && xAxisPlayer < xAxisGhost && ghostPreviousPosition !== 55) {
//     ghostPreviousPosition = ghostCurrentPosition
//     ghostCurrentPosition = 55
//   } else if (yAxisPlayer > yAxisGhost) {
//     console.log('ghost higher than player')      
//     if (isDownClear(ghostCurrentPosition) === true && down !== ghostPreviousPosition) { // check tile below is clear, check previous position
//       moveCharacter('down', ghostClass, ghostPreviousPosition, ghostCurrentPosition) // move down
//     } else { // if below is blocked, do the following
//       if (xAxisPlayer > xAxisGhost) { // if ghost left of player
//         console.log('ghost left of player')
//         if (isRightClear(ghostCurrentPosition) === true && right !== ghostPreviousPosition) { // check tile to right is clear
//           moveCharacter('right', ghostClass, ghostPreviousPosition, ghostCurrentPosition) // move right
//         } else { // if down and right is blocked
//           console.log('border to right')
//           if (isLeftClear(ghostCurrentPosition) === true && left !== ghostPreviousPosition) { // check tile to left is clear
//             moveCharacter('left', ghostClass, ghostPreviousPosition, ghostCurrentPosition) // move left
//           } else { // if down, right and left is blocked
//             console.log('border to left')
//             if (isUpClear(ghostCurrentPosition) === true) { // check tile above is clear
//               moveCharacter('up', ghostClass, ghostPreviousPosition, ghostCurrentPosition) // move up
//             } 
//           }
//         }
//       } else if (xAxisPlayer < xAxisGhost) { // if ghost is to right of player
//         console.log('ghost to right of player')
//         if (isLeftClear(ghostCurrentPosition) === true && left !== ghostPreviousPosition) { // check tile to left is clear
//           moveCharacter('left', ghostClass, ghostPreviousPosition, ghostCurrentPosition) // move left
//         } else { // if down and left is blocked
//           console.log('border to left') 
//           if (isRightClear(ghostCurrentPosition) === true && right !== ghostPreviousPosition) { // check tile to right is clear
//             moveCharacter('right', ghostClass, ghostPreviousPosition, ghostCurrentPosition) // move right
//           } else { // if down, left and right is blocked
//             console.log('border below')
//             if (isUpClear(ghostCurrentPosition) === true) { // check tile above is clear
//               moveCharacter('up', ghostClass, ghostPreviousPosition, ghostCurrentPosition) // move up
//             }
//           }
//         }
//       } else if (xAxisPlayer === xAxisGhost) { // if player and ghost are in line on y-axis
//         console.log('ghost directly above player')
//         if (isLeftClear(ghostCurrentPosition) === true && left !== ghostPreviousPosition) { // check if left tile is clear
//           moveCharacter('left', ghostClass, ghostPreviousPosition, ghostCurrentPosition) // move left
//         } else if (isRightClear(ghostCurrentPosition) === true && right !== ghostPreviousPosition) { // if down and left are blocked, check if right tile is clear
//           moveCharacter('right', ghostClass, ghostPreviousPosition, ghostCurrentPosition) // move right
//         } else if (isUpClear(ghostCurrentPosition) === true) { // if down, left and right are blocked, check if tile above is clear
//           moveCharacter('up', ghostClass, ghostPreviousPosition, ghostCurrentPosition) // move up
//         }
//       }
//     }
//   } else if (yAxisPlayer < yAxisGhost) { // if ghost is below player
//     console.log('ghost lower than player')
//     if (isUpClear(ghostCurrentPosition) === true && up !== ghostPreviousPosition) { // check tile above is clear
//       moveCharacter('up', ghostClass, ghostPreviousPosition, ghostCurrentPosition) // move ghost up 
//     } else { // if above is blocked
//       if (xAxisPlayer > xAxisGhost) { // check if ghost is left of player
//         console.log('ghost left of player')
//         if (isRightClear(ghostCurrentPosition) === true && right !== ghostPreviousPosition) { // check if tile to right is clear
//           console.log(right)
//           moveCharacter('right', ghostClass, ghostPreviousPosition, ghostCurrentPosition) // move ghost right
//         } else if (isLeftClear(ghostCurrentPosition) === true && left !== ghostPreviousPosition) { // if above and right is blocked, check left is clear
//           moveCharacter('left', ghostClass, ghostPreviousPosition, ghostCurrentPosition) // move ghost left
//         } else if (isDownClear(ghostCurrentPosition) === true) { // if above, right and left is blocked, check down is clear
//           moveCharacter('down', ghostClass, ghostPreviousPosition, ghostCurrentPosition) // move ghost down
//         } else if (isUpClear(ghostCurrentPosition) === true) {
//           moveCharacter('up', ghostClass, ghostPreviousPosition, ghostCurrentPosition)
//         }
//       } else if (xAxisPlayer < xAxisGhost) { // if ghost is right of player
//         console.log('ghost right of player')
//         if (isLeftClear(ghostCurrentPosition) === true && left !== ghostPreviousPosition) { // check tile to left is clear
//           moveCharacter('left', ghostClass, ghostPreviousPosition, ghostCurrentPosition) // move ghost left
//         } else if (isDownClear(ghostCurrentPosition) === true && down !== ghostPreviousPosition) { // if above and left is blocked, check if tile below is clear
//           moveCharacter('down', ghostClass, ghostPreviousPosition, ghostCurrentPosition) // move ghost down
//         } else if (isRightClear(ghostCurrentPosition) === true) { // if above, left and below is blocked, check right is clear
//           moveCharacter('right', ghostClass, ghostPreviousPosition, ghostCurrentPosition) // move ghost right
//         } else if (isUpClear(ghostCurrentPosition) === true) {
//           moveCharacter('up', ghostClass, ghostPreviousPosition, ghostCurrentPosition)
//         }
//       } else if (xAxisPlayer === xAxisGhost) { // if ghost and player are in line on the y-axis
//         console.log('ghost on same vertical plane as player')
//         if (isLeftClear(ghostCurrentPosition) === true && left !== ghostPreviousPosition) { // check left tile is clear
//           console.log('move left')
//           moveCharacter('left', ghostClass, ghostPreviousPosition, ghostCurrentPosition) // move ghost left
//         } else if (isRightClear(ghostCurrentPosition) === true && right !== ghostPreviousPosition) { // if above and left tile is blocked, check right is clear
//           moveCharacter('right', ghostClass, ghostPreviousPosition, ghostCurrentPosition) // move ghost right
//         } else if (isDownClear(ghostCurrentPosition) === true && down !== ghostPreviousPosition) { // if above, left and right tile is blocked, check below is clear 
//           moveCharacter('down', ghostClass, ghostPreviousPosition, ghostCurrentPosition) // move ghost down
//         } else if (isUpClear(ghostCurrentPosition) === true) {
//           moveCharacter('up', ghostClass, ghostPreviousPosition, ghostCurrentPosition)
//         }
//       }
//     }
//   } else if (yAxisPlayer === yAxisGhost) { // if ghost and player are in line on x-axis
//     console.log('ghost on same horizontal plane as player')
//     console.log('position after horizontal check')
//     if (xAxisPlayer > xAxisGhost) { // if ghost to left of player
//       console.log('ghost left of player')
//       if (isRightClear(ghostCurrentPosition) === true && right !== ghostPreviousPosition) { // check tile to right is clear
//         moveCharacter('right', ghostClass, ghostPreviousPosition, ghostCurrentPosition) // move right
//       }  else if (isLeftClear(ghostCurrentPosition) === true && left !== ghostPreviousPosition) { // if right is blocked, check tile to left is clear
//         moveCharacter('left', ghostClass, ghostPreviousPosition, ghostCurrentPosition) // move left
//       } else if (isDownClear(ghostCurrentPosition) === true && down !== ghostPreviousPosition) { // if right and left blocked, check tile below is clear
//         moveCharacter('down', ghostClass, ghostPreviousPosition, ghostCurrentPosition) // move down
//       } else if (isUpClear(ghostCurrentPosition) === true) { // if right, left and down blocked, check tile above is clear
//         moveCharacter('up', ghostClass, ghostPreviousPosition, ghostCurrentPosition) // move up
//       }
//     } else if (xAxisPlayer < xAxisGhost) { // if ghost to right of player
//       console.log('ghost right of player')
//       if (isLeftClear(ghostCurrentPosition) === true && left !== ghostPreviousPosition) { // check left is clear
//         moveCharacter('left', ghostClass, ghostPreviousPosition, ghostCurrentPosition) // move left
//         console.log('moving left')
//         console.log('scorpian position ->', scorpianCurrentPosition)
//         console.log('player current position ->', playerCurrentPosition)
//       } else if (isDownClear(ghostCurrentPosition) === true && down !== ghostPreviousPosition) { // if left blocked, check down is clear
//         console.log('left not clear')
//         moveCharacter('down', ghostClass, ghostPreviousPosition, ghostCurrentPosition) // move down
//       } else if (isRightClear(ghostCurrentPosition) === true && right !== ghostPreviousPosition) { // if left and down blocked, check right is clear
//         console.log('down not clear')
//         moveCharacter('right', ghostClass, ghostPreviousPosition, ghostCurrentPosition) // move right
//       } else if (isUpClear(ghostCurrentPosition) === true) { // if left, down and right blocked, check up is clear
//         console.log('right not clear, moving up')
//         moveCharacter('up', ghostClass, ghostPreviousPosition, ghostCurrentPosition) // move up
//       } else {
//         console.log('not moving')
//       }
//       console.log('hi')
//     }

//     if (ghostClass === scorpianClass) {
//       scorpianCurrentPosition = ghostCurrentPosition
//       console.log('current position after move -> ', scorpianCurrentPosition)
//       scorpianPreviousPosition = ghostPreviousPosition
//       console.log('previous position after move -> ', scorpianPreviousPosition)
        
//       addGhost(scorpianCurrentPosition, scorpianClass)
//       if (cells[scorpianCurrentPosition].classList.contains(playerClass)) {
//         touchGhost(playerCurrentPosition)
//         playerCurrentPosition = playerStartPosition
//       }
//       setCharacterCoordinates(scorpianClass, scorpianCurrentPosition, a, b)
//     }

//   }  
// addGhost(scorpianCurrentPosition, scorpianClass)
// if (cells[scorpianCurrentPosition].classList.contains(playerClass)) {
//   touchGhost(playerCurrentPosition)
//   playerCurrentPosition = playerStartPosition
// }
// setCharacterCoordinates(scorpianClass, scorpianCurrentPosition, a, b)
// }
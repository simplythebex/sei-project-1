function init() {

  const grid = document.querySelector('.grid')

  const playerClass = 'player'
  const playerStartPosition = 12
  let playerCurrentPosition = 12

  const width = 11
  const cellCount = width * width
  const cells = []

  // level
  const level = 'beginner'

  // border info
  const borderClass = 'border'
  const borderArray = [24, 25, 26, 28, 29, 30, 45, 46, 48, 50, 52, 53, 59, 61, 67, 68, 70, 71, 72, 74, 75, 90, 91, 92, 94, 95, 96]


  // food info
  const foodClass = 'food'
  let score = 0
  // const grabScore = document.querySelector('.score p')

  // fossil info
  const fossilClass = 'fossil'
  let lives = 2
  // const grabLives = document.querySelectorAll('.life')

  // hide classes
  const hiddenClass = 'hidden'

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

    // addPlayer(playerStartPosition)
    // addGhost(scorpianStartPosition, scorpianClass)
    // addGhost(tarantulaStartPosition, tarantulaClass)
    // addGhost(waspStartPosition, waspClass)
  }

  function addGhost(position, ghostClass) {
    cells[position].classList.add(ghostClass)
  }

  createGrid(playerStartPosition)
}

window.addEventListener('DOMContentLoaded', init)
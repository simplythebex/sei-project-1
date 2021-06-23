# Project 1: Animal Crossing, PacMan Edition

## Overview

Animal Crossing, PacMan Edition is a new take on the classic pacman arcade game. The player must play as Isabelle, collecting gold for Tom Nook while avoiding the dangerous bugs that roam the village. Bonus points can be accumulated by picking up nets and catching the bugs before time runs out. 

This was my first project as a General Assembly Software Engineering Immersive Student, and was built in one week. This was also my first project using JavaScript.

## Brief

- Create a grid based game that can be played in the browser 
- Design logic for moving the player and the 'ghosts'
- Display a score at the end of the game
- Include seperate HTML/CSS/JavaScript files
- Deploy the game online using GitHub pages

## Technologies

- HTML5
- CSS
- JavaScript ES6
- Git 
- GitHub

## Approach 

### Grid layout 
I created the grid in a JavaScript function. The function created an array of divs within a flex-container. The divs could have classes attached, which were used to change the display. During development the index of each div could be displayed which resulted in a grid that was easy to change if required, and allowed me to keep track of attached classes easily.

### Display and movement of objects
Using the indexes of the divs I could attach a class for each character or item I wanted to display. 

To create the map I created an array of indexes that I wanted to display the borders on, and attached classes to these. Next I chose indexes on which to display the extra life and the nets. Finally I displayed the money on any indexes which did not have another object on them.

The player and character movement could be controlled by keeping track of the index. horizontal movement was programmed by adding or subtracting 1 from the index, while vertical movement was programmed by adding or subtracting the width of the grid.

To move the character I used keypress event listeners, meaning the player could move Isabelle up, down, left or right using the arrow keys. With each key press the class would be removed from the old index, the index would be updated, and the class would be attached to the new index.

To move the ghosts I needed to use logic to calculate the ghost position in relation to the player. I created coordiantes for each character and compared the ghost co-ordinates to the players coordinates. If the player was above the ghost it would move up, if the player was to the left of the ghost it would move left. I used if statements to check each possibility.

### Collision detection 
I needed to ensure that the player and ghosts could not move through the borders or over the edge of the map. To do this I created functions to check whether each direction was clear and return a Boolean value. When the player or a ghost tried to move in a particular direction this function would be called. If true was returned, the player would be able to move. Otherwise the player would remain in their current position.

  // moves the player
  // checks which key is pressed, whether there is a border in the direction of press, whether there is a ghost on new tile
  if (key === 38 && !cells[playerCurrentPosition - width].classList.contains(borderClass)) { // up
    playerCurrentPosition -= width
    handleInteraction(playerCurrentPosition)

If a ghost tried to move in a blocked direction I created logic to find a new direction to move in, ensuring the ghost would not become stuck.

### Logic for if the player is caught
When the player is caught by a ghost the player loses a life and all the characters return to the starting positions. To account for this I created a function to check whether the player class and a ghost class were on the same div at once. If this occured a life would be subtracted. Another function would be called to check whether the life count had hit 0. If it had the game over message would display. Otherwise all players would be reset.

### Changing the game mode when net is picked up
In this version of pacman, when the player picks up a net I wanted the ghosts movement to change. Instead of chasing the player, they now move in random directions.
To program this I created a ghostMode variable which would hold information about the mode that the ghosts were in. If a net was picked up, a function would be called which would change the ghostMode to 'hide', and start a timer. While the timer was running random numbers would be generated for each ghost. These corresponded to the direction in which the ghost would move. 


## Bugs
List of bugs that I know about

## Wins and Challenges
What was successful. What did I learn.

## Future
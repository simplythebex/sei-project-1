# Project 1: Animal Crossing, PacMan Edition

## Overview

Animal Crossing, PacMan Edition is a new take on the classic pacman arcade game. The player must play as Isabelle, collecting gold for Tom Nook while avoiding the dangerous creatures that roam the village. Bonus points can be accumulated by picking up nets and catching the creatures before time runs out. An additional life can also be found in the form of a fossil.

This was my first project as a General Assembly Software Engineering Immersive Student, and was built in one week. This was also my first project using JavaScript.

## Brief

- Create a grid based game that can be played in the browser 
- Design logic for moving the player and the 'ghosts'
- Display a score at the end of the game
- Include seperate HTML/CSS/JavaScript files
- Deploy the game online using GitHub pages

## Timeframe

7 days

## Technologies

- HTML5
- CSS
- JavaScript ES6
- Git 
- GitHub

## Deployed version

https://simplythebex.github.io/sei-project-1/

## Approach 

### Grid layout 
I created the grid in a JavaScript function. The function created an array of divs within a flex-container. The divs could have classes attached, which were used to change the display. During development the index of each div could be displayed which resulted in a grid that was easy to change if required, and allowed me to keep track of attached classes easily.

![Create Grid] (styles/images/readme-images/create-grid.png)

### Display and movement of objects
Using the indexes of the divs I could attach a class for each character or item I wanted to display.

To create the map I created an array of indexes that I wanted to display the borders on, and attached classes to these. Next I chose indexes on which to display the extra life and the nets. Finally I displayed the money on any indexes which did not have another object on them.

The player and character movement could be controlled by keeping track of the index. horizontal movement was programmed by adding or subtracting 1 from the index, while vertical movement was programmed by adding or subtracting the width of the grid.

To move the character I used keypress event listeners, meaning the player could move Isabelle up, down, left or right using the arrow keys. With each key press the class would be removed from the old index, the index would be updated, and the class would be attached to the new index.

To move the ghosts I needed to use logic to calculate the ghost position in relation to the player. I created coordinates for each character and compared the ghost coordinates to the players coordinates. If the player was above the ghost it would move up, if the player was to the left of the ghost it would move left. I used if statements to check each possibility.

### Collision detection 
I needed to ensure that the player and ghosts could not move through the borders or over the edge of the map. To do this I created functions to check whether each direction was clear and return a Boolean value. When the player or a ghost tried to move in a particular direction this function would be called. If true was returned, the player would be able to move. Otherwise the player would remain in their current position.

The example above shows some of the logic for moving the player. When the down arrow is pressed, the game checks whether the border class is below, and moves the player down if the tile is empty.

If a ghost tried to move in a blocked direction I used a series of if statements to find a new direction to move in, preventing the ghost from becoming stuck.


### Logic for if the player is caught
When the player is caught by a ghost the player loses a life and all the characters return to the starting positions. To account for this I created a function to check whether the player class and a ghost class were on the same div at once. If this occurred a life would be subtracted. Another function would be called to check whether the life count had hit 0. If it had the game over message would display. Otherwise all players would be reset.


### Changing the game mode when net is picked up
In this version of pacman, when the player picks up a net I wanted the ghosts movement to change. Instead of chasing the player, they now move in random directions. To program this I created a ghostMode variable which would hold information about the mode that the ghosts were in. If a net was picked up, a function would be called which would change the ghostMode to 'hide', and start a timer. While the timer was running random numbers would be generated for each ghost. These corresponded to the direction in which the ghost would move.

The code above shows the programming of the ‘hide mode’ timer. After 8 seconds the timer changes the ghosts mode to split mode, causing them to separate before resuming chasing the player.

During hide mode the ghosts are programmed to move randomly around the grid.

## Bugs
While I programmed collision detection into the game, I encountered bugs around the ghost movement. I found that I had to set each ghosts target differently in order to prevent the ghosts all following each other, or from all being placed on the same tile at one and being difficult to see. Setting each ghosts target differently solved this problem for the most part, however the ghosts do still occasionally collide and travel on the same grid tiles at once, making it appear as though one of the ghosts is missing from the game. 

Another bug I encountered was the ghosts getting trapped in certain areas of the grid. Occasionally a ghost will become stuck in a corner or in its pen. I found it challenging to predict when this would occur, and therefore need to test the game further to find a solution to this bug.


## Wins and Challenges

Programming the ghost movement was both a win and a challenge. I chose to program the movement of each ghost by writing a function that used a series of if statements that checked the ghost position in relation to the player, and whether the path was blocked. This was time consuming to write and test but I was happy overall with the paths that the ghosts would take. Because the ghost checks the player's position after each movement it means that the ghosts respond quickly to the new location, making the game more of a challenge.

Programming the movement of the ghosts during the ‘hide mode’ was a larger challenge. Initially I wanted the ghosts to return to their pen, however after coding in this movement I realised that the ghosts would often get there too quickly, making the game less enjoyable. I also tried programming them to move to the corners of the grid for a few seconds, before moving to the pen, however if the ghost was already near the corner it would simply sit there while the timer was running. This also did not look very good. Eventually, as I was working to a tight deadline, I chose to program the ghosts to move randomly while ‘hide mode’ was on. This resulted in some strange movement, but allowed a better experience for the user than my other two solutions. 

## Future

I would like to improve the ghost movement further. The functions that move the ghosts are very long and repetitive, so I would like to develop a more streamlined algorithm that can be reused for each ghost. I would also like to develop a better way of moving the ghosts during hide mode.

In my original plan I was hoping to add a feature that would have balloons floating across the screen at set time intervals. If the user presses a specified key, the balloon would pop and a function would be called that would randomly generate either coins, another life, a net or a new ghost on the board. In the future I would like to add this feature to improve gameplay. 

Finally I would like to add extra maps each with different difficulties, so that the user has more choices in the game they can play.

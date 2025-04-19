// Clear the console (reset)
function clearConsole() {
    process.stdout.write('\x1Bc'); // ANSI escape code to reset the console
}

// Canvas size
const width = 35;
const height = 15;

// Initial ball position
let x = 5;   // Horizontal start at column 5
let y = 2;   // Vertical start at row 2

// Ball speed - delta - change per "frame"
let dx = 1;  // Horizontal speed: 1 character per frame
let dy = 1;  // Vertical speed: 1 character per frame

// Draw and update the ball
function drawBall() {
    clearConsole(); // Clear the terminal to prevent stacking of drawings

    let screen = ''; // Canvas - space to draw characters

    // Loop through each row (height)
    for (let i = 0; i < height; i++) {
        // Loop through each column (width) in the current row
        for (let j = 0; j < width; j++) {
            // Draw the rectangle borders
            if (i === 0 || i === height - 1) { // If in the first or last row
                screen += '▬'; // Add a top or bottom border
            } else if (j === 0 || j === width - 1) { // If in the first or last column
                screen += '▮'; // Add a side border
            }
            // Draw the ball at its current position
            else if (i === y && j === x) { // If coordinates (i, j) match (x, y)
                screen += 'O'; // Place the ball
            }
            // If not a border or ball, leave an empty space
            else {
                screen += ' ';
            }
        }
        screen += '\n'; // Add a newline at the end of each row to move to the next
    }

    // Display the complete "canvas" in the console
    console.log(screen);

    // Update the ball's position for the next frame
    x += dx; // Add horizontal speed to x position (moves ball left/right)
    y += dy; // Add vertical speed to y position (moves ball up/down)

    // Bounce logic: if the ball hits a border, reverse its direction
    // Check horizontal boundaries (left and right)
    if (x <= 1) { // If the ball hits the left border (column 1, since 0 is the border)
        dx = -dx; // Reverse horizontal direction (from left to right)
        x = 1;    // Ensure it doesn't stick to the border
    } else if (x >= width - 2) { // If it hits the right border (width-2 since width-1 is the border)
        dx = -dx; // Reverse direction (from right to left)
        x = width - 2; // Adjust to stay within bounds
    }

    // Check vertical boundaries (top and bottom)
    if (y <= 1) { // If the ball hits the top border (row 1, since 0 is the border)
        dy = -dy; // Reverse vertical direction (from up to down)
        y = 1;    // Ensure it doesn't go out of bounds
    } else if (y >= height - 2) { // If it hits the bottom border
        dy = -dy; // Reverse direction (from down to up)
        y = height - 2; // Adjust the position
    }
}

// Run drawBall every 70 milliseconds to create the animation
setInterval(drawBall, 70); // 70ms = 0.07 seconds, controls the animation speed
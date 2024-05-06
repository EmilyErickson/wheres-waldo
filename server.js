const express = require("express");
const cors = require("cors");

const app = express();
const bodyParser = require("body-parser");

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const port = 3001; // Choose a port for your server

app.use(bodyParser.json());

// Endpoint to handle character location checks
app.post("/checkCharacterLocation", (req, res) => {
  const { character, position } = req.body;
  const x = position.x;
  const y = position.y;

  const characterX = character.xCoordinate;
  const characterY = character.yCoordinate;
  let characterFound = null;
  // Your logic to check if the character is within the target box
  if (
    characterX <= x + 25 &&
    characterX >= x - 25 &&
    characterY <= y + 25 &&
    characterY >= y - 25
  ) {
    console.log("found");
    character.isFound = true;
    characterFound = character;
  } else {
    console.log("xy", x, y);
    characterFound = null;
  }
  // Send response back to the client
  res.json({ characterFound });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

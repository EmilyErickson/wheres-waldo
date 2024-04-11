// server.js
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

// const express = require("express");

// const app = express();
const port = 3001; // Choose a port for your server

app.use(bodyParser.json());

// Endpoint to handle character location checks
app.post("/checkCharacterLocation", (req, res) => {
  const { character, position } = req.body;
  const x = position.x;
  const y = position.y;

  const characterX = 80;
  const characterY = 739;
  let characterFound = null;
  // Your logic to check if the character is within the target box
  if (
    characterX <= x + 50 &&
    characterX >= x - 50 &&
    characterY <= y + 50 &&
    characterY >= y - 50
  ) {
    console.log("found");
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

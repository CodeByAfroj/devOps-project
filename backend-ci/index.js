import express from "express";
import cors from 'cors'
const app = express();

// Dummy data
app.use(cors())
const messages = [
  { id: 1, text: "Hello World!" },
  { id: 2, text: "This is a dummy message." },
  { id: 3, text: "Express makes APIs easy." }
];

// Root route
app.get("/", (req, res) => {
  res.send("Hello Folks");
});

// Dummy messages API
app.get("/api/msg", (req, res) => {
  res.json(messages);
});

app.listen(3000, () => {
  console.log("Server Listening on port 3000...");
});

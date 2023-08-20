import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import path from "path";
import db from './db/conn.mjs'

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// opens db connection and starts the Express server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
})

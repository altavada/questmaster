const dotenv = require("dotenv");
const result = dotenv.config();

if (result.error) {
  console.error("Dotenv config ERROR:", result.error);
} else {
  console.log("Dotenv config successful.");
}

const cors = require("cors");
const express = require("express");
const path = require("path");
const db = require("./db/conn");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/books");
const Record = require("./models/record");
const router = require("./models/record.js");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.get("/", async (req, res) => {
  let results = await Record.find({});
  var arr = [];
  for (var i = 0; i < results.length; i++) {
    arr.push(results[i]);
  }
  console.log("fetched");
  res.send(arr);
});

// app.get("/", (req, res) => {
//   res.send({ title: "Books" });
// });

// app.get("/add-note", async (req, res) => {
//   try {
//     await Book.insertMany([
//       {
//         title: "Sons of Anarchy",
//         body: "Body text goes here...",
//       },
//       {
//         title: "Game of Throne",
//         body: "Body text goes here...",
//       },
//     ]);
//   } catch (error) {
//     console.log("err" + error);
//   }
// });

// app.get("/books", async (req, res) => {
//   const book = await Book.find();

//   if (book) {
//     res.json(book);
//   } else {
//     res.send("Something went wrong.");
//   }
// });

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on post ${PORT}`);
  });
});

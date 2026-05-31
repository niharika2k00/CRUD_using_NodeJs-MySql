import express from "express";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
dotenv.config();

// app.get(endpoint, callback)
app.get("/", (req, res) => {
  res.send("get success !");
});

// listen() function ---->  used to bind and listen the connections on the specified host and port
app.listen(3000, function () {
  console.log("helo");
  // console.log(`App listening at http://localhost:${port} for ${process.env.NODE_ENV}`);
  // console.log(process.env.PORT);
});

import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user-routes.js";

dotenv.config();
const port = process.env.PORT || 8000;
const app = express();
app.use(express.json());

// app.get(endpoint, callback)
app.get("/", (req, res) => {
  res.send("get success !");
});

// insert data - post request
/* app.get('/addpost', (req, res) => {
    let post = { name: 'niharika', title: 'post 1 created' };
    let sqlCommand = 'INSERT INTO Users SET ?';
    let query = db.query(sqlCommand, post, (err, result) => {
        if (err) throw err;
        console.log("Result = ", result);
        res.status(200);
        res.send('added ');
    });
}) */

// syntax: app.use(path, callback)
app.use("/api/user", userRoutes);

// listen() function ---->  used to bind and listen the connections on the specified host and port
app.listen(port, function () {
  console.log(`App listening at http://localhost:${port} for ${process.env.NODE_ENV}`);
  console.log(process.env.PORT);
});

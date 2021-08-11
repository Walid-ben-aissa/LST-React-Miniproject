const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3030;
app.use(cors({ orign: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//GET to get all the tasks
app.get("/getall", (req, res) => {
  let rawdata = fs.readFileSync(path.resolve(__dirname, "data.json"));
  res.json(JSON.parse(rawdata));
});

//POST to add a task
app.post("/addtask", (req, res) => {
  let rawdata = fs.readFileSync(path.resolve(__dirname, "data.json"));
  let data = JSON.parse(rawdata);
  let ele = req.body;
  ele.id = data.length + 1;
  console.log(ele);
  data.push(ele);
  fs.writeFileSync(path.resolve(__dirname, "data.json"), JSON.stringify(data));
  res.json("Ok");
});

//GET to delete a task
app.get("/deltask/:id", (req, res) => {
  let rawdata = fs.readFileSync(path.resolve(__dirname, "data.json"));
  let data = JSON.parse(rawdata);
  let i = -1,
    found = false,
    id = parseInt(req.params["id"]);
  while (i < data.length && !found) {
    i++;
    if (data[i]["id"] === id) {
      found = true;
    }
  }
  data.splice(i, 1);
  fs.writeFileSync(path.resolve(__dirname, "data.json"), JSON.stringify(data));
  res.json(data[i]);
});

//GET to toggle a task's complete state
app.get("/toggle/:id", (req, res, next) => {
  let rawdata = fs.readFileSync(path.resolve(__dirname, "data.json"));
  let data = JSON.parse(rawdata);
  let i = -1,
    found = false,
    id = parseInt(req.params["id"]);
  while (i < data.length && !found) {
    i++;
    if (data[i]["id"] === id) {
      console.log(data[i]["complete"]);
      found = true;
    }
  }
  data[i]["complete"] = !data[i]["complete"];
  fs.writeFileSync(path.resolve(__dirname, "data.json"), JSON.stringify(data));
  res.json(data[i]);
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

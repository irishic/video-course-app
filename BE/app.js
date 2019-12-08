var express = require("express");
var app = express();

app.get("/courses", function(req, res) {
  res.send([
    {
      id: "1",
      title: "Upcoming course",
      creationDate: new Date("01-01-2020"),
      duration: 54,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      topRated: false
    },
    {
      id: "2",
      title: "New course",
      creationDate: new Date("11-01-2019"),
      duration: 96,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      topRated: true
    },
    {
      id: "3",
      title: "Regular course",
      creationDate: new Date("01-01-2018"),
      duration: 96,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      topRated: true
    }
  ]);
});

app.listen(3000);

const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./user");
const keyData = require("./key");
const usersTemporaryStorage = [];
let courses = require("./fake-courses");
const authors = require("./fake-authors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const allowedWithoutLogingIn = ["/register", "/login", "/user"];

app.use(cors());

app.use(function(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    try {
      jwt.verify(token, keyData.tokenKey);
      next();
    } catch (err) {
      res.status(403).send({ error: "Forbidden" });
    }
  } else if (
    allowedWithoutLogingIn.includes(req.originalUrl.split("?").shift())
  ) {
    next();
  } else {
    res.status(403).send({ error: "Forbidden" });
  }
});

app.use(function(req, res, next) {
  courses = courses.sort(function(course1, course2) {
    const firstCourseCreated = new Date(course1.creationDate);
    const secondCourseCreated = new Date(course2.creationDate);
    return firstCourseCreated < secondCourseCreated ? 1 : -1;
  });
  next();
});

app.get("/courses", function(req, res) {
  const { start, count } = req.query;
  const theLastIndex = (Number(start) || 0) + (Number(count) || 3);
  const neededInterval = courses.slice(start, theLastIndex);
  const isLast = !courses[theLastIndex + 1];
  setTimeout(() => {
    res.status(200).send({ courses: neededInterval, isLast });
  }, 2000);
});

app.post("/register", function(req, res) {
  const { login, password, firstName, lastName } = req.body;
  if (!findExistingUser(login)) {
    const newUser = new User({ login, password, firstName, lastName });
    newUser.emulatePreSave().then(savedUser => {
      const accessToken = jwt.sign(savedUser.toJSON(), keyData.tokenKey);

      res.status(200).send({ accessToken, user: newUser });
      usersTemporaryStorage.push(savedUser);
    });
  } else {
    res.status(400).send({ error: "User exists" });
  }
});

app.post("/login", function(req, res, next) {
  const { login, password } = req.body;
  const user = findExistingUser(login);
  if (!user) return res.status(404).send({ error: "not found" });

  user.checkPassword(password).then(isMatch => {
    if (isMatch) {
      const accessToken = jwt.sign(user.toJSON(), keyData.tokenKey);
      setTimeout(() => {
        res.status(200).send({ accessToken, user });
      }, 1000);
    } else res.status(400).send({ error: "wrong login/password" });
  });
});

app.get("/user", function(req, res) {
  const { token } = req.query;
  const { firstName, lastName, login, _id, id } = jwt.verify(
    token,
    keyData.tokenKey
  );
  res.status(200).send({ firstName, lastName, email: login, id: _id || id });
});

app.get("/search-course", function(req, res) {
  const { searchByTitle } = req.query;
  const suitableCourses = findCourseBy({ title: searchByTitle });
  res.status(200).send({
    courses: suitableCourses,
    isLast: true
  });
});

app.get("/delete-course/:id", function(req, res) {
  const id = req.params.id;
  courses = removeCourseById(id);
  res.status(200).send(courses.map(course => course.id));
});

app.post("/course/:id", function(req, res) {
  const courseData = { ...req.body };
  const id = req.params.id;
  if (id === "new") {
    courseData.id = getFreeId();
    courses.push(courseData);
  }
  res.status(200).send(courseData);
});

app.put("/course/:id", function(req, res) {
  const courseData = { ...req.body };
  let existingCourse = findCourseBy({ id: courseData.id });
  if (existingCourse) {
    removeCourseById(courseData.id);
    courses.push({ ...courseData });
    res.status(200).send(courseData);
  } else {
    res.status(404).send({ error: "not found" });
  }
});

app.get("/authors", function(req, res) {
  const { typed } = req.query;
  if (!typed) {
    res.status(200).send(authors);
  } else {
    const options = authors.filter(authorName =>
      RegExp(`^${typed}`).test(authorName)
    );
    res.status(200).send(options);
  }
});

function findCourseBy({ id, title }) {
  if (title) {
    return courses.filter(course =>
      course.title.toLowerCase().includes(title.toLowerCase())
    );
  }
  if (id) {
    return courses.filter(course => course.id === id);
  }
}

function findExistingUser(login) {
  return usersTemporaryStorage.find(user => user.login === login);
}

function getFreeId() {
  const ids = courses.map(course => course.id).sort();
  return ids[ids.length - 1] + 1;
}

function removeCourseById(id) {
  courses = courses.filter(course => course.id !== id);
  return courses;
}

app.listen(process.env.PORT | 3000);

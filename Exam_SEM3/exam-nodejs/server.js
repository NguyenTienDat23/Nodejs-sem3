const express = require("express");
const expressHandlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();

app.engine(
  "handlebars",
  expressHandlebars.engine({
    extname: "handlebars",
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

const port = process.env.PORT || 3000;
app.get("/", (req, res) => res.render("home"));
app.get("/thank-you", (req, res) => res.render("thank-you"));
app.get("/register", (req, res) => {
  res.render("register");
});
app.post("/process-apply", (req, res) => {
  console.log(
    `received contact from ${req.body.name}<${req.body.email}><${req.body.message}>`
  );
  res.redirect(303, "/thank-you");
});
app.use((req, res) => {
  res.status(404);
  res.render("404");
});
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500);
  res.render("500");
});
app.listen(port, () =>
  console.log(
    `Express started on http://localhost:${port} ` +
      `, press Ctrl+C to terminate.`
  )
);

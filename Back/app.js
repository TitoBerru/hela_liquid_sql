"use strict";
//CONSTS
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const methodOverride = require("method-override");

const app = express();
const path = require("path");
const createError = require("http-errors");
 //add colors to console

//routes Constants
const indexRouter = require("./src/routes/indexRoutes");
const usersRouter = require("./src/routes/usersRoutes");
const ejemploRouter = require("./src/routes/ejemplo");
const recipesRouter = require("./src/routes/recipesRoutes");
const flavorsRouter = require("./src/routes/flavorsRoutes");
const salesRouter = require("./src/routes/salesRoutes");
const comprasRouter = require("./src/routes/comprasRoutes");
const costsRouter = require("./src/routes/costsRoutes");
const apisRouter = require("./src/routes/apisRoutes")
const preciosRouter = require("./src/routes/preciosRoutes")


// end of Consts

//server start
// app.listen(3000, () => {
//   // console.log(colours.fg.yellow, 'Servidor corriendo terminal 3000 ❤ 😂', colours.reset)
//   console.log(
//     colours.bg.white,
//     colours.fg.red,
//     "Server run on port 3000",
//     colours.reset
//   );
// });

// view engine setup
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

// uses
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method")); // this for use put and delete on forms

//routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/ejemplo", ejemploRouter);
app.use("/recipes", recipesRouter);
app.use("/flavors", flavorsRouter);
app.use("/sales", salesRouter);
app.use("/compras", comprasRouter);
app.use("/costs", costsRouter);
app.use("/api", apisRouter);
app.use("/precios", preciosRouter)

//Not found
app.use((req, res, next) =>{
  res.status(404).render('not-found')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

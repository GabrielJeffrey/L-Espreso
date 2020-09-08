const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");

const foodRouter = require("./routes/foodRoutes");
const userRouter = require("./routes/userRoutes");

const globalErrorHandler = require("./Controllers/globalErrorHandler");

const app = express();

// !-----------GLODBAL MIDDLEWARES----------

// Set Security HTTP Headers
app.use(helmet());

// Development Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, Please try again in an hour",
});

app.use("/api", limiter);

// Body parser,  reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use(express.static("resources"));

// !--------------ROUTES-----------------
app.use("/api/v1/foods", foodRouter);
app.use("/api/v1/users", userRouter);

app.use(globalErrorHandler);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

module.exports = app;

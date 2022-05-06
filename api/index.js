const express = require("express");
const morgan = require("morgan");
const HttpError = require("./v1/errors/http-error");
const todoRouter = require("./v1/route/todo.router");
const todoRouterV2 = require("./v2/route/todo.router");
const TodoNotFoundError = require("./v1/errors/todo-not-found-error");

const DB_URI = process.env.DB_URI || "mongodb://127.0.0.1:27017/todo-app";
const PORT = process.env.PORT || 3000;
const app = express();

// Apply environment configurations and/or middleware
if (process.env.NODE_ENV === "PRODUCTION") {
  console.log("=== PRODUCTION ===");
  app.use(morgan("combined"));
} else {
  console.log("=== DEVELOPMENT ===");
  app.use(morgan("dev"));
}

// Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Router level middleware here
app.use("/v1/todo", todoRouter);
app.use("/v2/todo", todoRouterV2);
// Error handling middleware
app.use((error, request, response, next) => {
  console.error(error.message);

  if (!(error instanceof HttpError)) {
    if (error instanceof TodoNotFoundError) {
      error = new HttpError(error, 404);
    } else {
      // unknown error
      error = new HttpError(new Error("Something went wrong..."), 500);
    }
  }
  // It must be a HTTP error to have reached here, whether that was passed to error, or created
  // above
  return response.status(error.statusCode).json({
    message: error.message,
    data: error.data,
  });
});


async function main() {
  await mongoose
    .connect(DB_URI, { useNewUrlParser: true })
    .then(() => console.log(`Database connected: ${DB_URI}`));

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB connection error"));
  db.on("connection", console.log.bind(console, "MongoDB connected"));

  const server = app.listen(PORT, function () {
    console.log(`Server up on ${PORT}`);
  });
}

main();
const express = require("express");
const { accounts } = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errrorMiddleware");
dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running Successfully");
});
app.get("/api/accounts", (req, res) => {
  res.send(accounts);
});

app.get("/api/accounts/:id", (req, res) => {
  const singleAcc = accounts.find((c) => c._id === req.params.id);
  res.send(singleAcc);
});

app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

PORT = process.env.PORT || 4000;
app.listen(PORT, console.log("API running successfully"));

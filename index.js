// const config = require("config");
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const app = express();
const CronJob = require("cron").CronJob;
const { Jewel } = require("./models/jewel");
const path = require("path");

// Routes
const stones = require("./routes/stones");
const metals = require("./routes/metals");
const pieces = require("./routes/pieces");
const jewels = require("./routes/jewels");
const types = require("./routes/types");
const users = require("./routes/users");
const auth = require("./routes/auth");
const passwordReset = require("./routes/passwordReset");

// const __dirname = path.resolve();

require("dotenv").config();

const expChecker = async () => {
  const jewelsArray = await Jewel.find();
  // let jewelsArrayFiltered = jewelsArray.filter((item) => {
  //   return item.type.name === "Super" || "VIP";
  // });
  let dateNow = Date.now();
  let newDateNow = new Date(dateNow);
  jewelsArray.forEach(async (item) => {
    if (
      item.expirationDate.getDate() === newDateNow.getDate() &&
      item.expirationDate.getMonth() === newDateNow.getMonth() &&
      item.expirationDate.getYear() === newDateNow.getYear() &&
      !item.expired
    ) {
      await Jewel.findByIdAndUpdate(item.id, { expired: true });
    }
  });
};

const subscribtionJob = new CronJob(
  "* * * * * *",
  expChecker,
  null,
  false,
  "America/Los_Angeles"
);

subscribtionJob.start();

module.exports = function () {
  if (!process.env.JWT_PRIVATE_KEY) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
};

mongoose
  .connect(process.env.MONGODB_URI || process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

// ** MIDDLEWARE ** //
const whitelist = [
  "http://localhost:3000",
  "http://localhost:8080",
  "https://projectge.herokuapp.com",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cors());
app.use("/api/stones", stones);
app.use("/api/metals", metals);
app.use("/api/pieces", pieces);
app.use("/api/jewels", jewels);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/types", types);
app.use("/api/users", users);
app.use("/api/password-reset", passwordReset);
app.use("/api/auth", auth);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  // app.use(express.static("client/build"));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/client/build", "index.html"));
  });
}

const port = process.env.PORT || 3009;
app.listen(port, () => console.log(`Listening on port ${port}...`));

import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;
import ActivityRouter from "./routers/activity.router.js";
import authRouter from "./routers/auth.router.js";
import cors from "cors";
app.use(
  cors({
    origin: ["http://localhost:5173", "127.0.0.1:5173", FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import db from "./models/index.js";
const role = db.Role;

db.sequelize.sync({ force: true }).then(() => {
  initRole();
  console.log("Drop and Sync");
});
const initRole = () => {
  role.create({ id: 1, name: "admin" });
  role.create({ id: 2, name: "manager" });
  role.create({ id: 3, name: "teacher" });
  role.create({ id: 4, name: "judge" });
};
app.get("/", (req, res) => {
  res.send("SCI Competition Restful API Completed");
});

//use routers
app.use("/api/v1/activities", ActivityRouter);
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});

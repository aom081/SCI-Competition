import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// In-memory storage for activities
let activities = [];
let nextId = 1;

// Activity model fields
// id, name, description, type, level, team_size, date, location, reg_open, reg_close, contact_name, contact_phone, contact_email, status

// Create a new activity
app.post("/activities", (req, res) => {
  const {
    name,
    description,
    type,
    level,
    team_size,
    date,
    location,
    reg_open,
    reg_close,
    contact_name,
    contact_phone,
    contact_email,
    status,
  } = req.body;
  const activity = {
    id: nextId++,
    name,
    description,
    type,
    level,
    team_size,
    date,
    location,
    reg_open,
    reg_close,
    contact_name,
    contact_phone,
    contact_email,
    status,
  };
  activities.push(activity);
  res.status(201).json(activity);
});

// Get all activities
app.get("/activities", (req, res) => {
  res.json(activities);
});

// Get a single activity by id
app.get("/activities/:id", (req, res) => {
  const activity = activities.find((a) => a.id === parseInt(req.params.id));
  if (!activity) return res.status(404).json({ error: "Activity not found" });
  res.json(activity);
});

// Update an activity
app.put("/activities/:id", (req, res) => {
  const activity = activities.find((a) => a.id === parseInt(req.params.id));
  if (!activity) return res.status(404).json({ error: "Activity not found" });
  Object.assign(activity, req.body);
  res.json(activity);
});

// Delete an activity
app.delete("/activities/:id", (req, res) => {
  const index = activities.findIndex((a) => a.id === parseInt(req.params.id));
  if (index === -1)
    return res.status(404).json({ error: "Activity not found" });
  activities.splice(index, 1);
  res.status(204).send();
});

app.get("/", (req, res) => {
  res.send("Welcome to the SCI Competition Activities API!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

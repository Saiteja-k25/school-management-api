const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("School Management API is running");
});

const PORT = process.env.PORT || 3000;


app.post("/addSchool", (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // Validation
  if (!name || !address || latitude === undefined || longitude === undefined) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  if (typeof latitude !== "number" || typeof longitude !== "number") {
    return res.status(400).json({
      message: "Latitude and Longitude must be numbers"
    });
  }

  const query =
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";

  db.query(query, [name, address, latitude, longitude], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Database error"
      });
    }

    res.json({
      message: "School added successfully",
      schoolId: result.insertId
    });
  });
});


app.get("/listSchools", (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({
      message: "Latitude and Longitude are required"
    });
  }

  const userLat = parseFloat(latitude);
  const userLon = parseFloat(longitude);

  const query = "SELECT * FROM schools";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database error"
      });
    }

    // Calculate distance
    const schoolsWithDistance = results.map((school) => {
      const distance = Math.sqrt(
        Math.pow(userLat - school.latitude, 2) +
        Math.pow(userLon - school.longitude, 2)
      );

      return {
        ...school,
        distance: distance
      };
    });

    // Sort by distance
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.json(schoolsWithDistance);
  });
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
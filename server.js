require('dotenv').config();
const express = require('express');
const cors = require("cors");

const app = express();

const { sequelize } = require('./config/db');
const authRoutes = require('./Routes/auth');
const job=require("./utils/cron.js")
// ✅ Middleware
app.use(express.json());

// ✅ CORS (BEFORE routes)
app.use(cors({
  origin: "https://e-commmerce-frontend-theta.vercel.app", 
  credentials: true
}));

app.use('/api/users', authRoutes);

app.get("/health", (req, res) => {
  res.send("Auth API working ✅");
});

const PORT = process.env.PORT || 5000;

// Connect DB and start server
sequelize.sync()
  .then(() => {
    console.log("SQLite connected ");
      if (process.env.NODE_ENV === "production") {
      job.start();
    }
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} `);
    });
  })
  .catch((err) => {
    console.log("DB Error ❌", err);
  });
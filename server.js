require('dotenv').config();
const express = require('express');
const cors = require("cors");

const app = express();

const { sequelize } = require('./config/db');
const authRoutes = require('./Routes/auth');

// ✅ Middleware
app.use(express.json());

// ✅ CORS (BEFORE routes)
app.use(cors({
  origin: "https://e-commmerce-frontend-qobl.vercel.app/", 
  credentials: true
}));

app.use('/api/users', authRoutes);

app.get("/", (req, res) => {
  res.send("Auth API working ✅");
});

const PORT = process.env.PORT || 5000;

// Connect DB and start server
sequelize.sync()
  .then(() => {
    console.log("SQLite connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.log("DB Error ❌", err);
  });
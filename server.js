const express = require ("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app=express()
dotenv.config();

app.use(express.json()); // Should be placed before routes


const PORT = process.env.PORT || 3001;

const startServer = async () => {
    try {
      await connectDb(); // Ensure DB connection before starting the server
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } catch (error) {
      console.error("Server failed to start:", error);
    }
  };
  
  startServer();
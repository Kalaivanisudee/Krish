const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
require("dotenv").config();
dbConnection();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
res.send("Hello World");
})

app.use('/api/auth', authRoutes);
app.use('/api/auth/profile', profileRoutes);

app.listen(PORT,()=>{
    console.log("Server Running on...",`http://localhost:${PORT}`)
})

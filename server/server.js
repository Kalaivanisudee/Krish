const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/db");
require("dotenv").config();

dbConnection();

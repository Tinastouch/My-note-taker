const express = require("express");
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");
const app = express();
const PORT = process.env.PORT || 8009;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use("/", htmlRoutes);
app.use("/api", apiRoutes);

// Start to Listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
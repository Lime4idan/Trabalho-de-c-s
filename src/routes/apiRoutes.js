const express = require("express");

const router = express.Router();

// Rota pública de metadados da API
router.get("/status", (req, res) => {
  res.status(200).json({
    versao: "2.0.0",
    status: "online"
  });
});

module.exports = router;

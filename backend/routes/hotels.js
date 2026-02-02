import express from "express";
import fs from "fs";

const router = express.Router();
const file = "./data/hotels.json";

router.get("/", (req, res) => {
  const hotels = JSON.parse(fs.readFileSync(file));
  res.json(hotels);
});

export default router;

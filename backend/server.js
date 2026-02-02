import express from "express";
import cors from "cors";
import hotelsRoutes from "./routes/hotels.js";
import bookingsRoutes from "./routes/bookings.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/hotels", hotelsRoutes);
app.use("/bookings", bookingsRoutes);

app.listen(5000, () => console.log("Backend running on port 5000"));

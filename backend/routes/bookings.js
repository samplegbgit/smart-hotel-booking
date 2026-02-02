import express from "express";
import fs from "fs";

const router = express.Router();
const file = "./data/bookings.json";

router.post("/", (req, res) => {
  const bookings = JSON.parse(fs.readFileSync(file));
  bookings.push(req.body);
  fs.writeFileSync(file, JSON.stringify(bookings, null, 2));
  res.status(201).json({ message: "Booking confirmed" });
});

router.get("/", (req, res) => {
  const bookings = JSON.parse(fs.readFileSync(file));
  res.json(bookings);
});
router.delete("/cancel/:bookingId", (req, res) => {
  const { bookingId } = req.params;

  const index = bookings.findIndex(
    (b) => b.id === parseInt(bookingId)
  );

  if (index === -1) {
    return res.status(404).json({ error: "Booking not found" });
  }

  const canceledBooking = bookings[index];

  const hotel = hotels.find((h) => h.id === canceledBooking.hotelId);
  if (hotel) {
    hotel.roomsAvailable += 1;
  }

  bookings.splice(index, 1);

  res.json({
    message: "Booking cancelled successfully",
    bookings
  });
});


export default router;

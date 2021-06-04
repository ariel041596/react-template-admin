import asyncHandler from "express-async-handler";
import Event from "../models/eventModel.js";

// @desc Add event
// @route POST /api/events
// @access Private
const addEvent = asyncHandler(async (req, res) => {
  const { title, start, end } = req.body;
  if (!title) {
    res.status(400);
    throw new Error("No event added");
    return;
  } else {
    const event = new Event({
      title,
      start,
      end,
      user: req.user._id,
    });
    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  }
});

// @desc GET all Events
// @route GET /api/events
// @access Private/Admin
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({}).populate("user", "id firstName");
  if (events.length) {
    res.json(events);
  } else {
    res.status(404);
    throw new Error("No Events");
  }
});

export { addEvent, getEvents };

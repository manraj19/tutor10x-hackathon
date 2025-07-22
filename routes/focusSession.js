const express = require("express");
const router = express.Router();
const FocusSession = require("../models/session");

// Simulated FFmpeg task
function simulateFFmpegTask(filePath) {
  return new Promise((resolve) => {
    console.log(`Simulating FFmpeg on ${filePath}`);
    setTimeout(() => resolve(true), 2000);
  });
}

router.post("/log-session", async (req, res) => {
  const { userId, startTime, endTime, mediaFilePath } = req.body;

  if (!userId || !startTime || !endTime || !mediaFilePath) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    await simulateFFmpegTask(mediaFilePath);

    const session = new FocusSession({
      userId,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      mediaFilePath,
      processed: true,
    });

    await session.save();

    res.status(201).json({
      success: true,
      message: "Focus session logged and processed",
      sessionId: session._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;

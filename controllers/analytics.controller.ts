import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import Analytics, { IAnalytics } from "../models/analytics.model";

const router = Router();

// Create a new analytics entry
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const newAnalytics: IAnalytics = new Analytics(req.body);
    await newAnalytics.save();

    return res.status(201).json(newAnalytics);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// Get all analytics entries
router.get("/", authMiddleware, async (_req: Request, res: Response) => {
  try {
    const analyticsEntries = await Analytics.find();

    return res.json(analyticsEntries);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Get an analytics entry by ID
router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const analyticsEntry = await Analytics.findById(req.params.id);
    if (!analyticsEntry) {
      return res.status(404).json({ message: "Analytics entry not found" });
    }

    return res.json(analyticsEntry);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Get analytics entries by user ID
router.get(
  "/user/:userId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const userAnalytics = await Analytics.find({ userId });
      if (!userAnalytics || userAnalytics.length === 0) {
        return res
          .status(404)
          .json({ message: "No analytics data found for this user" });
      }

      return res.json(userAnalytics);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// Update an analytics entry by ID
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const updatedAnalytics = await Analytics.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAnalytics) {
      return res.status(404).json({ message: "Analytics entry not found" });
    }

    return res.json(updatedAnalytics);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// Delete an analytics entry by ID
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const deletedAnalytics = await Analytics.findByIdAndDelete(req.params.id);
    if (!deletedAnalytics) {
      return res.status(404).json({ message: "Analytics entry not found" });
    }

    return res.json({ message: "Analytics entry deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;

import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import ContentCalendar, {
  IContentCalendar,
} from "../models/contentCalendar.model";

const router = Router();

// Create a new content calendar entry
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const newContentCalendar: IContentCalendar = new ContentCalendar(req.body);
    await newContentCalendar.save();
    return res.status(201).json(newContentCalendar);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

// Get all content calendar entries
router.get("/", authMiddleware, async (_req: Request, res: Response) => {
  try {
    const contentCalendarEntries = await ContentCalendar.find();
    return res.json(contentCalendarEntries);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

// Get a content calendar entry by ID
router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const contentCalendarEntry = await ContentCalendar.findById(req.params.id);
    if (!contentCalendarEntry) {
      return res
        .status(404)
        .json({ error: "Content calendar entry not found" });
    }
    return res.json(contentCalendarEntry);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

// Get content calendar entries by user ID
router.get(
  "/user/:userId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const userContentCalendar = await ContentCalendar.find({ userId });
      if (!userContentCalendar || userContentCalendar.length === 0) {
        return res
          .status(404)
          .json({ error: "No content calendar entries found for this user" });
      }
      return res.json(userContentCalendar);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// Update a content calendar entry by ID
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const updatedContentCalendar = await ContentCalendar.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedContentCalendar) {
      return res
        .status(404)
        .json({ error: "Content calendar entry not found" });
    }
    return res.json(updatedContentCalendar);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

// Delete a content calendar entry by ID
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const deletedContentCalendar = await ContentCalendar.findByIdAndDelete(
      req.params.id
    );
    if (!deletedContentCalendar) {
      return res
        .status(404)
        .json({ error: "Content calendar entry not found" });
    }
    return res.json({ message: "Content calendar entry deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;

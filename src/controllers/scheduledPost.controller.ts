import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import ScheduledPost, { IScheduledPost } from "../models/scheduledPost.model";

const router = Router();

// Create a new scheduled post
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const newScheduledPost: IScheduledPost = new ScheduledPost(req.body);
    await newScheduledPost.save();
    return res.status(201).json(newScheduledPost);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// Get all scheduled posts
router.get("/", authMiddleware, async (_req: Request, res: Response) => {
  try {
    const scheduledPosts = await ScheduledPost.find();
    return res.json(scheduledPosts);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// Get scheduled posts by user ID
router.get(
  "/user/:userId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const userScheduledPosts = await ScheduledPost.find({ userId });
      if (!userScheduledPosts || userScheduledPosts.length === 0) {
        return res
          .status(404)
          .json({ error: "No scheduled posts found for this user" });
      }
      return res.json(userScheduledPosts);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
);

// Get a scheduled post by ID
router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const scheduledPost = await ScheduledPost.findById(req.params.id);
    if (!scheduledPost) {
      return res.status(404).json({ error: "Scheduled post not found" });
    }
    return res.json(scheduledPost);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// Update a scheduled post by ID
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const updatedScheduledPost = await ScheduledPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedScheduledPost) {
      return res.status(404).json({ error: "Scheduled post not found" });
    }
    return res.json(updatedScheduledPost);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// Delete a scheduled post by ID
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const deletedScheduledPost = await ScheduledPost.findByIdAndDelete(
      req.params.id
    );
    if (!deletedScheduledPost) {
      return res.status(404).json({ error: "Scheduled post not found" });
    }
    return res.json({ message: "Scheduled post deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;

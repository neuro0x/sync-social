import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import PostHistory, { IPostHistory } from "../models/postHistory.model";

const router = Router();

// Create a new post history
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const newPostHistory: IPostHistory = new PostHistory(req.body);
    await newPostHistory.save();

    return res.status(201).json(newPostHistory);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// Get all post histories
router.get("/", authMiddleware, async (_req: Request, res: Response) => {
  try {
    const postHistories = await PostHistory.find();

    return res.json(postHistories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Get post histories by user ID
router.get(
  "/user/:userId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const userPostHistories = await PostHistory.find({ userId });
      if (!userPostHistories || userPostHistories.length === 0) {
        return res
          .status(404)
          .json({ message: "No post histories found for this user" });
      }

      return res.json(userPostHistories);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// Get a post history by ID
router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const postHistory = await PostHistory.findById(req.params.id);
    if (!postHistory) {
      return res.status(404).json({ message: "Post history not found" });
    }

    return res.json(postHistory);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Update a post history by ID
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const updatedPostHistory = await PostHistory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPostHistory) {
      return res.status(404).json({ message: "Post history not found" });
    }

    return res.json(updatedPostHistory);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// Delete a post history by ID
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const deletedPostHistory = await PostHistory.findByIdAndDelete(
      req.params.id
    );
    if (!deletedPostHistory) {
      return res.status(404).json({ message: "Post history not found" });
    }

    return res.json({ message: "Post history deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;

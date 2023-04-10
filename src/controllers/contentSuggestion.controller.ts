import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import ContentSuggestion, {
  IContentSuggestion,
} from "../models/contentSuggestion.model";

const router = Router();

// Create a new content suggestion
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const newContentSuggestion: IContentSuggestion = new ContentSuggestion(
      req.body
    );
    await newContentSuggestion.save();
    return res.status(201).json(newContentSuggestion);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

// Get all content suggestions
router.get("/", authMiddleware, async (_req: Request, res: Response) => {
  try {
    const contentSuggestions = await ContentSuggestion.find();
    return res.json(contentSuggestions);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

// Get content suggestions by user ID
router.get(
  "/user/:userId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const userContentSuggestions = await ContentSuggestion.find({ userId });
      if (!userContentSuggestions || userContentSuggestions.length === 0) {
        return res
          .status(404)
          .json({ error: "No content suggestions found for this user" });
      }
      return res.json(userContentSuggestions);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// Get a content suggestion by ID
router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const contentSuggestion = await ContentSuggestion.findById(req.params.id);
    if (!contentSuggestion) {
      return res.status(404).json({ error: "Content suggestion not found" });
    }
    return res.json(contentSuggestion);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

// Update a content suggestion by ID
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const updatedContentSuggestion = await ContentSuggestion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedContentSuggestion) {
      return res.status(404).json({ error: "Content suggestion not found" });
    }
    return res.json(updatedContentSuggestion);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

// Delete a content suggestion by ID
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const deletedContentSuggestion = await ContentSuggestion.findByIdAndDelete(
      req.params.id
    );
    if (!deletedContentSuggestion) {
      return res.status(404).json({ error: "Content suggestion not found" });
    }
    return res.json({ message: "Content suggestion deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;

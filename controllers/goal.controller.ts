import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import Goal, { IGoal } from "../models/goal.model";

const router = Router();

// Create a new goal
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const newGoal: IGoal = new Goal(req.body);
    await newGoal.save();
    return res.status(201).json(newGoal);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// Get all goals
router.get("/", authMiddleware, async (_req: Request, res: Response) => {
  try {
    const goals = await Goal.find();

    return res.json(goals);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Get goals by user ID
router.get(
  "/user/:userId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const userGoals = await Goal.find({ userId });
      if (!userGoals || userGoals.length === 0) {
        return res
          .status(404)
          .json({ message: "No goals found for this user" });
      }

      return res.json(userGoals);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// Get a goal by ID
router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    return res.json(goal);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Update a goal by ID
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedGoal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    return res.json(updatedGoal);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// Delete a goal by ID
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
    if (!deletedGoal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    return res.json({ message: "Goal deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;

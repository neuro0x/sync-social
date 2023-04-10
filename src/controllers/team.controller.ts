import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import Team, { ITeam } from "../models/team.model";

const router = Router();

// Create a new team
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const newTeam: ITeam = new Team(req.body);
    await newTeam.save();
    return res.status(201).json(newTeam);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// Get all teams
router.get("/", authMiddleware, async (_req: Request, res: Response) => {
  try {
    const teams = await Team.find();
    return res.json(teams);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// Get teams by user ID
router.get(
  "/user/:userId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const userTeams = await Team.find({ userId });
      if (!userTeams || userTeams.length === 0) {
        return res.status(404).json({ error: "No teams found for this user" });
      }
      return res.json(userTeams);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
);

// Get a team by ID
router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    return res.json(team);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// Update a team by ID
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTeam) {
      return res.status(404).json({ error: "Team not found" });
    }
    return res.json(updatedTeam);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// Delete a team by ID
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const deletedTeam = await Team.findByIdAndDelete(req.params.id);
    if (!deletedTeam) {
      return res.status(404).json({ error: "Team not found" });
    }
    return res.json({ message: "Team deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;

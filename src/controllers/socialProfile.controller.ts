import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import SocialProfile, { ISocialProfile } from "../models/socialProfile.model";

const router = Router();

// Create a new social profile
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const newSocialProfile: ISocialProfile = new SocialProfile(req.body);
    await newSocialProfile.save();

    return res.status(201).json(newSocialProfile);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// Get all social profiles
router.get("/", authMiddleware, async (_req: Request, res: Response) => {
  try {
    const socialProfiles = await SocialProfile.find();

    return res.json(socialProfiles);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// Get a social profile by ID
router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const socialProfile = await SocialProfile.findById(req.params.id);
    if (!socialProfile) {
      return res.status(404).json({ error: "Social profile not found" });
    }

    return res.json(socialProfile);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// Get social profiles by user ID
router.get(
  "/user/:userId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const userSocialProfiles = await SocialProfile.find({ userId });
      if (!userSocialProfiles || userSocialProfiles.length === 0) {
        return res
          .status(404)
          .json({ error: "No social profiles found for this user" });
      }

      return res.json(userSocialProfiles);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
);

// Update a social profile by ID
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const updatedSocialProfile = await SocialProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSocialProfile) {
      return res.status(404).json({ error: "Social profile not found" });
    }

    return res.json(updatedSocialProfile);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// Delete a social profile by ID
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const deletedSocialProfile = await SocialProfile.findByIdAndDelete(
      req.params.id
    );
    if (!deletedSocialProfile) {
      return res.status(404).json({ error: "Social profile not found" });
    }

    return res.json({ message: "Social profile deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;

import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import CustomAsset, { ICustomAsset } from "../models/customAsset.model";

const router = Router();

// Create a new custom asset
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const newCustomAsset: ICustomAsset = new CustomAsset(req.body);
    await newCustomAsset.save();
    return res.status(201).json(newCustomAsset);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

// Get all custom assets
router.get("/", authMiddleware, async (_req: Request, res: Response) => {
  try {
    const customAssets = await CustomAsset.find();

    return res.json(customAssets);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

// Get custom assets by user ID
router.get(
  "/user/:userId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const userCustomAssets = await CustomAsset.find({ userId });
      if (!userCustomAssets || userCustomAssets.length === 0) {
        return res
          .status(404)
          .json({ error: "No custom assets found for this user" });
      }

      return res.json(userCustomAssets);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// Get a custom asset by ID
router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const customAsset = await CustomAsset.findById(req.params.id);
    if (!customAsset) {
      return res.status(404).json({ error: "Custom asset not found" });
    }

    return res.json(customAsset);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

// Update a custom asset by ID
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const updatedCustomAsset = await CustomAsset.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCustomAsset) {
      return res.status(404).json({ error: "Custom asset not found" });
    }

    return res.json(updatedCustomAsset);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

// Delete a custom asset by ID
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const deletedCustomAsset = await CustomAsset.findByIdAndDelete(
      req.params.id
    );
    if (!deletedCustomAsset) {
      return res.status(404).json({ error: "Custom asset not found" });
    }

    return res.json({ message: "Custom asset deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;

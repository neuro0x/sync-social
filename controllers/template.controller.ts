import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import Template, { ITemplate } from "../models/template.model";

const router = Router();

// Create a new template
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const newTemplate: ITemplate = new Template(req.body);
    await newTemplate.save();
    return res.status(201).json(newTemplate);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// Get all templates
router.get("/", authMiddleware, async (_req: Request, res: Response) => {
  try {
    const templates = await Template.find();
    return res.json(templates);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Get templates by user ID
router.get(
  "/user/:userId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const userTemplates = await Template.find({ userId });
      if (!userTemplates || userTemplates.length === 0) {
        return res
          .status(404)
          .json({ message: "No templates found for this user" });
      }
      return res.json(userTemplates);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// Get a template by ID
router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }
    return res.json(template);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Update a template by ID
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const updatedTemplate = await Template.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTemplate) {
      return res.status(404).json({ message: "Template not found" });
    }
    return res.json(updatedTemplate);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// Delete a template by ID
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const deletedTemplate = await Template.findByIdAndDelete(req.params.id);
    if (!deletedTemplate) {
      return res.status(404).json({ message: "Template not found" });
    }
    return res.json({ message: "Template deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;

import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import Notification, { INotification } from "../models/notification.model";

const router = Router();

// Create a new notification
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const newNotification: INotification = new Notification(req.body);
    await newNotification.save();
    return res.status(201).json(newNotification);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// Get all notifications
router.get("/", authMiddleware, async (_req: Request, res: Response) => {
  try {
    const notifications = await Notification.find();

    return res.json(notifications);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Get notifications by user ID
router.get(
  "/user/:userId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const userNotifications = await Notification.find({ userId });
      if (!userNotifications || userNotifications.length === 0) {
        return res
          .status(404)
          .json({ message: "No notifications found for this user" });
      }

      return res.json(userNotifications);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// Get a notification by ID
router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    return res.json(notification);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Update a notification by ID
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    return res.json(updatedNotification);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// Delete a notification by ID
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const deletedNotification = await Notification.findByIdAndDelete(
      req.params.id
    );
    if (!deletedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    return res.json({ message: "Notification deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;

import mongoose from "mongoose";
import casual from "casual";
import User, { IUser } from "../models/user.model";
import SocialProfile, { ISocialProfile } from "../models/socialProfile.model";
import Analytics, { IAnalytics } from "../models/analytics.model";
import ContentCalendar, {
  IContentCalendar,
} from "../models/contentCalendar.model";
import ContentSuggestion, {
  IContentSuggestion,
} from "../models/contentSuggestion.model";
import CustomAsset, { ICustomAsset } from "../models/customAsset.model";
import Goal, { IGoal } from "../models/goal.model";
import Notification, { INotification } from "../models/notification.model";
import PostHistory, { IPostHistory } from "../models/postHistory.model";
import ScheduledPost, { IScheduledPost } from "../models/scheduledPost.model";
import Team, { ITeam } from "../models/team.model";
import Template, { ITemplate } from "../models/template.model";
import UserRole, { IUserRole } from "../models/userRole.model";

mongoose.connect(process.env.MONGODB_URI || "");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
  console.log("Connected to MongoDB!");

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    SocialProfile.deleteMany({}),
    Analytics.deleteMany({}),
    ContentCalendar.deleteMany({}),
    ContentSuggestion.deleteMany({}),
    CustomAsset.deleteMany({}),
    Goal.deleteMany({}),
    Notification.deleteMany({}),
    PostHistory.deleteMany({}),
    ScheduledPost.deleteMany({}),
    Team.deleteMany({}),
    Template.deleteMany({}),
    UserRole.deleteMany({}),
  ]);

  console.log("DB cleared.");

  // Generate mock data
  const users: IUser[] = [];
  const socialProfiles: ISocialProfile[] = [];
  const analytics: IAnalytics[] = [];
  const contentCalendars: IContentCalendar[] = [];
  const contentSuggestions: IContentSuggestion[] = [];
  const customAssets: ICustomAsset[] = [];
  const goals: IGoal[] = [];
  const notifications: INotification[] = [];
  const postHistories: IPostHistory[] = [];
  const scheduledPosts: IScheduledPost[] = [];
  const teams: ITeam[] = [];
  const templates: ITemplate[] = [];
  const userRoles: IUserRole[] = [];

  // Create users
  for (let i = 0; i < 10; i++) {
    const user = new User({
      email: casual.email,
      password: casual.password,
      name: casual.full_name,
      industry: casual.random_element([
        "Technology",
        "Finance",
        "Healthcare",
        "Entertainment",
      ]),
      targetAudience: casual.random_element([
        "Adults",
        "Teenagers",
        "Seniors",
        "Kids",
      ]),
    });
    users.push(await user.save());
  }

  console.log(`${users.length} created.`);

  // Create other mock data based on the created users
  for (const user of users) {
    // SocialProfiles
    const socialProfile = new SocialProfile({
      userId: user._id,
      platform: casual.random_element([
        "Facebook",
        "Instagram",
        "Twitter",
        "YouTube",
      ]),
      accessToken: casual.uuid,
      refreshToken: casual.uuid,
      expiresIn: casual.date("YYYY-MM-DD"),
      profileId: casual.uuid,
      username: casual.username,
    });
    socialProfiles.push(await socialProfile.save());

    console.log(`${socialProfiles.length} created for user ${user._id}.`);

    // ContentCalendars
    const contentCalendar = new ContentCalendar({
      userId: user._id,
      name: casual.title,
    });
    contentCalendars.push(await contentCalendar.save());

    console.log(`${contentCalendars.length} created for user ${user._id}.`);

    // ContentSuggestions
    const contentSuggestion = new ContentSuggestion({
      userId: user._id,
      topic: casual.title,
      content: casual.sentences(3),
      category: casual.random_element([
        "Marketing",
        "Sales",
        "Customer Support",
        "Product",
      ]),
    });
    contentSuggestions.push(await contentSuggestion.save());

    console.log(`${contentSuggestions.length} created for user ${user._id}.`);

    // CustomAssets
    const customAsset = new CustomAsset({
      userId: user._id,
      name: casual.title,
      url: casual.url,
      type: casual.random_element(["image", "icon", "font", "video"]),
    });
    customAssets.push(await customAsset.save());

    console.log(`${customAssets.length} created for user ${user._id}.`);

    // Goals
    const goal = new Goal({
      userId: user._id,
      metric: casual.random_element(["likes", "comments", "shares", "views"]),
      targetValue: casual.integer(1, 10000),
      startDate: casual.date("YYYY-MM-DD"),
      endDate: casual.date("YYYY-MM-DD"),
      progress: casual.integer(0, 100),
    });
    goals.push(await goal.save());

    console.log(`${goals.length} created for user ${user._id}.`);

    // Notifications
    const notification = new Notification({
      userId: user._id,
      message: casual.sentences(1),
      type: casual.random_element(["Info", "Warning", "Error", "Success"]),
      read: casual.boolean,
      createdAt: casual.date("YYYY-MM-DD"),
    });
    notifications.push(await notification.save());

    console.log(`${notifications.length} created for user ${user._id}.`);

    // ScheduledPosts
    const scheduledPost = new ScheduledPost({
      userId: user._id,
      socialProfileId: socialProfile._id,
      platform: socialProfile.platform,
      content: casual.sentences(3),
      scheduledTime: casual.date("YYYY-MM-DD"),
    });
    scheduledPosts.push(await scheduledPost.save());

    console.log(`${scheduledPosts.length} created for user ${user._id}.`);

    // PostHistories
    const postHistory = new PostHistory({
      userId: user._id,
      socialProfileId: socialProfile._id,
      postId: scheduledPost._id,
      platform: socialProfile.platform,
      content: casual.sentences(3),
      createdAt: casual.date("YYYY-MM-DD"),
      engagement: {
        likes: casual.integer(10, 1000),
        comments: casual.integer(5, 500),
        shares: casual.integer(1, 100),
      },
    });
    postHistories.push(await postHistory.save());

    console.log(`${postHistories.length} created for user ${user._id}.`);

    // Analytics
    const analytic = new Analytics({
      userId: user._id,
      platform: socialProfile.platform,
      postId: scheduledPost._id,
      engagement: {
        likes: casual.integer(10, 1000),
        comments: casual.integer(5, 500),
        shares: casual.integer(1, 100),
        retweets: casual.integer(1, 100),
        views: casual.integer(1000, 100000),
      },
      timestamp: casual.moment,
    });
    analytics.push(await analytic.save());

    console.log(`${analytics.length} created for user ${user._id}.`);

    // Teams
    const team = new Team({
      userId: user._id,
      name: casual.company_name,
      members: [
        {
          userId: casual.random_element(users)._id,
          role: casual.random_element(["Admin", "Editor", "Viewer"]),
        },
      ],
    });
    teams.push(await team.save());

    console.log(`${teams.length} created for user ${user._id}.`);

    // Templates
    const template = new Template({
      userId: user._id,
      name: casual.title,
      imageUrl: casual.url,
      platform: socialProfile.platform,
      type: casual.random_element(["image", "video", "carousel"]),
      content: casual.sentences(3),
      category: casual.random_element([
        "Marketing",
        "Sales",
        "Customer Support",
        "Product",
      ]),
    });
    templates.push(await template.save());

    console.log(`${templates.length} created for user ${user._id}.`);

    // UserRoles
    const userRole = new UserRole({
      userId: user._id,
      role: casual.random_element(["Admin", "Manager", "Editor", "Viewer"]),
    });
    userRoles.push(await userRole.save());

    console.log(`${userRoles.length} created for user ${user._id}.`);
  }
});

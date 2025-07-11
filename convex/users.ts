import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { redis } from "../src/lib/redis";

export const syncUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();

    if (existingUser) return;

    return await ctx.db.insert("users", {
      ...args,
      role: "candidate",
    });
  },
});

export const getUsers = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("User is not authenticated");

    const cacheKey = `users:${identity.subject}`;
    const cached = await redis.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    const users = await ctx.db.query("users").collect();

    await redis.set(cacheKey, JSON.stringify(users), "EX", 3600);

    return users;
  },
});

export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const cacheKey = `users:clerkId:${args.clerkId}`;
    const cached = await redis.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }
    const getUserByClerkIdQuery = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    await redis.set(cacheKey, JSON.stringify(getUserByClerkIdQuery), "EX", 3600);

    return getUserByClerkIdQuery!;
  },
});

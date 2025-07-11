import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { redis } from "../src/lib/redis";

export const addComment = mutation({
  args: {
    interviewId: v.id("interviews"),
    content: v.string(),
    rating: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const cacheKey = `comments:interviewId:${args.interviewId}`;
    const cached = await redis.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    const addCommentQuery = await ctx.db.insert("comments", {
      interviewId: args.interviewId,
      content: args.content,
      rating: args.rating,
      interviewerId: identity.subject,
    });

    await redis.set(cacheKey, JSON.stringify(addCommentQuery), "EX", 3600);

    return addCommentQuery!;
  },
});

export const getComments = query({
  args: { interviewId: v.id("interviews") },
  handler: async (ctx, args) => {

    const cacheKey = `comments:interviewId:${args.interviewId}`;
    const cached = await redis.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    const getCommentsQuery = await ctx.db
      .query("comments")
      .withIndex("by_interview_id", (q) => q.eq("interviewId", args.interviewId))
      .collect();

    await redis.set(cacheKey, JSON.stringify(getCommentsQuery), "EX", 3600);

    return getCommentsQuery!;
  },
});

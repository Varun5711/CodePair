import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { redis } from "../src/lib/redis";

export const getAllInterviews = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const cacheKey = `interviews:user:${identity.subject}`;
    const cached = await redis.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }
    const getAllInterviewQuery = await ctx.db.query("interviews").collect();

    await redis.set(cacheKey, JSON.stringify(getAllInterviewQuery), "EX", 3600);

    return getAllInterviewQuery;
  },
});

export const getMyInterviews = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const cachekey = `interviews:user:${identity.subject}`;
    const cached = await redis.get(cachekey);

    if (cached) {
      return JSON.parse(cached);
    }

    const getMyInterviewsQuery = await ctx.db
      .query("interviews")
      .withIndex("by_candidate_id", (q) =>
        q.eq("candidateId", identity.subject)
      )
      .collect();

    await redis.set(cachekey, JSON.stringify(getMyInterviewsQuery), "EX", 3600);

    return getMyInterviewsQuery!;
  },
});

export const getInterviewByStreamCallId = query({
  args: { streamCallId: v.string() },
  handler: async (ctx, args) => {

    const cacheKey = `interview:streamCallId:${args.streamCallId}`;
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const getInterviewByStreamCallIdQuery = await ctx.db
      .query("interviews")
      .withIndex("by_stream_call_id", (q) =>
        q.eq("streamCallId", args.streamCallId)
      )
      .first();

    await redis.set(cacheKey, JSON.stringify(getInterviewByStreamCallIdQuery), "EX", 3600);

    return getInterviewByStreamCallIdQuery!;
  },

    
});

export const createInterview = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    startTime: v.number(),
    status: v.string(),
    streamCallId: v.string(),
    candidateId: v.string(),
    interviewerIds: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    return await ctx.db.insert("interviews", {
      ...args,
    });
  },
});

export const updateInterviewStatus = mutation({
  args: {
    id: v.id("interviews"),
    status: v.string(),
  },
  handler: async (ctx, args) => {

    const cacheKey = `interview:${args.id}`;
    await redis.del(cacheKey);

    const updateInterviewStatusQuery = await ctx.db.patch(args.id, {
      status: args.status,
      ...(args.status === "completed" ? { endTime: Date.now() } : {}),
    });

    return updateInterviewStatusQuery!;
  },
});

import { NextApiRequest, NextApiResponse } from "next";
import { cachedPosts } from "@misc/blog";
import { Data, QueryResult } from "@interfaces/types";

const blogPosts = cachedPosts;

function checker(query: string): QueryResult[] {
  query = decodeURIComponent(query).toLowerCase();
  if (query.charAt(0) == "#") {
    query = query.replace("#", "");
    return blogPosts.filter((post: any) => post.tag.toString().includes(query));
  } else {
    return blogPosts.filter((post: any) =>
      post.title.toLowerCase().includes(query)
    );
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): void {
  const results = req.query.q ? checker(req.query.q.toString()) : blogPosts;
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ results }));
}
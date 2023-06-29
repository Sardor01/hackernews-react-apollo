interface Vote {
  id: string;
  user: { id: string };
}

export interface FeedLink {
  id: string;
  description: string;
  url: string;
  createdAt: string;
  votes: Vote[];
  postedBy?: { id: string; email: string; name: string };
}

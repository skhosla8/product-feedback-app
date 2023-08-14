export interface FeedbackEntry {
    i?: number,
    id: number,
    title: string,
    category: string,
    upvotes: number,
    status: string,
    description: string,
    comments?: Array<object>
  }
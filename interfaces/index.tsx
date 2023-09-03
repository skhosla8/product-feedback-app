import { StaticImageData } from "next/image"

export interface FeedbackEntry {
  i?: number,
  id: number,
  title: string,
  category: string,
  upvotes: number,
  status: string,
  description: string,
  comments?: Array<FeedbackEntryComment>
}

export interface FeedbackEntryComment {
  i?: number,
  id: number,
  content: string,
  user: FeedbackEntryUser,
  replies?: Array<FeedbackEntryReply>,
  currentEntry?: object
}

export interface FeedbackEntryUser {
  image: string | StaticImageData,
  name: string,
  username: string

}

export interface FeedbackEntryReply {
  content: string,
  replyingTo: string,
  user: FeedbackEntryUser
}
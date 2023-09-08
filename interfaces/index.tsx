import { StaticImageData } from "next/image"
import { Dispatch, SetStateAction } from "react";

export interface FeedbackEntry {
  i?: number,
  id: number,
  title: string,
  category: string,
  upvotes: number,
  isUpvoted?: boolean,
  upvoteBtnColor: string,
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
}

export interface FeedbackEntryUser {
  image: string | StaticImageData,
  name: string,
  username: string

}

export interface FeedbackEntryReply {
  i?: number,
  commentId?: number,
  content: string,
  replyingTo?: string,
  user: FeedbackEntryUser,
  username?: string,
  isReplyToComment?: boolean,
  setIsReplyToComment?: Dispatch<SetStateAction<boolean>>,
  repliesToReplies?: Array<FeedbackEntryReply>
}

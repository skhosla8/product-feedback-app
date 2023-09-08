// Base Imports
import React, { FC, useState } from "react";
import { FeedbackEntryComment, FeedbackEntryReply } from "@/interfaces";
// Components
import Image from "next/image";
import FeedbackReply from "./FeedbackReply";
import ReplyBox from "./ReplyBox";

const FeedbackComment: FC<FeedbackEntryComment> = ({
    i,
    id,
    content,
    user,
    replies
}) => {
    const [isOpenReplyBox, setIsOpenReplyBox] = useState(false);
    const [reply, setReply] = useState('');
    const [isReplyToComment, setIsReplyToComment] = useState(true);

    const currentEntry = JSON.parse(localStorage.getItem('current-feedback-entry') || '')!;

    const commentId = id;

    const toggleReplyBox = () => {
        setIsOpenReplyBox(!isOpenReplyBox);
        setIsReplyToComment(true);

        !isOpenReplyBox && setReply('');
    }

    return (
        <div key={i} style={{ display: "flex", margin: "0 2rem 2rem", paddingBottom: "2rem", borderBottom: i !== (currentEntry.comments?.length - 1) ? "0.1rem solid rgba(151, 151, 151, 0.3)" : "none" }}>
            <div>
                <Image
                    src={user?.image}
                    alt="comment-user"
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%", marginRight: "1.7rem" }}
                />

                {replies && (
                    <div style={{ width: "25px", height: `${30 * (replies.length)}%`, borderRight: "0.1rem solid rgba(151, 151, 151, 0.3)", marginTop: "1.1rem" }}></div>
                )}
            </div>

            <div style={{ fontSize: "0.8rem", width: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ color: "#3A4374", fontWeight: "bold", fontSize: "0.95rem" }}>
                        {user?.name}
                    </div>

                    <button
                        style={{ cursor: "pointer", outline: "none", color: "#4661E6", fontWeight: "bold", backgroundColor: "#ffffff", border: "none" }}
                        onClick={toggleReplyBox}
                    >
                        Reply
                    </button>
                </div>

                <div style={{ color: "#647196", marginTop: "0.2rem" }}>{`@${user?.username}`}</div>

                <div style={{ color: "#647196", marginTop: "1.4rem", lineHeight: "20px" }}>
                    {content}
                </div>

                {isOpenReplyBox &&
                    <ReplyBox 
                      reply={reply}
                      setReply={setReply}
                      isReplyToComment={isReplyToComment}
                      id={id}
                      username={user.username}
                      currentEntryId={currentEntry.id}
                      setIsOpenReplyBox={setIsOpenReplyBox}
                    />
                }

                {replies &&
                    replies?.map((reply: FeedbackEntryReply, i: number) => (
                        <FeedbackReply
                            key={i}
                            i={i}
                            commentId={commentId}
                            content={reply.content}
                            replyingTo={reply.replyingTo}
                            username={user.username}
                            user={reply.user}
                            isReplyToComment={isReplyToComment}
                            setIsReplyToComment={setIsReplyToComment}
                        />
                    ))}
            </div>
        </div>
    )
}

export default FeedbackComment;

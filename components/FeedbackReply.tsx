// Base Imports 
import React, { FC, useState } from 'react';
import { FeedbackEntryReply } from '@/interfaces';
// Components
import Image from "next/image";
import ReplyBox from './ReplyBox';

const FeedbackReply: FC<FeedbackEntryReply> = ({ i, commentId, content, replyingTo, username, user, isReplyToComment, setIsReplyToComment }) => {
    const [isOpenReplyBox, setIsOpenReplyBox] = useState(false);
    const [reply, setReply] = useState('');

    const toggleReplyBox = () => {
        setIsOpenReplyBox(!isOpenReplyBox);

        !isOpenReplyBox && setReply('');

       setIsReplyToComment!(false);
    }

    return (
        <div key={i} style={{ display: "flex", marginTop: "2rem" }}>
            <Image
                src={user?.image}
                alt="reply-user"
                width={40}
                height={40}
                style={{ borderRadius: "50%", marginRight: "1.5rem" }}
            />

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

                <div style={{ color: "#647196", marginTop: "0.2rem" }}>
                    {`@${user.username}`}
                </div>

                <div style={{ color: "#647196", marginTop: "1.4rem", lineHeight: "20px" }}>
                    <span style={{ color: "#AD1FEA", fontWeight: "bold", marginRight: "0.5rem", fontSize: "0.95rem" }}>
                        {`@${username}`}
                    </span>

                    {content}
                </div>

                {isOpenReplyBox &&
                    <ReplyBox
                        reply={reply}
                        setReply={setReply}
                        setIsOpenReplyBox={setIsOpenReplyBox}
                        user={user}
                        isReplyToComment={isReplyToComment}
                        replyingTo={replyingTo}
                        commentId={commentId}

                    />
                }
            </div>
        </div>
    )
}

export default FeedbackReply;
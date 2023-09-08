// Base Imports 
import React, { FC, Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { addReplyToComment } from '@/store/slices/feedbackSlice';
import { FeedbackEntryUser } from '@/interfaces';
// Components 
import { Textarea } from "@nextui-org/react";
// Icons/Images
import imageZena from '../public/image-zena.png';

interface ReplyBoxProps {
    reply: string,
    setReply: Dispatch<SetStateAction<string>>,
    isReplyToComment?: boolean,
    id?: number,
    username?: string,
    currentEntryId?: number,
    setIsOpenReplyBox?: Dispatch<SetStateAction<boolean>>,
    user?: FeedbackEntryUser,
    replyingTo?: string,
    commentId?: number
}
const ReplyBox: FC<ReplyBoxProps> = ({
    reply,
    setReply,
    isReplyToComment,
    id,
    currentEntryId,
    setIsOpenReplyBox,
    replyingTo,
    user,
    commentId
}) => {
    const dispatch = useDispatch();

    const postReplyToComment = () => {
        let commentUsername = replyingTo;
        let replyingToUsername = user?.username;
        let username = isReplyToComment ? commentUsername : replyingToUsername;
        let ID = isReplyToComment ? id : commentId;

        let newReply = {
            "content": reply,
            "replyingTo": username,
            "user": {
                "image": imageZena,
                "name": "Zena Kelley",
                "username": "velvetround"
            }
        }

        dispatch(addReplyToComment({ currentEntryId, ID, newReply }));
        setReply('');
        setIsOpenReplyBox!(false);
    };

    return (
        <div style={{ display: "flex", alignItems: "center", height: "70px", margin: "2rem 0 0.5rem" }}>
            <Textarea
                variant="flat"
                minRows={4}
                maxRows={8}
                placeholder="Type your reply here"
                value={reply}
                onValueChange={setReply}
                style={{
                    fontFamily: "Arial",
                    fontSize: "0.8rem",
                    width: "400px",
                    margin: "1.5rem 0",
                    color: "#8C92B3",
                    backgroundColor: "#F7F8FD",
                    border: "none",
                    borderRadius: "12px",
                    padding: "1rem 0 0 1rem",
                    resize: "none",
                }}
            />

            <button
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "120px", backgroundColor: "#AD1FEA", color: "#FFFFFF", fontSize: "0.8rem", fontWeight: "bold", border: "none", padding: "0.8rem 1.2rem", borderRadius: "8px", marginLeft: "1.5rem", cursor: "pointer" }}
                onClick={postReplyToComment}
            >
                Post Reply
            </button>
        </div>
    )
}

export default ReplyBox;
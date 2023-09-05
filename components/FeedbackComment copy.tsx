// Base Imports
import React, { FC, useState } from "react";
import { FeedbackEntryComment, FeedbackEntryReply } from "@/interfaces";
import { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { addReplyToComment } from '@/store/slices/feedbackSlice';
// Components
import Image from "next/image";
import { Textarea } from "@nextui-org/react";
// Icons/Images
import imageZena from '../public/image-zena.png';

const FeedbackComment: FC<FeedbackEntryComment> = ({
    i,
    id,
    content,
    user,
    replies,
}) => {
    const [isOpenCommentReplyBox, setIsOpenCommentReplyBox] = useState(false);
    const [isOpenReplyReplyBox, setIsOpenReplyReplyBox] = useState(false);
    const [replyUsername, setReplyUsername] = useState('');
    const [reply, setReply] = useState('');

    const data = useSelector((state: RootState) => state.feedback.allFeedback);

    const dispatch = useDispatch();

    console.log(user)

    const currentEntryId = localStorage.getItem("current-feedback-entry") || "";
    const currentEntry = currentEntryId && data.productRequests.find((entry) => entry.id === Number(currentEntryId));

    const currentCommentReplyBox = localStorage.getItem(`comment-replybox-${user.username}`) || "";
    const currentReplyReplyBox = localStorage.getItem(`reply-replybox-${replyUsername}`) || "";

    const handleRepliesToComments = (username: string | undefined) => {
        localStorage.setItem(`comment-replybox-${username}`, 'true');
        setIsOpenCommentReplyBox(true);

        if (currentCommentReplyBox === 'true') {
            localStorage.setItem(`comment-replybox-${username}`, 'false');
            setIsOpenCommentReplyBox(false);
        }
    };

    const handleRepliesToReplies = (username: string | undefined) => {
        localStorage.setItem(`reply-replybox-${username}`, 'true');
        setIsOpenReplyReplyBox(true);

        if (currentReplyReplyBox === 'true') {
            localStorage.setItem(`reply-replybox-${username}`, 'false');
            setReplyUsername('');
            setIsOpenReplyReplyBox(false);
        }
    };

    const addReply = (username: string) => {
        let newReply = {
            "content": reply,
            "replyingTo": username,
            "user": {
                "image": imageZena,
                "name": "Zena Kelley",
                "username": "velvetround"
            }
        }

        localStorage.setItem(`comment-replybox-${username}`, 'false');
        setIsOpenCommentReplyBox(false);

        dispatch(addReplyToComment({ id, username, newReply }));
        setReply('');

    };

    return (
        <div
            key={i}
            style={{
                display: "flex",
                margin: "0 2rem 2rem",
                paddingBottom: "2rem",
                borderBottom:
                    i !==
                        (currentEntry &&
                            currentEntry.comments &&
                            currentEntry.comments?.length - 1)
                        ? "0.1rem solid rgba(151, 151, 151, 0.3)"
                        : "none",
            }}
        >
            <div>
                <Image
                    src={user?.image}
                    alt="comment-user"
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%", marginRight: "1.5rem" }}
                />

                {replies && (
                    <div
                        style={{
                            width: "25px",
                            height: `${30 * (replies.length)}%`,
                            borderRight: "0.1rem solid rgba(151, 151, 151, 0.3)",
                            marginTop: "1.1rem",
                        }}
                    ></div>
                )}
            </div>

            <div style={{ fontSize: "0.8rem", width: "100%" }}>
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div
                            style={{
                                color: "#3A4374",
                                fontWeight: "bold",
                                fontSize: "0.95rem",
                            }}
                        >
                            {user?.name}
                        </div>
                        <button
                            style={{
                                cursor: "pointer",
                                outline: "none",
                                color: "#4661E6",
                                fontWeight: "bold",
                                backgroundColor: "#ffffff",
                                border: "none",
                            }}
                            onClick={() => handleRepliesToComments(user.username)}
                        >
                            Reply
                        </button>
                    </div>

                    <div
                        style={{ color: "#647196", marginTop: "0.2rem" }}
                    >{`@${user?.username}`}</div>
                </div>

                <div
                    style={{ color: "#647196", marginTop: "1.4rem", lineHeight: "20px" }}
                >
                    {content}
                </div>

                {/* _______________________________________________________ replybox for comments*/}
                {currentCommentReplyBox === 'true' &&
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            height: "70px",
                            margin: "2rem 0 0.5rem",
                        }}
                    >
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
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "120px",
                                backgroundColor: "#AD1FEA",
                                color: "#FFFFFF",
                                fontSize: "0.8rem",
                                fontWeight: "bold",
                                border: "none",
                                padding: "0.8rem 1.2rem",
                                borderRadius: "8px",
                                marginLeft: "1.5rem",
                                cursor: "pointer",
                            }}
                            onClick={() => addReply(user.username)}
                        >
                            Post Reply
                        </button>
                    </div>
                }
                {/* _________________________________________________- */}

                {replies &&
                    replies?.map((reply: FeedbackEntryReply, i: number) => (
                        <div key={i} style={{ display: "flex", marginTop: "2rem" }}>
                            <Image
                                src={reply.user?.image}
                                alt="reply-user"
                                width={40}
                                height={40}
                                style={{ borderRadius: "50%", marginRight: "1.5rem" }}
                            />

                            <div style={{ fontSize: "0.8rem", width: "100%" }}>
                                <div
                                    style={{ display: "flex", justifyContent: "space-between" }}
                                >
                                    <div
                                        style={{
                                            color: "#3A4374",
                                            fontWeight: "bold",
                                            fontSize: "0.95rem",
                                        }}
                                    >
                                        {reply?.user?.name}
                                    </div>
                                    <button
                                        style={{
                                            cursor: "pointer",
                                            outline: "none",
                                            color: "#4661E6",
                                            fontWeight: "bold",
                                            backgroundColor: "#ffffff",
                                            border: "none",
                                        }}
                                        onClick={() => { setReplyUsername(reply.user.username); handleRepliesToReplies(reply.user.username) }}
                                    >
                                        Reply
                                    </button>
                                </div>

                                <div
                                    style={{ color: "#647196", marginTop: "0.2rem" }}
                                >{`@${reply?.user.username}`}</div>

                                <div
                                    style={{
                                        color: "#647196",
                                        marginTop: "1.4rem",
                                        lineHeight: "20px",
                                    }}
                                >
                                    <span
                                        style={{
                                            color: "#AD1FEA",
                                            fontWeight: "bold",
                                            marginRight: "0.5rem",
                                            fontSize: "0.95rem",
                                        }}
                                    >{`@${reply?.replyingTo}`}</span>
                                    {reply.content}
                                </div>

                                {/* _______________________________________________________ replybox for replies to replies*/}
                                {currentReplyReplyBox === 'true' &&
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            height: "70px",
                                            margin: "2rem 0 0.5rem",
                                        }}
                                    >
                                        <Textarea
                                            variant="flat"
                                            minRows={4}
                                            maxRows={8}
                                            placeholder="Type your reply here"
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
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                width: "120px",
                                                backgroundColor: "#AD1FEA",
                                                color: "#FFFFFF",
                                                fontSize: "0.8rem",
                                                fontWeight: "bold",
                                                border: "none",
                                                padding: "0.8rem 1.2rem",
                                                borderRadius: "8px",
                                                marginLeft: "1.5rem",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Post Reply
                                        </button>
                                    </div>
                                }
                                {/* _________________________________________________- */}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default FeedbackComment;

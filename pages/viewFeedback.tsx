// Base Imports
import React, { useState } from 'react';
import styles from '@/styles/App.module.css';
import { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { FeedbackEntryComment } from '@/interfaces';
import { increaseUpvote, addCommentToFeedbackEntry, handleUpvoteBtnColor, updateIsUpvotedFieldOnEntry } from '@/store/slices/feedbackSlice';
import { capitalizeStr } from '@/utilities';
// Components
import Link from 'next/link';
import Image from 'next/image';
import { Textarea } from '@nextui-org/react';
import FeedbackComment from '@/components/FeedbackComment';
// Icons/Images
import iconArrowLeftBlue from '../assets/icon-arrow-left-blue.svg';
import iconArrowUpBlue from '../assets/icon-arrow-up-blue.svg';
import iconArrowUpWhite from '../assets/icon-arrow-up-white.svg';
import iconComments from '../assets/icon-comments.svg';
import imageZena from '../public/image-zena.png';

const ViewFeedback = () => {
    const [newComment, setNewComment] = useState('');
    const [charactersLeft, setCharactersLeft] = useState('250');

    const data = useSelector((state: RootState) => state.feedback.allFeedback);

    const dispatch = useDispatch();

    const currentEntryId = localStorage.getItem('current-feedback-entry-id') || '';
    const currentEntry = currentEntryId && data.productRequests.find(entry => entry.id === Number(currentEntryId));

    const lastFeedbackEntry = data.productRequests.find((elem) => elem.id === data.productRequests.length);
    const lastCommentInLastFeedbackEntryId = lastFeedbackEntry && lastFeedbackEntry.comments && lastFeedbackEntry.comments[lastFeedbackEntry.comments.length - 1].id;

    const renderedEntryComments = currentEntry && currentEntry.comments?.map((comment: FeedbackEntryComment, i: number) => (
        <FeedbackComment
            i={i}
            key={i}
            id={comment.id}
            content={comment.content}
            user={comment.user}
            replies={comment.replies}
        />
    ));

    const handleUpvoteCount = (id: number) => {
        localStorage.setItem(`upvoted-${id}`, 'true');

        dispatch(increaseUpvote({ id }));
        dispatch(updateIsUpvotedFieldOnEntry({id }));
        dispatch(handleUpvoteBtnColor({ id }));
    }

    const addComment = () => {
        let id = Number(currentEntryId);

        let comment = {
            "id": lastCommentInLastFeedbackEntryId && lastCommentInLastFeedbackEntryId + 1,
            "content": newComment,
            "user": {
                "image": imageZena,
                "name": "Zena Kelley",
                "username": "velvetround"
            }
        }

        dispatch(addCommentToFeedbackEntry({ id, comment }));
        setNewComment('');
    }

    const handleNewComment = (e: { target: { value: string }; }) => {
        setCharactersLeft(`${250 - e.target.value.length}`);
    }

    return (
        <div className={styles.ViewFeedback}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/" style={{ color: '#647196', textDecoration: 'none' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                        <Image
                            src={iconArrowLeftBlue}
                            alt="icon-arrow-left"
                            width={8}
                            height={8}
                        />
                        <span style={{ marginLeft: '0.9rem' }}>Go Back</span>
                    </div>
                </Link>

                <Link href='/editFeedback' style={{ textDecoration: 'none' }}>
                    <button
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '150px', backgroundColor: '#4661E6', color: '#FFFFFF', fontSize: '0.8rem', fontWeight: 'bold', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', cursor: 'pointer' }}>
                        Edit Feedback
                    </button>
                </Link>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#FFFFFF', margin: '1.6rem 0', borderRadius: '12px', padding: '1.7rem', fontFamily: 'Arial' }}>
                <div style={{ display: 'flex' }}>
                    <div
                        id={`upvoteBtn-${currentEntry && currentEntry.id}`}
                        /*ref={(element: HTMLDivElement) => { upvoteButtonRef.current[id] = element }}*/
                        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: currentEntry && currentEntry.upvoteBtnColor, width: '35px', height: '47px', borderRadius: '8px', cursor: 'pointer' }}
                        onClick={() => currentEntry && handleUpvoteCount(currentEntry.id)}>
                        <Image
                            src={currentEntry && currentEntry.isUpvoted ? iconArrowUpWhite : iconArrowUpBlue}
                            alt="icon-arrow-up"
                            width={8}
                            height={6}
                            style={{ color: '#FFFFFF' }}
                        />
                        <span
                            /*ref={(element: HTMLSpanElement) => { upvoteCountRef.current[id] = element }}*/
                            style={{ fontWeight: 'bold', fontSize: '0.7rem', color: currentEntry && currentEntry.isUpvoted ? '#FFFFFF' : '#3A4374', marginTop: '0.4rem' }}>
                            {currentEntry && currentEntry.upvotes}
                        </span>
                    </div>

                    <div style={{ marginLeft: '2.5rem' }}>
                        <Link href="/viewFeedback" style={{ textDecoration: 'none' }}><div /*ref={feedbackTitleRef}*/ style={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'rgb(55,63,104)', cursor: 'pointer' }} /*onMouseEnter={highlightTitle} onMouseLeave={dehighlightTitle}*/>{currentEntry && currentEntry.title}</div></Link>
                        <div style={{ fontSize: '0.8rem', color: '#647196', lineHeight: '40px' }}>{currentEntry && currentEntry.description}</div>
                        <div style={{ backgroundColor: '#F2F4FF', color: '#4661E6', fontWeight: 'bold', fontSize: '0.75rem', borderRadius: '8px', padding: '0.5rem 1rem', width: 'min-content' }}>{currentEntry && capitalizeStr(currentEntry.category)}</div>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Image
                        src={iconComments}
                        alt="icon-comments"
                        width={15}
                        height={15}
                    />
                    <span style={{ marginLeft: '0.6rem', fontWeight: 'bold', fontSize: '0.9rem' }}>{currentEntry && currentEntry.comments ? currentEntry.comments?.length : 0}</span>
                </div>
            </div>

            {currentEntry && currentEntry.comments &&
                <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'rgb(55,63,104)', cursor: 'pointer', margin: '2rem' }}>
                        {(currentEntry && currentEntry.comments && currentEntry.comments.length === 1) ? '1 Comment' : `${currentEntry.comments.length} Comments`}
                    </div>
                    {renderedEntryComments}
                </div>
            }

            <div style={{ borderRadius: '12px', backgroundColor: '#FFFFFF', margin: (currentEntry && currentEntry.comments) ? '2rem 0' : '0', padding: '1.7rem' }}>
                <div style={{ color: 'rgb(55,63,104)', fontWeight: 'bold', fontSize: '0.95rem' }}>Add Comment</div>
                <Textarea
                    variant='flat'
                    minRows={4}
                    maxRows={8}
                    placeholder='Type your comment here'
                    value={newComment}
                    onValueChange={setNewComment}
                    onChange={(e) => handleNewComment(e)}
                    style={{ fontFamily: 'Arial', fontSize: '0.8rem', width: '98%', margin: '1.5rem 0', color: '#8C92B3', backgroundColor: '#F7F8FD', border: 'none', borderRadius: '12px', padding: '1rem 0 0 1rem', resize: 'none' }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.8rem', color: '#647196' }}>{charactersLeft} Characters Left</div>
                    <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '150px', backgroundColor: '#AD1FEA', color: '#FFFFFF', fontSize: '0.8rem', fontWeight: 'bold', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', cursor: 'pointer' }} onClick={addComment}>Post Comment</button>
                </div>
            </div>
        </div>
    )
}

export default ViewFeedback;
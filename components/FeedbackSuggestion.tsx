// Base Imports
import React, { FC, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { increaseUpvote, updateIsUpvotedFieldOnEntry, handleUpvoteBtnColor } from '@/store/slices/feedbackSlice';
import { FeedbackEntryComment } from '@/interfaces';
import { capitalizeStr } from '../utilities';
// Components
import Image from 'next/image';
import Link from 'next/link';
// Icons/Images
import iconComments from '../assets/icon-comments.svg';
import iconArrowUpBlue from '../assets/icon-arrow-up-blue.svg';
import iconArrowUpWhite from '../assets/icon-arrow-up-white.svg';

interface FeedbackSuggestionProps {
    entry: {
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
}
const FeedbackSuggestion: FC<FeedbackSuggestionProps> = ({ entry }) => {
    const feedbackTitleRef = useRef<HTMLDivElement | null>(null);

    const dispatch = useDispatch();

    const highlightTitle = () => {
        feedbackTitleRef.current!.style.color = '#4661E6';
    };

    const dehighlightTitle = () => {
        feedbackTitleRef.current!.style.color = 'rgb(55,63,104)';
    };

    const handleUpvoteCount = (id: number) => {
        dispatch(increaseUpvote({ id }));
        dispatch(updateIsUpvotedFieldOnEntry({ id }));
        dispatch((handleUpvoteBtnColor({ id })));
    }

    const viewFeedbackEntry = (id: number) => {
        localStorage.setItem('current-feedback-entry-id', id.toString());
        localStorage.setItem('current-feedback-entry', JSON.stringify(entry));
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#FFFFFF', marginBottom: '1.2rem', borderRadius: '12px', padding: '1.7rem', fontFamily: 'Arial' }}>
            <div style={{ display: 'flex' }}>
                <div
                    id={`upvoteBtn-${entry.id}`}
                    /*ref={(element: HTMLDivElement) => { upvoteButtonRef.current[id] = element }}*/
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: `${entry.upvoteBtnColor}`, width: '35px', height: '47px', borderRadius: '8px', cursor: 'pointer' }}
                    onClick={() => handleUpvoteCount(entry.id)}>
                    <Image
                        src={entry.isUpvoted ? iconArrowUpWhite : iconArrowUpBlue}
                        alt="icon-arrow-up"
                        width={8}
                        height={6}
                        style={{ color: '#FFFFFF' }}
                    />
                    <span
                        /*ref={(element: HTMLSpanElement) => { upvoteCountRef.current[id] = element }}*/
                        style={{ fontWeight: 'bold', fontSize: '0.7rem', color: entry.isUpvoted ? '#FFFFFF' : '#3A4374', marginTop: '0.4rem' }}>
                        {entry.upvotes}
                    </span>
                </div>

                <div style={{ marginLeft: '2.5rem' }}>
                    <Link href="/viewFeedback" style={{ textDecoration: 'none' }}><div ref={feedbackTitleRef} style={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'rgb(55,63,104)', cursor: 'pointer' }} onMouseEnter={highlightTitle} onMouseLeave={dehighlightTitle} onClick={() => viewFeedbackEntry(entry.id)}>{entry.title}</div></Link>
                    <div style={{ fontSize: '0.8rem', color: '#647196', lineHeight: '40px' }}>{entry.description}</div>
                    <div style={{ backgroundColor: '#F2F4FF', color: '#4661E6', fontWeight: 'bold', fontSize: '0.75rem', borderRadius: '8px', padding: '0.5rem 1rem', width: 'min-content' }}>{capitalizeStr(entry.category)}</div>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Image
                    src={iconComments}
                    alt="icon-comments"
                    width={15}
                    height={15}
                />
                <span style={{ marginLeft: '0.6rem', fontWeight: 'bold', fontSize: '0.9rem' }}>{entry.comments ? entry.comments?.length : 0}</span>
            </div>
        </div>
    )
}

export default FeedbackSuggestion;
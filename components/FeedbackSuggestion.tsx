// Base Imports
import React, { FC, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { increaseUpvote } from '@/store/slices/feedbackSlice';
import { FeedbackEntry } from '@/interfaces';
import { capitalizeStr } from '../utilities';
// Components
import Image from 'next/image';
import Link from 'next/link';
// Icons/Images
import iconComments from '../assets/icon-comments.svg';
import iconArrowUpBlue from '../assets/icon-arrow-up-blue.svg';
import iconArrowUpWhite from '../assets/icon-arrow-up-white.svg';

const FeedbackSuggestion: FC<FeedbackEntry> = ({
    id,
    title,
    category,
    upvotes,
    status,
    description,
    comments,
}) => {
    const feedbackTitleRef = useRef<HTMLDivElement | null>(null);
   // const upvoteButtonRef = useRef<(HTMLDivElement | null)[]>([]);
   // const upvoteCountRef = useRef<(HTMLSpanElement | null)[]>([]);

    const dispatch = useDispatch();

    //console.log(upvoteButtonRef)

    let upvoted = localStorage.getItem(`upvoted-${id}`) || '';

    const highlightTitle = () => {
        feedbackTitleRef.current!.style.color = '#4661E6';
    };

    const dehighlightTitle = () => {
        feedbackTitleRef.current!.style.color = 'rgb(55,63,104)';
    };

    const handleUpvoteCount = (id: number) => {
        localStorage.setItem(`upvoted-${id}`, 'true');

        dispatch(increaseUpvote({ id }));

        //upvoteButtonRef.current[id]!.style.backgroundColor = '#4661E6';
        // upvoteCountRef.current[id]!.style.color = '#FFFFFF';

        // console.log(upvoteButtonRef)

       // upvoteBtn!.style.backgroundColor = '#4661E6';
       // upvoteBtn!.style.color = '#FFFFFF';
    }

    /*
    useEffect(() => {
        if (upvoted === 'true') {
            upvoteButtonRef.current[id]!.style.backgroundColor = '#4661E6';
            upvoteCountRef.current[id]!.style.color = '#FFFFFF';
        }

    }, [upvoted]);
    */

    const viewFeedbackEntry = (id: number) => {
        localStorage.setItem('current-feedback-entry', id.toString());
    };

    useEffect(() => {
        let upvoteBtn = document.getElementById(`upvoteBtn-${id}`);

        if (upvoted === 'true') {
           upvoteBtn!.style.backgroundColor = '#4661E6';
            upvoteBtn!.style.color = '#FFFFFF';
        }


    }, [upvoted, id]);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#FFFFFF', marginBottom: '1.2rem', borderRadius: '12px', padding: '1.7rem', fontFamily: 'Arial' }}>
            <div style={{ display: 'flex' }}>
                <div
                    id={`upvoteBtn-${id}`}
                    /*ref={(element: HTMLDivElement) => { upvoteButtonRef.current[id] = element }}*/
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F4FE', width: '35px', height: '47px', borderRadius: '8px', cursor: 'pointer' }}
                    onClick={() => handleUpvoteCount(id)}>
                    <Image
                        src={upvoted === 'true' ? iconArrowUpWhite : iconArrowUpBlue}
                        alt="icon-arrow-up"
                        width={8}
                        height={6}
                        style={{ color: '#FFFFFF' }}
                    />
                    <span
                        /*ref={(element: HTMLSpanElement) => { upvoteCountRef.current[id] = element }}*/
                        style={{ fontWeight: 'bold', fontSize: '0.7rem', color: '#3A4374', marginTop: '0.4rem' }}>
                        {upvotes}
                    </span>
                </div>

                <div style={{ marginLeft: '2.5rem' }}>
                    <Link href="/viewFeedback" style={{ textDecoration: 'none'}}><div ref={feedbackTitleRef} style={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'rgb(55,63,104)', cursor: 'pointer' }} onMouseEnter={highlightTitle} onMouseLeave={dehighlightTitle} onClick={() => viewFeedbackEntry(id)}>{title}</div></Link>
                    <div style={{ fontSize: '0.8rem', color: '#647196', lineHeight: '40px' }}>{description}</div>
                    <div style={{ backgroundColor: '#F2F4FF', color: '#4661E6', fontWeight: 'bold', fontSize: '0.75rem', borderRadius: '8px', padding: '0.5rem 1rem', width: 'min-content' }}>{capitalizeStr(category)}</div>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Image
                    src={iconComments}
                    alt="icon-comments"
                    width={15}
                    height={15}
                />
                <span style={{ marginLeft: '0.6rem', fontWeight: 'bold', fontSize: '0.9rem' }}>{comments ? comments?.length : 0}</span>
            </div>
        </div>
    )
}

export default FeedbackSuggestion;
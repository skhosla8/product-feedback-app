// Base Imports
import React, { FC } from 'react';
import { FeedbackEntry } from '@/interfaces';
// Components
import Image from 'next/image';
// Icons/Images
import iconComments from '../assets/icon-comments.svg';
import iconArrowUp from '../assets/icon-arrow-up.svg';

const FeedbackSuggestion: FC<FeedbackEntry> = ({
    id,
    title,
    category,
    upvotes,
    status,
    description,
    comments
}) => {

    const capitalizeStr = (str: string) => {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#FFFFFF', marginBottom: '1.2rem', borderRadius: '12px', padding: '1.7rem', fontFamily: 'Arial' }}>
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F4FE', width: '35px', height: '47px', borderRadius: '8px' }}>
                    <Image
                        src={iconArrowUp}
                        alt="icon-arrow-up"
                        width={8}
                        height={6}
                        style={{ color: '#4661E6' }}
                    />

                    <span style={{ fontWeight: 'bold', fontSize: '0.7rem', color: '#3A4374', marginTop: '0.4rem' }}>{upvotes}</span>
                </div>

                <div style={{ marginLeft: '2.5rem' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'rgb(55,63,104)' }}>{title}</div>
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
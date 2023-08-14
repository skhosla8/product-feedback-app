// Base Imports 
import React, { FC } from 'react';
import { FeedbackEntry } from '@/interfaces';
// Components
import Image from 'next/image';
// Icons/Images
import iconArrowUp from '../assets/icon-arrow-up.svg';
import iconComments from '../assets/icon-comments.svg';

const RoadmapEntry: FC<FeedbackEntry> = ({
    id,
    title,
    category,
    upvotes,
    status,
    description,
    comments
}) => {

    const capitalizeFirstLetterOfWord = (str: string) => {
        let arr = str.split(' ');
        let newArr = [];

        for (let word of arr) {
            let firstChar = word.slice(0, 1).toUpperCase();
            let restOfWord = word.slice(1);

            newArr.push(firstChar + restOfWord);
        }

        return newArr.join(' ');
    };

    return (
        <div style={{ width: '320px', height: '265px', backgroundColor: '#FFFFFF', borderRadius: '12px', marginTop: '1.5rem' }}>
            <div style={{ width: '100%', height: '7px', backgroundColor: status === 'planned' ? '#F49F85' : status === 'in progress' ? '#AD1FEA' : '#62BCFA', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}></div>

            <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 1.6rem 0.7rem'}}>
                <div style={{ backgroundColor: status === 'planned' ? '#F49F85' : status === 'in progress' ? '#AD1FEA' : '#62BCFA', width: '9px', height: '9px', borderRadius: '50%' }}></div>
                <span style={{ marginLeft: '1rem', color: '#647196', fontWeight: '400', fontSize: '0.85rem' }}>{capitalizeFirstLetterOfWord(status)}</span>
            </div>

            <div style={{ margin: '0 1.6rem', fontSize: '1rem' }}>
                {title}
                <p style={{ color: '#647196', fontSize: '0.85rem', fontWeight: '400', margin: '0.7rem 0', lineHeight: '1.5rem'}}>{description}</p>
            </div>

            <div style={{ margin: '0.8rem 1.6rem', backgroundColor: '#F2F4FF', color: '#4661E6', borderRadius: '8px', fontSize: '0.75rem' , padding: '0.5rem 1rem', width: 'fit-content'}}>{capitalizeFirstLetterOfWord(category)}</div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 1.6rem' }}>
                <button  style={{ display: 'flex', alignItems: 'center', padding: '0.7rem 1.1rem', border: 'none', backgroundColor: '#F2F4FF', borderRadius: '8px', fontWeight: 'bold', marginTop: '0.3rem', cursor: 'pointer'}} >
                    <Image
                        src={iconArrowUp}
                        alt="icon-arrow-up"
                        width={10}
                        height={7}
                        style={{ marginRight: '0.6rem'}}
                    />
                    {upvotes}
                </button>

                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <Image
                        src={iconComments}
                        alt="icon-comments"
                        width={15}
                        height={15}
                    />
                    <span style={{ marginLeft: '0.7rem', fontSize: '1rem' }}>{comments?.length}</span>
                </div>
            </div>
        </div>
    )
}

export default RoadmapEntry;
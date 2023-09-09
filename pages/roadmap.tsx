// Base Imports
import React from 'react';
import styles from '@/styles/App.module.css';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { FeedbackEntry } from '@/interfaces';
// Components
import Link from 'next/link';
import Image from 'next/image';
import RoadmapEntry from '../components/RoadmapEntry';
// Icons/Images
import iconPlus from '../assets/icon-plus.svg';
import iconArrowLeft from '../assets/icon-arrow-left-white.svg';

const Roadmap = () => {
    const data = useSelector((state: RootState) => state.feedback.allFeedback);

    const numPlannedEntries = data.productRequests.filter((entry: FeedbackEntry) => entry.status === 'planned').length;
    const numInProgressEntries = data.productRequests.filter((entry: FeedbackEntry) => entry.status === 'in progress').length;
    const numLiveEntries = data.productRequests.filter((entry: FeedbackEntry) => entry.status === 'live').length;

    const renderedPlannedEntries = data.productRequests.filter((entry: FeedbackEntry) => entry.status === 'planned').map((entry: FeedbackEntry, i: number) => (
        <RoadmapEntry
            key={i}
            id={entry.id}
            title={entry.title}
            category={entry.category}
            upvotes={entry.upvotes}
            isUpvoted={entry.isUpvoted}
            upvoteBtnColor={entry.upvoteBtnColor}
            status={entry.status}
            description={entry.description}
            comments={entry.comments}
        />
    ));

    const renderedInProgressEntries = data.productRequests.filter((entry: FeedbackEntry) => entry.status === 'in progress').map((entry: FeedbackEntry, i: number) => (
        <RoadmapEntry
            key={i}
            id={entry.id}
            title={entry.title}
            category={entry.category}
            upvotes={entry.upvotes}
            isUpvoted={entry.isUpvoted}
            upvoteBtnColor={entry.upvoteBtnColor}
            status={entry.status}
            description={entry.description}
            comments={entry.comments}
        />
    ));

    const renderedLiveEntries = data.productRequests.filter((entry: FeedbackEntry) => entry.status === 'live').map((entry: FeedbackEntry, i: number) => (
        <RoadmapEntry
            key={i}
            id={entry.id}
            title={entry.title}
            category={entry.category}
            upvotes={entry.upvotes}
            isUpvoted={entry.isUpvoted}
            upvoteBtnColor={entry.upvoteBtnColor}
            status={entry.status}
            description={entry.description}
            comments={entry.comments}
        />
    ));

    return (
        <div className={styles.Roadmap}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#373F68', color: '#FFFFFF', width: '100%', height: '85px', borderRadius: '12px' }}>
                <div style={{ fontWeight: 600, fontSize: '1.1rem', marginLeft: '2.5rem' }}>
                    <Link href="/" style={{ color: '#ffffff', textDecoration: 'none' }}>
                        <div style={{ fontSize: '0.78rem', marginBottom: '0.4rem' }}>
                            <Image
                                src={iconArrowLeft}
                                alt="icon-arrow-left"
                                width={8}
                                height={8}
                            />
                            <span style={{ marginLeft: '0.9rem' }}>Go Back</span>
                        </div>
                    </Link>
                    Roadmap
                </div>

                <button style={{ display: 'flex', alignItems: 'center', backgroundColor: '#AD1FEA', color: '#FFFFFF', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', cursor: 'pointer', marginRight: '2.5rem' }}>
                    <Image
                        src={iconPlus}
                        alt="icon-plus"
                        width={11}
                        height={11}
                        style={{ marginRight: '0.3rem' }}
                    />
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Add Feedback</span>
                </button>
            </div>

            <div style={{ display: 'flex', marginTop: '3rem', width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', color: 'rgb(55,63,104)', fontWeight: 'bold', fontSize: '1rem' }}>
                    Planned ({numPlannedEntries})
                    <span style={{ color: '#647196', fontSize: '0.85rem', fontWeight: 'normal', marginTop: '0.7rem' }}>Ideas prioritized for research</span>

                    {renderedPlannedEntries}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', color: 'rgb(55,63,104)', fontWeight: 'bold', fontSize: '1rem', margin: '0 2rem' }}>
                    In-Progress ({numInProgressEntries})
                    <span style={{ color: '#647196', fontSize: '0.85rem', fontWeight: 'normal', marginTop: '0.7rem' }}>Currently being developed</span>

                    {renderedInProgressEntries}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', color: 'rgb(55,63,104)', fontWeight: 'bold', fontSize: '1rem' }}>
                    Live ({numLiveEntries})
                    <span style={{ color: '#647196', fontSize: '0.85rem', fontWeight: 'normal', marginTop: '0.7rem' }}>Released features</span>

                    {renderedLiveEntries}
                </div>
            </div>
        </div>
    )
}

export default Roadmap; 
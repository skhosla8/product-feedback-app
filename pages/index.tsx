// Base Imports
import React, { useState, useEffect, useRef } from 'react';
import { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { FeedbackEntry } from '@/interfaces';
import { sortByUpvotes, sortByComments } from '@/store/slices/feedbackSlice';
import styles from '@/styles/App.module.css';
// Components
import Image from 'next/image';
import Link from 'next/link';
import FeedbackSuggestion from '@/components/FeedbackSuggestion';
import FeedbackCategoryButton from '@/components/FeedbackCategoryButton';
// Icons/Images
import backgroundHeaderImg from '../assets/background-header.png';
import iconSuggestions from '../assets/icon-suggestions.svg';
import iconArrowDownWhite from '../assets/icon-arrow-down-white.svg';
import iconPlus from '../assets/icon-plus.svg';
import illustrationEmpty from '../assets/illustration-empty.svg';
import iconCheck from '../assets/icon-check.svg';

function App() {
    const data = useSelector((state: RootState) => state.feedback.allFeedback);

    const [selectedSuggestionCategory, setSelectedSuggestionCategory] = useState<string | null>(null);
    const [isOpenSortModal, setIsOpenSortModal] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState<string | null>(null);

    const feedbackEntryRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const sortByRefs = useRef<(HTMLDivElement | null)[]>([]);

    const dispatch = useDispatch();

    const allFeedbackSuggestions = data.productRequests.filter((entry: FeedbackEntry) => entry.status === 'suggestion');
    const filteredFeedbackSuggestions = allFeedbackSuggestions.filter((entry: FeedbackEntry) => entry.category === selectedSuggestionCategory);

    const plannedFeedbackEntries = data.productRequests.filter((entry: FeedbackEntry) => entry.status === 'planned');
    const inProgressFeedbackEntries = data.productRequests.filter((entry: FeedbackEntry) => entry.status === 'in progress');
    const liveFeedbackEntries = data.productRequests.filter((entry: FeedbackEntry) => entry.status === 'live');

    const feedbackSuggestions = selectedSuggestionCategory ? filteredFeedbackSuggestions : allFeedbackSuggestions;

    const sortModalClassName = isOpenSortModal ? styles.visible : styles.hidden;

    const sortFeedbackSuggestions = (str: string, i: number) => {
        setSortBy(str);

        (sortByRefs.current[i]!.firstChild as HTMLElement).style.color = '#AD1FEA';

        for (const ref of sortByRefs.current) {
            if (ref!.textContent !== str) {
                (ref!.firstChild as HTMLElement).style.color = '#647196';
            }
        }

        if ((str === 'Most Upvotes') || (str === 'Least Upvotes')) {
            dispatch(sortByUpvotes({ str }));
        } else {
            dispatch(sortByComments({ str }));
        }

        setTimeout(() => {
            setIsOpenSortModal(false);
        }, 500);
    };

    const renderedFeedbackSuggestions = feedbackSuggestions
        .map((entry, i: number) => (
            <FeedbackSuggestion
                key={i}
                entry={entry}
            />
        ));

    const renderedFeedbackCategoryButtons = Array(6).fill('').map((elem, i) => (
        <FeedbackCategoryButton
            key={i}
            i={i}
            ref={(element: HTMLButtonElement | null) => { feedbackEntryRefs.current[i] = element }}
            feedbackEntryRefs={feedbackEntryRefs}
            setSelectedSuggestionCategory={setSelectedSuggestionCategory}
        />
    ));

    useEffect(() => {
        if (feedbackEntryRefs.current[0]) {
            feedbackEntryRefs.current[0].style.backgroundColor = '#4661E6';
            feedbackEntryRefs.current[0].style.color = '#FFFFFF';
        }

        const sortByFromLocalStorage = localStorage.getItem('sortBy') || 'Most Upvotes';

        if (sortByFromLocalStorage !== null) {
            setSortBy(sortByFromLocalStorage);
        }

        sortFeedbackSuggestions(sortByFromLocalStorage, 0);

        for (const ref of sortByRefs.current) {
            if (ref!.textContent === sortByFromLocalStorage) {
                (ref!.firstChild as HTMLElement).style.color = '#AD1FEA';
            }
        }
    }, []);

    useEffect(() => {
        if (sortBy) localStorage.setItem('sortBy', sortBy);
    }, [sortBy]);

    return (
        <div className={styles.App}>
            <div>
                <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                    <Image
                        src={backgroundHeaderImg}
                        width={270}
                        height={145}
                        alt="background-header"
                        style={{ borderRadius: '12px' }}
                    />

                    <div style={{ position: 'absolute', top: 10, left: 10, color: '#ffffff', marginLeft: '1rem', marginTop: '2.5rem' }}>
                        <h1 style={{ fontSize: '1.2rem', fontFamily: 'Arial', width: '250px' }}>Product Feedback App</h1>
                        <h2 style={{ fontSize: '0.9rem', fontFamily: 'Arial', fontWeight: 400, opacity: 0.75, marginTop: '-0.4rem' }}>Feedback Board</h2>
                    </div>
                </div>

                <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', width: '270px', marginBottom: '1.5rem', boxSizing: 'border-box', padding: '1.6rem' }}>
                    {renderedFeedbackCategoryButtons}
                </div>

                <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', width: '270px', boxSizing: 'border-box', padding: '0.1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1.5rem', fontSize: '0.9rem' }}>
                        <div style={{ color: 'rgb(55,63,104)', fontWeight: 'bold', fontFamily: 'Arial' }}>Roadmap</div>
                        <span style={{ fontSize: '0.8rem', cursor: 'pointer' }}><Link href="/roadmap" style={{ color: '#4661E6', fontSize: '0.85rem', fontWeight: 600 }}>View</Link></span>
                    </div>

                    <div style={{ margin: '1.5rem', fontFamily: 'arial' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '9px', height: '9px', backgroundColor: '#F49F85', borderRadius: '50%' }}></div>
                                <span style={{ marginLeft: '0.9rem', fontSize: '0.85rem', color: '#647196' }}>Planned</span>
                            </div>

                            <span style={{ color: '#647196', fontWeight: 'bold', fontSize: '0.9rem' }}>{plannedFeedbackEntries.length}</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0.7rem 0' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '9px', height: '9px', backgroundColor: '#AD1FEA', borderRadius: '50%' }}></div>
                                <span style={{ marginLeft: '0.9rem', fontSize: '0.85rem', color: '#647196' }}>In-Progress</span>
                            </div>

                            <span style={{ color: '#647196', fontWeight: 'bold', fontSize: '0.9rem' }}>{inProgressFeedbackEntries.length}</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '9px', height: '9px', backgroundColor: '#62BCFA', borderRadius: '50%' }}></div>
                                <span style={{ marginLeft: '0.9rem', fontSize: '0.85rem', color: '#647196' }}>Live</span>
                            </div>

                            <span style={{ color: '#647196', fontWeight: 'bold', fontSize: '0.9rem' }}>{liveFeedbackEntries.length}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ position: 'relative' }}>
                <div className={sortModalClassName} style={{ position: 'absolute', top: 80, left: 200, width: '230px', filter: 'drop-shadow(0px 8px 6px rgba(0,0,0,0.25))' }}>
                    <div
                        ref={(element) => { sortByRefs.current[0] = element }}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderBottom: '1px solid rgba(0,0,0,0.2)', padding: '1rem 1.2rem', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
                        onClick={() => sortFeedbackSuggestions('Most Upvotes', 0)}>
                        <span style={{ color: '#647196', fontFamily: 'Arial', fontSize: '0.8rem', cursor: 'pointer' }}>Most Upvotes</span>
                        {sortByRefs.current[0]?.textContent === sortBy &&
                            <Image
                                src={iconCheck}
                                alt="icon-check"
                            />
                        }
                    </div>

                    <div
                        ref={(element) => { sortByRefs.current[1] = element }}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderBottom: '1px solid rgba(0,0,0,0.2)', padding: '1rem 1.2rem' }}
                        onClick={() => sortFeedbackSuggestions('Least Upvotes', 1)}>
                        <span style={{ color: '#647196', fontFamily: 'Arial', fontSize: '0.8rem', cursor: 'pointer' }}>Least Upvotes</span>
                        {sortByRefs.current[1]?.textContent === sortBy &&
                            <Image
                                src={iconCheck}
                                alt="icon-check"
                            />
                        }
                    </div>

                    <div
                        ref={(element) => { sortByRefs.current[2] = element }}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderBottom: '1px solid rgba(0,0,0,0.2)', padding: '1rem 1.2rem' }}
                        onClick={() => sortFeedbackSuggestions('Most Comments', 2)}>
                        <span style={{ color: '#647196', fontFamily: 'Arial', fontSize: '0.8rem', cursor: 'pointer' }}>Most Comments</span>
                        {sortByRefs.current[2]?.textContent === sortBy &&
                            <Image
                                src={iconCheck}
                                alt="icon-check"
                            />
                        }
                    </div>

                    <div
                        ref={(element) => { sortByRefs.current[3] = element }}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '1rem 1.2rem', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}
                        onClick={() => sortFeedbackSuggestions('Least Comments', 3)}>
                        <span style={{ color: '#647196', fontFamily: 'Arial', fontSize: '0.8rem', cursor: 'pointer' }}>Least Comments</span>
                        {sortByRefs.current[3]?.textContent === sortBy &&
                            <Image
                                src={iconCheck}
                                alt="icon-check"
                            />
                        }
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box', padding: '1rem', backgroundColor: '#373F68', color: '#FFFFFF', height: '70px', borderRadius: '12px', marginBottom: '1.2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <Image
                            src={iconSuggestions}
                            alt="icon-suggestions"
                            style={{ marginRight: '1rem', marginTop: '-0.1rem' }}
                        />

                        <div style={{ fontWeight: 'bold', fontFamily: 'Arial', fontSize: '1rem' }}>{feedbackSuggestions.length} Suggestions</div>

                        <div style={{ display: 'flex', fontFamily: 'Arial', fontSize: '0.85rem', color: '#F7F8FD', margin: '2.5rem', cursor: 'pointer' }} onClick={() => setIsOpenSortModal(!isOpenSortModal)}>
                            Sort by : <span style={{ fontWeight: 'bold', opacity: 1, color: '#FFFFFF', margin: '0 0.3rem' }}>{sortBy}</span>
                            <div style={{ backgroundColor: '#373F68', border: 'none', marginLeft: '0.1rem' }}>
                                <Image
                                    src={iconArrowDownWhite}
                                    alt="icon-plus"
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        </div>
                    </div>

                    <Link href="/createFeedback" style={{ textDecoration: 'none' }}>
                        <div>
                            <button
                                style={{ display: 'flex', alignItems: 'center', backgroundColor: '#AD1FEA', color: '#FFFFFF', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', cursor: 'pointer' }}
                            >
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
                    </Link>
                </div>

                {renderedFeedbackSuggestions?.length ?
                    renderedFeedbackSuggestions :
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '1.5rem', backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '8rem 6rem' }}>
                        <Image
                            src={illustrationEmpty}
                            alt="illustration-empty"
                            width={120}
                            height={120}
                            style={{ marginBottom: '3rem' }}
                        />

                        <div style={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'Arial', color: '#3A4374', width: '400px', textAlign: 'center' }}>
                            There is no feedback yet.
                            <p style={{ fontWeight: '400', fontSize: '0.85rem', color: '#647196', lineHeight: '22px', marginTop: '1rem' }}>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
                        </div>

                        <button style={{ display: 'flex', alignItems: 'center', backgroundColor: '#AD1FEA', color: '#FFFFFF', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', cursor: 'pointer', marginTop: '2rem' }}>
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
                }
            </div>
        </div>
    )
}

export default App;
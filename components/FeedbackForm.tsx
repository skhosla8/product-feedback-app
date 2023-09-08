// Base Imports
import React, { FC, useState, Dispatch, SetStateAction } from 'react';
import styles from '@/styles/App.module.css';
// Components
import Link from 'next/link';
import Image from 'next/image';
import { Input, Textarea } from "@nextui-org/react";
import SelectOption from '../components/SelectOption';
// Icons/Images
import iconArrowLeftBlue from '../assets/icon-arrow-left-blue.svg';
import backgroundHeader from '../assets/background-header.png';
import iconArrowDownBlue from '../assets/icon-arrow-down-blue.svg';
import iconArrowUpBlue from '../assets/icon-arrow-up-blue.svg';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface FeedbackFormProps {
    addEntry?: (title: string, category: string, detail: string) => void,
    displayIcon: StaticImport,
    isOpenEditForm?: boolean,
    title: string,
    submitBtnText: string,
    isOpenStatusSelect?: boolean,
    setIsOpenStatusSelect?: Dispatch<SetStateAction<boolean>>,
    selectedStatus?: string,
    setSelectedStatus?: Dispatch<SetStateAction<string>>,
    feedbackTitle: string,
    setFeedbackTitle: Dispatch<SetStateAction<string>>,
    feedbackDetail: string,
    setFeedbackDetail: Dispatch<SetStateAction<string>>,
    selectedCategory: string,
    setSelectedCategory: Dispatch<SetStateAction<string>>,
    editEntry?: (title: string, category: string, status: string, detail: string) => void,
    deleteEntry?: () => void
}

const FeedbackForm: FC<FeedbackFormProps> = ({
    addEntry,
    displayIcon,
    isOpenEditForm,
    title,
    submitBtnText,
    isOpenStatusSelect,
    setIsOpenStatusSelect,
    selectedStatus,
    setSelectedStatus,
    feedbackTitle,
    setFeedbackTitle,
    feedbackDetail,
    setFeedbackDetail,
    selectedCategory,
    setSelectedCategory,
    editEntry,
    deleteEntry }) => {

    const [isOpenCategorySelect, setIsOpenCategorySelect] = useState(false);

    return (
        <div className={styles.FeedbackForm}>
            <div style={{ width: '75px', marginTop: '2rem', marginBottom: '2.5rem' }}>
                <Link href="/" style={{ color: '#647196', textDecoration: 'none' }}>
                    <div style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center' }}>
                        <Image
                            src={iconArrowLeftBlue}
                            alt="icon-arrow-left"
                            width={8}
                            height={8}
                        />
                        <span style={{ marginLeft: '0.9rem', fontWeight: 600 }}>Go Back</span>
                    </div>
                </Link>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '40px', height: '40px', position: 'relative', marginBottom: '-4.4rem', marginLeft: '2.3rem' }}>
                {!isOpenEditForm &&
                    <Image
                        src={backgroundHeader}
                        alt='add-new-feedback'
                        width={45}
                        height={45}
                        style={{ borderRadius: '50%' }}
                    />
                }

                <Image
                    src={displayIcon}
                    alt='display-icon'
                    width={isOpenEditForm ? 70 : 20}
                    height={isOpenEditForm ? 70 : 20}
                    style={{ position: 'absolute', zIndex: 100, marginLeft: isOpenEditForm ? '0.8rem' : '0.1rem', marginTop: isOpenEditForm ? '1.2rem' : '0.2rem' }}
                />
            </div>

            <div style={{ width: '100%', backgroundColor: '#FFFFFF', marginTop: '3rem', borderRadius: '12px', padding: '2rem', fontFamily: 'Arial' }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#3A4374', marginTop: '1rem' }}>{title}</div>

                <div style={{ marginTop: '1.5rem' }}>
                    <div style={{ color: '#3A4374', fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Feedback Title</div>

                    <div style={{ color: '#647196', fontSize: '0.8rem' }}>Add a short, descriptive headline</div>

                    <Input
                        type='text'
                        style={{ fontSize: '0.8rem', marginTop: '0.5rem', width: '94.5%', color: '#3A4374', backgroundColor: '#F7F8FD', border: 'none', borderRadius: '7px', padding: '0.7rem' }}
                        value={feedbackTitle}
                        onValueChange={setFeedbackTitle}
                    />
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                    <div style={{ fontWeight: 'bold', color: '#3A4374', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Category</div>

                    <div style={{ color: '#647196', fontSize: '0.8rem' }}>Choose a category for your feedback</div>

                    <div
                        style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginTop: '0.5rem', width: '94%', color: '#3A4374', backgroundColor: '#F7F8FD', border: 'none', borderRadius: '7px', padding: '0.8rem 0.8rem 0.8rem 1.1rem' }}
                        onClick={() => setIsOpenCategorySelect(!isOpenCategorySelect)}>
                        <div>{selectedCategory}</div>

                        <div>
                            <Image
                                src={isOpenCategorySelect ? iconArrowUpBlue : iconArrowDownBlue}
                                alt='icon-arrow'
                                style={{ cursor: 'pointer', marginRight: '0.6rem' }}
                            />
                        </div>
                    </div>

                    {/* category select */}
                    {isOpenCategorySelect &&
                        <div style={{ width: '100%', padding: '0 0.1rem', filter: 'drop-shadow(0px 8px 6px rgba(0,0,0,0.25))', zIndex: 100, marginTop: '0.5rem' }}>
                            {new Array('Feature', 'UI', 'UX', 'Enhancement', 'Bug').map((elem, i) => (
                                <SelectOption
                                    key={i}
                                    title={elem}
                                    i={i}
                                    selectedCategory={selectedCategory}
                                    setSelectedCategory={setSelectedCategory}
                                    setIsOpenCategorySelect={setIsOpenCategorySelect}
                                />
                            ))
                            }
                        </div>
                    }
                </div>

                {isOpenEditForm &&
                    <div style={{ marginTop: '1.5rem' }}>
                        <div style={{ fontWeight: 'bold', color: '#3A4374', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Update Status</div>

                        <div style={{ color: '#647196', fontSize: '0.8rem' }}>Change feature state</div>

                        <div
                            style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginTop: '0.5rem', width: '94%', color: '#3A4374', backgroundColor: '#F7F8FD', border: 'none', borderRadius: '7px', padding: '0.8rem 0.8rem 0.8rem 1.1rem' }}
                            onClick={() => setIsOpenStatusSelect?.(!isOpenStatusSelect)}>
                            <div>{selectedStatus}</div>

                            <div>
                                <Image
                                    src={isOpenStatusSelect ? iconArrowUpBlue : iconArrowDownBlue}
                                    alt='icon-arrow'
                                    style={{ cursor: 'pointer', marginRight: '0.6rem' }}
                                />
                            </div>
                        </div>

                        {/* status select */}
                        {isOpenEditForm && isOpenStatusSelect &&
                            <div style={{ width: '100%', padding: '0 0.1rem', filter: 'drop-shadow(0px 8px 6px rgba(0,0,0,0.25))', zIndex: 100, marginTop: '0.5rem' }}>
                                {new Array('Suggestion', 'Planned', 'In-Progress', 'Live').map((elem, i) => (
                                    <SelectOption
                                        key={i}
                                        title={elem}
                                        i={i}
                                        selectedStatus={selectedStatus}
                                        setSelectedStatus={setSelectedStatus}
                                        isOpenEditForm={isOpenEditForm}
                                        setIsOpenCategorySelect={setIsOpenCategorySelect}
                                        setIsOpenStatusSelect={setIsOpenStatusSelect}
                                    />
                                ))
                                }
                            </div>
                        }

                    </div>
                }

                <div style={{ marginTop: '1.5rem' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '0.8rem', color: '#3A4374', marginBottom: '0.3rem' }}>Feedback Detail</div>

                    <div style={{ color: '#647196', fontSize: '0.8rem' }}>Include any specific comments on what should be improved, added, etc.</div>

                    <Textarea
                        variant='flat'
                        minRows={4}
                        maxRows={8}
                        style={{ fontFamily: 'Arial', fontSize: '0.8rem', width: '94%', marginTop: '0.5rem', color: '#8C92B3', backgroundColor: '#F7F8FD', border: 'none', borderRadius: '12px', padding: '1rem', resize: 'none' }}
                        value={feedbackDetail}
                        onValueChange={setFeedbackDetail}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', marginBottom: '0.3rem' }}>
                    <div>
                        <button
                            style={{ display: 'flex', alignItems: 'center', backgroundColor: '#D73737', color: '#F2F4FE', border: 'none', padding: '0.6rem 1.1rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold', marginRight: '0.8rem' }}
                            onClick={deleteEntry}
                        >
                            Delete
                        </button>
                    </div>

                    <div style={{ display: 'flex' }}>
                        <Link href={isOpenEditForm ? '/viewFeedback' : '/'}>
                            <button
                                style={{ display: 'flex', alignItems: 'center', backgroundColor: '#3A4374', color: '#F2F4FE', border: 'none', padding: '0.6rem 1.1rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold', marginRight: '0.8rem' }}>
                                Cancel
                            </button>
                        </Link>

                        <button
                            style={{ display: 'flex', alignItems: 'center', backgroundColor: '#AD1FEA', color: '#F2F4FE', border: 'none', padding: '0.6rem 1.1rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}
                            onClick={() => isOpenEditForm ? editEntry?.(feedbackTitle, selectedCategory, selectedStatus!, feedbackDetail) : addEntry?.(feedbackTitle, selectedCategory, feedbackDetail)}
                        >
                            {submitBtnText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedbackForm;
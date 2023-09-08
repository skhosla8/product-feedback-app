// Base Imports
import React, { useState} from 'react';
import { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { addFeedbackEntry } from '@/store/slices/feedbackSlice';
import Router from 'next/router';
// Components
import FeedbackForm from '@/components/FeedbackForm';
// Icons/Images
import iconPlusWhite from '../assets/icon-plus-white.svg';

const CreateFeedback = () => {
    const [selectedCategory, setSelectedCategory] = useState('Feature');
    const [feedbackTitle, setFeedbackTitle] = useState('');
    const [feedbackDetail, setFeedbackDetail] = useState('');

    const data = useSelector((state: RootState) => state.feedback.allFeedback);

    const dispatch = useDispatch();

    const lastFeedbackEntryId = data.productRequests.find((elem) => elem.id === data.productRequests.length)?.id;

    const addEntry = (title: string, category: string, detail: string) => {
        let newEntry = {
            "id": lastFeedbackEntryId && lastFeedbackEntryId + 1,
            "title": title,
            "category": category.toLowerCase(),
            "upvotes": 0,
            "isUpvoted": false,
            "upvoteBtnColor": '#F2F4FE',
            "status": "suggestion",
            "description": detail,
        }

        dispatch(addFeedbackEntry({ newEntry }));
        Router.push('/');
    };

    return (
        <FeedbackForm
         addEntry={addEntry} 
         displayIcon={iconPlusWhite}
         title='Create New Feedback'
         submitBtnText='Add Feedback' 
         feedbackTitle={feedbackTitle}
         setFeedbackTitle={setFeedbackTitle}
         feedbackDetail={feedbackDetail}
         setFeedbackDetail={setFeedbackDetail}
         selectedCategory={selectedCategory}
         setSelectedCategory={setSelectedCategory}
         />
    )
}

export default CreateFeedback;
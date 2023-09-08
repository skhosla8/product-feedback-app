// Base Imports
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editFeedbackEntry, deleteFeedbackEntry } from '@/store/slices/feedbackSlice';
import { capitalizeStr } from '@/utilities';
import Router from 'next/router';
// Components 
import FeedbackForm from '@/components/FeedbackForm';
// Icons/Images
import iconEditFeedback from '../assets/icon-edit-feedback.svg';

const EditFeedback = () => {
    const [isOpenEditForm, setIsOpenEditForm] = useState(true);
    const [isOpenStatusSelect, setIsOpenStatusSelect] = useState(false);

    const currentEntry = JSON.parse(localStorage.getItem('current-feedback-entry') || '');

    const [selectedCategory, setSelectedCategory] = useState(capitalizeStr(currentEntry.category));
    const [selectedStatus, setSelectedStatus] = useState(capitalizeStr(currentEntry.status));
    const [feedbackTitle, setFeedbackTitle] = useState(currentEntry.title);
    const [feedbackDetail, setFeedbackDetail] = useState(currentEntry.description);

    const dispatch = useDispatch();

    const editEntry = (title: string, category: string, status: string, detail: string) => {
        let id = currentEntry.id;

        if (status === 'In-Progress') {
            status = status.replace('-', ' ');
        }

        let editedEntry = {
            "id": id,
            "title": title,
            "category": category.toLowerCase(),
            "upvotes": currentEntry.upvotes,
            "isUpvoted": currentEntry.isUpvoted,
            "upvoteBtnColor": currentEntry.upvoteBtnColor,
            "status": status?.toLowerCase(),
            "description": detail,
            "comments": currentEntry.comments
        }

        dispatch(editFeedbackEntry({ id, editedEntry }));
        Router.push('/');
    };

    const deleteEntry = () => {
        let id = currentEntry.id;
        
        dispatch(deleteFeedbackEntry({ id }));

        Router.push('/');
    };

    return (
        <FeedbackForm
            displayIcon={iconEditFeedback}
            isOpenEditForm={isOpenEditForm}
            title={`Editing '${currentEntry.title}'`}
            submitBtnText='Save Changes'
            isOpenStatusSelect={isOpenStatusSelect}
            setIsOpenStatusSelect={setIsOpenStatusSelect}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            feedbackTitle={feedbackTitle}
            setFeedbackTitle={setFeedbackTitle}
            feedbackDetail={feedbackDetail}
            setFeedbackDetail={setFeedbackDetail}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            editEntry={editEntry}
            deleteEntry={deleteEntry}
        />
    )
}

export default EditFeedback;
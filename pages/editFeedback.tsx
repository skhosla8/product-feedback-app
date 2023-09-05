// Base Imports
import React, { useState } from 'react';
import { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { editFeedbackEntry } from '@/store/slices/feedbackSlice';
import { capitalizeStr } from '@/utilities';
import Router from 'next/router';
// Components 
import FeedbackForm from '@/components/FeedbackForm';
// Icons/Images
import iconEditFeedback from '../assets/icon-edit-feedback.svg';
import { dataFocusVisibleClasses } from '@nextui-org/react';

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
        let formattedStatus;

        if (status === 'In-Progress') {
            formattedStatus = status.replace('-', ' ');
        }

        let editedEntry = {
            "id": id,
            "title": title,
            "category": category.toLowerCase(),
            "upvotes": currentEntry.upvotes,
            "status": formattedStatus?.toLowerCase(),
            "description": detail,
            "comments": currentEntry.comments
        }

        dispatch(editFeedbackEntry({ id, editedEntry }));
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
        />
    )
}

export default EditFeedback;
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper'

import imageAnne from '../../public/image-anne.png';
import imageElijah from '../../public/image-elijah.png';
import imageGeorge from '../../public/image-george.png';
import imageJackson from '../../public/image-jackson.png';
import imageJames from '../../public/image-james.png';
import imageJavier from '../../public/image-javier.png';
import imageRoxanne from '../../public/image-roxanne.png';
import imageRyan from '../../public/image-ryan.png';
import imageSuzanne from '../../public/image-suzanne.png';
import imageThomas from '../../public/image-thomas.png';
import imageVictoria from '../../public/image-victoria.png';
import imageZena from '../../public/image-zena.png';

import { FeedbackEntry } from '@/interfaces';

const initialData = {
    "currentUser": {
        "image": imageZena,
        "name": "Zena Kelley",
        "username": "velvetround"
    },
    "productRequests": [
        {
            "id": 1,
            "title": "Add tags for solutions",
            "category": "enhancement",
            "upvotes": 112,
            "isUpvoted": false,
            "upvoteBtnColor": "#F2F4FE",
            "status": "suggestion",
            "description": "Easier to search for solutions based on a specific stack.",
            "comments": [
                {
                    "id": 1,
                    "content": "Awesome idea! Trying to find framework-specific projects within the hubs can be tedious",
                    "user": {
                        "image": imageSuzanne,
                        "name": "Suzanne Chang",
                        "username": "upbeat1811"
                    }
                },
                {
                    "id": 2,
                    "content": "Please use fun, color-coded labels to easily identify them at a glance",
                    "user": {
                        "image": imageThomas,
                        "name": "Thomas Hood",
                        "username": "brawnybrave"
                    }
                }
            ]
        },
        {
            "id": 2,
            "title": "Add a dark theme option",
            "category": "feature",
            "upvotes": 99,
            "isUpvoted": false,
            "upvoteBtnColor": "#F2F4FE",
            "status": "suggestion",
            "description": "It would help people with light sensitivities and who prefer dark mode.",
            "comments": [
                {
                    "id": 3,
                    "content": "Also, please allow styles to be applied based on system preferences. I would love to be able to browse Frontend Mentor in the evening after my device’s dark mode turns on without the bright background it currently has.",
                    "user": {
                        "image": imageElijah,
                        "name": "Elijah Moss",
                        "username": "hexagon.bestagon"
                    }
                },
                {
                    "id": 4,
                    "content": "Second this! I do a lot of late night coding and reading. Adding a dark theme can be great for preventing eye strain and the headaches that result. It’s also quite a trend with modern apps and  apparently saves battery life.",
                    "user": {
                        "image": imageJames,
                        "name": "James Skinner",
                        "username": "hummingbird1"
                    },
                    "replies": [
                        {
                            "content": "While waiting for dark mode, there are browser extensions that will also do the job. Search for 'dark theme' followed by your browser. There might be a need to turn off the extension for sites with naturally black backgrounds though.",
                            "replyingTo": "hummingbird1",
                            "user": {
                                "image": imageAnne,
                                "name": "Anne Valentine",
                                "username": "annev1990"
                            }
                        },
                        {
                            "content": "Good point! Using any kind of style extension is great and can be highly customizable, like the ability to change contrast and brightness. I'd prefer not to use one of such extensions, however, for security and privacy reasons.",
                            "replyingTo": "annev1990",
                            "user": {
                                "image": imageRyan,
                                "name": "Ryan Welles",
                                "username": "voyager.344"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": 3,
            "title": "Q&A within the challenge hubs",
            "category": "feature",
            "upvotes": 65,
            "isUpvoted": false,
            "upvoteBtnColor": "#F2F4FE",
            "status": "suggestion",
            "description": "Challenge-specific Q&A would make for easy reference.",
            "comments": [
                {
                    "id": 5,
                    "content": "Much easier to get answers from devs who can relate, since they've either finished the challenge themselves or are in the middle of it.",
                    "user": {
                        "image": imageGeorge,
                        "name": "George Partridge",
                        "username": "soccerviewer8"
                    }
                }
            ]
        },
        {
            "id": 4,
            "title": "Add image/video upload to feedback",
            "category": "enhancement",
            "upvotes": 51,
            "isUpvoted": false,
            "upvoteBtnColor": "#F2F4FE",
            "status": "suggestion",
            "description": "Images and screencasts can enhance comments on solutions.",
            "comments": [
                {
                    "id": 6,
                    "content": "Right now, there is no ability to add images while giving feedback which isn't ideal because I have to use another app to show what I mean",
                    "user": {
                        "image": imageJavier,
                        "name": "Javier Pollard",
                        "username": "warlikeduke"
                    }
                },
                {
                    "id": 7,
                    "content": "Yes I'd like to see this as well. Sometimes I want to add a short video or gif to explain the site's behavior..",
                    "user": {
                        "image": imageRoxanne,
                        "name": "Roxanne Travis",
                        "username": "peppersprime32"
                    }
                }
            ]
        },
        {
            "id": 5,
            "title": "Ability to follow others",
            "category": "feature",
            "upvotes": 42,
            "isUpvoted": false,
            "upvoteBtnColor": "#F2F4FE",
            "status": "suggestion",
            "description": "Stay updated on comments and solutions other people post.",
            "comments": [
                {
                    "id": 8,
                    "content": "I also want to be notified when devs I follow submit projects on FEM. Is in-app notification also in the pipeline?",
                    "user": {
                        "image": imageVictoria,
                        "name": "Victoria Mejia",
                        "username": "arlen_the_marlin"
                    },
                    "replies": [
                        {
                            "content": "Bumping this. It would be good to have a tab with a feed of people I follow so it's easy to see what challenges they’ve done lately. I learn a lot by reading good developers' code.",
                            "replyingTo": "arlen_the_marlin",
                            "user": {
                                "image": imageZena,
                                "name": "Zena Kelley",
                                "username": "velvetround"
                            }
                        }
                    ]
                },
                {
                    "id": 9,
                    "content": "I've been saving the profile URLs of a few people and I check what they’ve been doing from time to time. Being able to follow them solves that",
                    "user": {
                        "image": imageJackson,
                        "name": "Jackson Barker",
                        "username": "countryspirit"
                    }
                }
            ]
        },
        {
            "id": 6,
            "title": "Preview images not loading",
            "category": "bug",
            "upvotes": 3,
            "isUpvoted": false,
            "upvoteBtnColor": "#F2F4FE",
            "status": "suggestion",
            "description": "Challenge preview images are missing when you apply a filter."
        },
        {
            "id": 7,
            "title": "More comprehensive reports",
            "category": "feature",
            "upvotes": 123,
            "isUpvoted": false,
            "upvoteBtnColor": "#F2F4FE",
            "status": "planned",
            "description": "It would be great to see a more detailed breakdown of solutions.",
            "comments": [
                {
                    "id": 10,
                    "content": "This would be awesome! It would be so helpful to see an overview of my code in a way that makes it easy to spot where things could be improved.",
                    "user": {
                        "image": imageVictoria,
                        "name": "Victoria Mejia",
                        "username": "arlen_the_marlin"
                    }
                },
                {
                    "id": 11,
                    "content": "Yeah, this would be really good. I'd love to see deeper insights into my code!",
                    "user": {
                        "image": imageJackson,
                        "name": "Jackson Barker",
                        "username": "countryspirit"
                    }
                }
            ]
        },
        {
            "id": 8,
            "title": "Learning paths",
            "category": "feature",
            "upvotes": 28,
            "isUpvoted": false,
            "upvoteBtnColor": "#F2F4FE",
            "status": "planned",
            "description": "Sequenced projects for different goals to help people improve.",
            "comments": [
                {
                    "id": 12,
                    "content": "Having a path through the challenges that I could follow would be brilliant! Sometimes I'm not sure which challenge would be the best next step to take. So this would help me navigate through them!",
                    "user": {
                        "image": imageGeorge,
                        "name": "George Partridge",
                        "username": "soccerviewer8"
                    }
                }
            ]
        },
        {
            "id": 9,
            "title": "One-click portfolio generation",
            "category": "feature",
            "upvotes": 62,
            "isUpvoted": false,
            "upvoteBtnColor": "#F2F4FE",
            "status": "in progress",
            "description": "Add ability to create professional looking portfolio from profile.",
            "comments": [
                {
                    "id": 13,
                    "content": "I haven't built a portfolio site yet, so this would be really helpful. Might it also be possible to choose layout and colour themes?!",
                    "user": {
                        "image": imageRyan,
                        "name": "Ryan Welles",
                        "username": "voyager.344"
                    }
                }
            ]
        },
        {
            "id": 10,
            "title": "Bookmark challenges",
            "category": "feature",
            "upvotes": 31,
            "isUpvoted": false,
            "upvoteBtnColor": "#F2F4FE",
            "status": "in progress",
            "description": "Be able to bookmark challenges to take later on.",
            "comments": [
                {
                    "id": 14,
                    "content": "This would be great! At the moment, I'm just starting challenges in order to save them. But this means the My Challenges section is overflowing with projects and is hard to manage. Being able to bookmark challenges would be really helpful.",
                    "user": {
                        "image": imageSuzanne,
                        "name": "Suzanne Chang",
                        "username": "upbeat1811"
                    }
                }
            ]
        },
        {
            "id": 11,
            "title": "Animated solution screenshots",
            "category": "bug",
            "upvotes": 9,
            "isUpvoted": false,
            "upvoteBtnColor": "#F2F4FE",
            "status": "in progress",
            "description": "Screenshots of solutions with animations don’t display correctly."
        },
        {
            "id": 12,
            "title": "Add micro-interactions",
            "category": "enhancement",
            "upvotes": 71,
            "isUpvoted": false,
            "upvoteBtnColor": "#F2F4FE",
            "status": "live",
            "description": "Small animations at specific points can add delight.",
            "comments": [
                {
                    "id": 15,
                    "content": "I'd love to see this! It always makes me so happy to see little details like these on websites.",
                    "user": {
                        "image": imageVictoria,
                        "name": "Victoria Mejia",
                        "username": "arlen_the_marlin"
                    },
                    "replies": [
                        {
                            "content": "Me too! I'd also love to see celebrations at specific points as well. It would help people take a moment to celebrate their achievements!",
                            "replyingTo": "arlen_the_marlin",
                            "user": {
                                "image": imageSuzanne,
                                "name": "Suzanne Chang",
                                "username": "upbeat1811"
                            }
                        }
                    ]
                }
            ]
        }
    ]
}

export const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: {
        allFeedback: initialData
    },
    reducers: {
        sortByUpvotes: (state, action) => {
            let sorted;

            if (action.payload.str === 'Most Upvotes') {
                sorted = [...state.allFeedback.productRequests].sort((a, b) => b.upvotes - a.upvotes);
            } else {
                sorted = [...state.allFeedback.productRequests].sort((a, b) => a.upvotes - b.upvotes);
            }

            return {
                ...state,
                allFeedback: {
                    ...state.allFeedback,
                    productRequests: sorted
                }
            };
        },
        sortByComments: (state, action) => {
            let sorted = [];
            let sortedFeedbackComments;

            const noFeedbackComments = [...state.allFeedback.productRequests].filter(elem => !(elem.comments)?.length);

            if (action.payload.str === 'Most Comments') {
                sortedFeedbackComments = [...state.allFeedback.productRequests]
                    .filter(elem => (elem.comments)?.length)
                    .sort((a, b) => (b.comments)!.length - (a.comments)!.length);

                sorted.push(...sortedFeedbackComments, ...noFeedbackComments);
            } else {
                sortedFeedbackComments = [...state.allFeedback.productRequests]
                    .filter(elem => (elem.comments)?.length)
                    .sort((a, b) => (a.comments)!.length - (b.comments)!.length);

                sorted.push(...noFeedbackComments, ...sortedFeedbackComments);
            }

            return {
                ...state,
                allFeedback: {
                    ...state.allFeedback,
                    productRequests: sorted
                }
            }
        },
        updateIsUpvotedFieldOnEntry: (state, action) => {
            const currentEntry = state.allFeedback.productRequests.find(elem => elem.id === action.payload.id);

            if (currentEntry!.hasOwnProperty('isUpvoted')) {
                currentEntry!.isUpvoted = true;
            }

            return state;
        },
        increaseUpvote: (state, action) => {
            const currentEntry = state.allFeedback.productRequests.find(elem => elem.id === action.payload.id);
            currentEntry!.upvotes += 1;

            return state;
        },
        handleUpvoteBtnColor: (state, action) => {
            const currentEntry = state.allFeedback.productRequests.find(elem => elem.id === action.payload.id);

            currentEntry!.upvoteBtnColor = '#4661E6';

            return state;
        },
        addCommentToFeedbackEntry: (state, action) => {
            const currentEntry: FeedbackEntry = state.allFeedback.productRequests.find(elem => elem.id === action.payload.id)!;

            if (currentEntry) {
                if (currentEntry.comments) {
                    currentEntry.comments.push(action.payload.comment);
                } else {
                    currentEntry['comments'] = [action.payload.comment];
                }
            }

            return state;
        },
        addReplyToComment: (state, action) => {
            const currentEntry: FeedbackEntry = state.allFeedback.productRequests.find(elem => elem.id === action.payload.currentEntryId)!;
            const currentComment = currentEntry && currentEntry.comments?.find(comment => comment.id === action.payload.ID);

            if (currentComment) {
                if (currentComment?.replies) {
                    currentComment && currentComment.replies?.push(action.payload.newReply);
                } else {
                    currentComment['replies'] = [action.payload.newReply];
                }
            }

            return state;
        },
        /*
        addReplyToReply: (state, action) => {
            const currentEntry: FeedbackEntry = state.allFeedback.productRequests.find(elem => elem.id === action.payload.currentEntryId)!;
            const currentComment = currentEntry && currentEntry.comments?.find(comment => comment.id === action.payload.id);
            const currentReply= currentComment && currentComment.replies?.find(reply => reply.user.username === action.payload.replyingToUsername);

            console.log(currentReply)

            if (currentReply) {
                if (currentReply.repliesToReplies) {
                    currentReply && currentReply.repliesToReplies.push(action.payload.newReplyToReply);
                }
                else {
                    currentReply['repliesToReplies'] = [action.payload.newReplyToReply];
                }
            }

            return state;
        },
        */
        addFeedbackEntry: (state, action) => {
            return {
                ...state,
                allFeedback: {
                    ...state.allFeedback,
                    productRequests: [
                        ...state.allFeedback.productRequests,
                        action.payload.newEntry
                    ]
                }
            }
        },
        editFeedbackEntry: (state, action) => {
            const currentEntryIndex = state.allFeedback.productRequests.findIndex(elem => elem.id === action.payload.id)!;

            state.allFeedback.productRequests.splice(currentEntryIndex, 1, action.payload.editedEntry);

            return state;
        },
        deleteFeedbackEntry: (state, action) => {
            const currentEntryIndex = state.allFeedback.productRequests.findIndex(elem => elem.id === action.payload.id)!;

            state.allFeedback.productRequests.splice(currentEntryIndex, 1);

            return state;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.feedback,
            };
        },
    },
});

export const {
    sortByUpvotes,
    sortByComments,
    updateIsUpvotedFieldOnEntry,
    increaseUpvote,
    handleUpvoteBtnColor,
    addCommentToFeedbackEntry,
    addReplyToComment,
    /*addReplyToReply,*/
    addFeedbackEntry,
    editFeedbackEntry,
    deleteFeedbackEntry
} = feedbackSlice.actions;
export default feedbackSlice.reducer;
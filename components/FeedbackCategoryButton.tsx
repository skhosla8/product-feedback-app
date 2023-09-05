// Base Imports
import React, { FC, ForwardedRef, MutableRefObject, Dispatch, SetStateAction, forwardRef } from 'react';

interface FeedbackCategoryButtonProps {
    i: number,
    ref: ForwardedRef<HTMLButtonElement | null>,
    feedbackEntryRefs: MutableRefObject<(HTMLButtonElement | null)[]>,
    setSelectedSuggestionCategory: Dispatch<SetStateAction<string | null>>
}

const FeedbackCategoryButton: FC<FeedbackCategoryButtonProps> = forwardRef<HTMLButtonElement, FeedbackCategoryButtonProps>(
    ({ i, feedbackEntryRefs, setSelectedSuggestionCategory }, ref) => {
        const filterEntries = (innerHTML: string) => {
            if (innerHTML === 'All') {
                setSelectedSuggestionCategory(null);
            } else {
                setSelectedSuggestionCategory(innerHTML.toLowerCase());
            }

            feedbackEntryRefs.current[i]!.style.backgroundColor = '#4661E6';
            feedbackEntryRefs.current[i]!.style.color = '#FFFFFF';

            for (const ref of feedbackEntryRefs.current) {
                if (ref!.innerHTML !== innerHTML) {
                    ref!.style.backgroundColor = '#F2F4FF';
                    ref!.style.color = '#4661E6';
                }
            }
        }

        const handleButtonText = (i: number) => {
            return i === 0 ? 'All' : i === 1 ? 'UI' : i === 2 ? 'UX' : i === 3 ? 'Enhancement' : i === 4 ? 'Bug' : 'Feature';
        };

        return (
            <button ref={ref} style={{
                border: 'none', backgroundColor: '#F2F4FF', color: '#4661E6', fontWeight: 'bold', fontSize: '0.75rem', padding: '0.5rem 1rem', borderRadius: '8px', marginBottom: '1rem', cursor:
                    'pointer', marginRight: '0.7rem'
            }} onClick={() => filterEntries(handleButtonText(i))}>{handleButtonText(i)}</button>
        )
    })

FeedbackCategoryButton.displayName = 'FeedbackCategoryButton';

export default FeedbackCategoryButton;
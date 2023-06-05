import Toaster from '@/utils/toaster';
import { useState, ChangeEvent, KeyboardEvent } from 'react';

interface Props {
    tags: string[];
    setTags: (tags: string[]) => void;
}
const TagsField = ({ tags, setTags }: Props) => {
    const [tagInput, setTagInput] = useState('');

    const handleTagInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTagInput(event.target.value);
    };

    const handleTagInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const newTag = tagInput.trim();
            if (newTag !== '') {
                if (tags.length < 5) {
                    if (!tags.includes(newTag)) {
                        setTags([...tags, newTag]);
                        setTagInput('');
                    }
                } else {
                    Toaster.error('Only 5 Tags allowed');
                }
            }
        }
    };

    const handleTagRemove = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div className="flex flex-wrap text-black bg-white items-center font-Helvetica gap-2 py-2 rounded-md">
            {tags.map((tag) => (
                <div
                    key={tag}
                    className="flex items-center justify-center px-2 py-1 border-[1px] rounded-md cursor-pointer"
                    onClick={() => handleTagRemove(tag)}
                >
                    {tag}
                    <svg
                        className="w-4 h-4 ml-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>
            ))}
            <input
                type="text"
                className="flex-1 p-2 outline-none"
                placeholder="Add tags"
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyDown={handleTagInputKeyDown}
            />
        </div>
    );
};

export default TagsField;

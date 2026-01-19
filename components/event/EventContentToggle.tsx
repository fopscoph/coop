'use client';

import { useState } from 'react';

export default function EventContentToggle({
    content,
}: {
    content: string;
}) {
    const [expanded, setExpanded] = useState(false);

    if (!content) return null;

    return (
        <div className="space-y-2">
            <button
                onClick={() => setExpanded(!expanded)}
                className="text-pink-600 text-sm font-medium hover:underline"
            >
                {expanded ? 'Show less' : 'Read more'}
            </button>

            <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    expanded
                        ? 'max-h-[5000px] opacity-100'
                        : 'max-h-0 opacity-0'
                }`}
            >
                <div
                    className="prose max-w-none pt-3 p-post-color"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </div>
        </div>
    );
}
import React, {useEffect, useState} from 'react';
import {PlayCircleIcon} from "@heroicons/react/24/outline";

interface TexthookedTextboxProps {
    text: string;
    ttsButton?: boolean;
    handleTtsFetchClicked: () => void;
}

const TexthookedTextbox: React.FC<TexthookedTextboxProps> = ({ text, ttsButton, fetchTtsEvent }) => {
    const fetchTTSButton = (
        <PlayCircleIcon className="text-blue-500 size-[24px] cursor-pointer" onClick={fetchTtsEvent} />
    );

    return (
        <div className="w-full
                mx-auto rounded-xl bg-white
                p-6
                shadow-lg outline outline-black/5">
            <div>
                <div className="flex flex-row items-center align-middle justify-center" style={ { gap: "8px" } }>
                    {ttsButton && <div className="flex-none texthooker-line-play-button">{fetchTTSButton}</div>}

                    <div className="flex-1 flex flex-col justify-around whitespace-pre-wrap">
                        <p className="flex-1">
                            {text}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TexthookedTextbox;
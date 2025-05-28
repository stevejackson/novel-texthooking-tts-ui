import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BeakerIcon} from "@heroicons/react/24/outline";
import {PlayCircleIcon} from "@heroicons/react/24/outline";

interface TexthookedTextboxProps {
    text: string;
    ttsButton?: boolean;
}


function getHTMLFromClipboardContents(clipboardContents) {
    console.log(clipboardContents);
    for (const item of clipboardContents) {
        // if (item.types.includes("text/html")) {
        //     const blob = item.getType("text/html");
        //     const blobText = blob.text();
        //     return blobText;
        // }

        if (item.types.includes("text/plain")) {
            // const blob = item.getType("text/plain");
            const blob = item;

            console.log("Logging plain text blob");
            console.log(blob);

            const blobText = blob.text();
            return blobText;
        }
    }

    return null;
}

const fetchData = async () => {
    const clipboardContents = await navigator.clipboard.readText().then((text) => {
        console.log("Clipboard text: ", text)
        return text;
    });

    return "";
}

const TexthookedTextbox: React.FC<TexthookedTextboxProps> = ({ text, ttsButton }) => {
    let [ttsFileUrl, setTtsFileUrl] = useState(null);
    const [clipboardContents, setClipboardContents] = useState(null);

    useEffect(() => {
        // fetchData().then(data => setClipboardContents(data));
    }, []);

    const handleTtsFetchClicked = (e) => {
        e.preventDefault();

        const post_data = {
            text: text,
            voice_id: localStorage.getItem("texthooker.ttsVoiceId")
        };

        axios({
            method: "post",
            url: "/api/v1/tts/fetch",
            data: post_data,
            config: { 'Content-Type': 'application/json', params: {} }})
            .then(response => {
                const url = response.data.tts_file_url;
                console.log("TTS File fetched, URL result: " + url);

                if(url) {
                    setTtsFileUrl(url);
                    let audio = new Audio(url);
                    audio.play();
                }
            });
    };


    const handleNewClipboardContentsEvent = (event) => {
        console.log (window.isSecureContext);


        navigator.clipboard
            .readText()
            .then((clipText) => (console.log(clipText)));
    }

    const fetchTTSButton = (
        <PlayCircleIcon className="text-blue-500 size-[24px] cursor-pointer" onClick={handleTtsFetchClicked} />
    );

    const fetchClipboardButton = false && (
        <a onClick={handleNewClipboardContentsEvent}
           className="text-red cursor-pointer">
            Fetch Clipboard
        </a>
    );

    return (
        <div className="w-full
                mx-auto rounded-xl bg-white
                p-6
                shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none
                dark:-outline-offset-1 dark:outline-white/10">
            <div>
                {fetchClipboardButton}

                <div className="flex flex-row items-center align-middle justify-center" style={ { gap: "8px" } }>
                    {ttsButton && <div className="flex-none texthooker-line-play-button">{fetchTTSButton}</div>}

                    <div className="flex-1 flex flex-col justify-around">
                        <p className="text-gray-500 dark:text-gray-400 flex-1">
                            {text}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TexthookedTextbox;
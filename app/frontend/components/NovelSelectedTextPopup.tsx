import React, {useEffect} from 'react';
import axios from "axios";
import {PlayCircleIcon} from "@heroicons/react/24/outline";
import VerticalDivider from "./utilities/VerticalDivider";

interface NovelSelectedTextPopupProps {
    selectedText: string;
}

const NovelSelectedTextPopup: React.FC<NovelSelectedTextPopupProps> = ({ selectedText }) => {
    const [translatedText, setTranslatedText] = React.useState();

    const handleTtsFetchClicked = (e) => {
        e.preventDefault();

        const post_data = {
            text: selectedText,
            voice_id: 1501
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
                    let audio = new Audio(url);
                    audio.play();
                }
            });
    };

    useEffect(() => {
        axios({
            method: "get",
            url: "/api/v1/fetch_translation",
            params: {
                text: selectedText,
                content_language: localStorage.getItem("novelReader.contentLanguage"),
                translation_language: localStorage.getItem("novelReader.translationLanguage")
            },
            config: { 'Content-Type': 'application/json', params: {} }})
            .then(response => {
                const result = response.data.translated_text;
                console.log(response.data);
                console.log("Translation fetched: " + result);

                if(result) {
                    setTranslatedText(result);
                }
            });
    });

    const fetchTTSButton = (
        <PlayCircleIcon className="text-blue-500 size-[24px]" onClick={handleTtsFetchClicked} />
    );

    return (
        <header className="sticky z-50 top-0 pl-5 pr-5 pt-2 pb-2 overflow-hidden">
            <div className="w-full
                            max-h-[300px]
                            p-6
                            mx-auto rounded-xl bg-white
                            cursor-pointer
                            shadow-xl outline outline-black/5 dark:bg-slate-800 dark:shadow-none
                            drop-shadow-xl/30
                            dark:-outline-offset-1 dark:outline-white/10">
                <div className="flex">
                    <div className="w-[48px]">
                        {fetchTTSButton}
                    </div>

                    <div className="flex-1">
                        {selectedText}
                    </div>

                    <VerticalDivider />

                    <div className="flex-1">
                        {translatedText}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NovelSelectedTextPopup;
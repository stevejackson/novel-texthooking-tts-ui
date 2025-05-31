import React, {useEffect} from 'react';
import axios from "axios";
import {PlayCircleIcon} from "@heroicons/react/24/outline";
import VerticalDivider from "./utilities/VerticalDivider";
import AddToAnkiModal from "./AddToAnkiModal";

interface NovelSelectedTextPopupProps {
    selectedText: string;
    contentLanguage: string;
    translationLanguage: string;
    ttsVoiceId: string;
    audioSpeed: string;
}

const NovelSelectedTextPopup: React.FC<NovelSelectedTextPopupProps> = ({ selectedText, contentLanguage, translationLanguage, ttsVoiceId, audioSpeed }) => {
    const [translatedText, setTranslatedText] = React.useState();
    const [ttsFileUrl, setTtsFileUrl] = React.useState(null);
    const [audioElement, setAudioElement] = React.useState<HTMLAudioElement | null>(null);

    const fetchTts = () => {
        if(ttsFileUrl) {
            audioElement.currentTime = 0;
            audioElement.play();
            return;
        }

        const post_data = {
            text: selectedText,
            voice_id: ttsVoiceId,
            audio_speed: audioSpeed,
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
                    setAudioElement(audio);
                    audio.play();
                }
            });
    }
    const handleTtsFetchClicked = (e) => {
        e.preventDefault();
        fetchTts();
    };

    useEffect(() => {
        axios({
            method: "get",
            url: "/api/v1/fetch_translation",
            params: {
                text: selectedText,
                content_language: contentLanguage,
                translation_language: translationLanguage,
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
        <PlayCircleIcon className="text-blue-500 size-[24px] cursor-pointer" onClick={handleTtsFetchClicked} />
    );

    return (
        <header className="sticky z-50 top-0 pl-5 pr-5 pt-2 pb-2 overflow-hidden">
            <div className="w-full
                            max-h-[300px]
                            p-6
                            mx-auto rounded-xl bg-white
                            cursor-pointer
                            shadow-xl outline outline-black/5 drop-shadow-xl/30">
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

                    <div>
                        {false && <AddToAnkiModal />}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NovelSelectedTextPopup;
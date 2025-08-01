import React, {useContext, useEffect} from 'react';
import axios from "axios";
import {PlayCircleIcon, StopCircleIcon} from "@heroicons/react/24/outline";
import VerticalDivider from "./utilities/VerticalDivider";
import AddToAnkiModal from "./AddToAnkiModal";
import {NovelReaderContext} from "./NovelReaderContext";

interface NovelSelectedTextPopupProps {
    selectedText: string;
    contentLanguage: string;
    translationLanguage: string;
    ttsVoiceId: string;
    audioSpeed: string;
}

const NovelSelectedTextPopup: React.FC<NovelSelectedTextPopupProps> = (
    { selectedText, contentLanguage, translationLanguage, ttsVoiceId, audioSpeed }
) => {
    const [translatedText, setTranslatedText] = React.useState();
    const [ttsFileUrl, setTtsFileUrl] = React.useState();
    const [autoplay, setAutoplay] = React.useState(localStorage.getItem("novelReader.autoplay") || "false");
    const fontSize = localStorage.getItem("novelReader.fontSize") || "16px";
    const { novelReaderState, setNovelReaderState } = useContext(NovelReaderContext);

    const fetchTts = () => {
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

                    if(novelReaderState.masterTTSAudio) {
                        novelReaderState.masterTTSAudio.pause();
                    }

                    let audio = new Audio(url);
                    setNovelReaderState({
                        ...novelReaderState,
                        masterTTSAudio: audio
                    })
                    audio.play();
                }
            });
    }

    const handleTtsFetchClicked = (e) => {
        e.preventDefault();
        fetchTts();
    };

    const toggleAutoplay = () => {
        const currentValue = localStorage.getItem("novelReader.autoplay") || "true";
        const newValue = currentValue === "true" ? "false" : "true";
        localStorage.setItem("novelReader.autoplay", newValue);
        setAutoplay(newValue);
    }

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

    const stopTTSAudio = () => {
        if(novelReaderState.masterTTSAudio) {
            novelReaderState.masterTTSAudio.pause();
        }
        setNovelReaderState({
            ...novelReaderState,
            currentlyPlayingParagraph: null
        });
    }

    const fetchTTSButton = (
        <PlayCircleIcon className="text-scheme5 hover:brightness-[120%] size-[24px] cursor-pointer" onClick={handleTtsFetchClicked} />
    );
    const stopAudioButton = (
        <StopCircleIcon className="text-scheme5 hover:brightness-[120%] size-[24px] cursor-pointer" onClick={stopTTSAudio} />
    );

    return (
        <header className="sticky z-50 top-0 px-3 lg:px-5 pt-2 pb-2 overflow-hidden max-w-6xl mx-auto">
            <div className="w-full
                            max-h-[300px]
                            p-2 lg:p-6
                            mx-auto rounded-xl bg-white
                            shadow-xl outline outline-black/5 drop-shadow-xl/30">
                <div className="flex border-b-[3px] border-gray-300">
                    <div className="h-75/100
                            min-h-75/100
                            w-[2px]
                            mr-[15px]
                            ml-[15px]
                            bg-neutral-300" />
                    <div className="flex-1">
                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox"
                                   checked={autoplay === "true" ? "checked" : null}
                                   className="sr-only peer"
                                   onChange={toggleAutoplay} />
                            <div
                                className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Autoplay</span>
                        </label>
                    </div>

                    <VerticalDivider />

                    <div className="flex-1">
                        {stopAudioButton}
                    </div>
                </div>

                <div className="flex">

                    <div className="w-[48px]">
                        {selectedText && fetchTTSButton}
                    </div>

                    <div className="flex-1" style={{ fontSize: fontSize }}>
                        {selectedText}
                    </div>

                    <VerticalDivider/>

                    <div className="flex-1" style={{ fontSize: fontSize }}>
                        {translatedText}
                    </div>

                    <div>
                        {selectedText &&
                            <AddToAnkiModal initialSentence={selectedText}
                                            initialTranslation={translatedText}
                                            initialAudioUrl={ttsFileUrl}
                                            ttsVoiceId={ttsVoiceId}
                            />
                        }
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NovelSelectedTextPopup;
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
    masterTTSAudio: HTMLAudioElement;
    setMasterTTSAudio: Function;
    masterTTSAudioText: string;
    setMasterTTSAudioText: Function;
}

const NovelSelectedTextPopup: React.FC<NovelSelectedTextPopupProps> = (
    { selectedText, contentLanguage, translationLanguage, ttsVoiceId, audioSpeed, masterTTSAudio, setMasterTTSAudio,
      masterTTSAudioText, setMasterTTSAudioText }
) => {
    const [translatedText, setTranslatedText] = React.useState();
    const [ttsFileUrl, setTtsFileUrl] = React.useState();
    const [previouslyFetchedAudioText, setPreviouslyFetchedAudioText] = React.useState();

    const fetchTts = () => {
        // if(previouslyFetchedAudioText === selectedText) {
        //     console.log("Using existing TTS audio instead of fetching new TTS");
        //     masterTTSAudio.currentTime = 0;
        //     masterTTSAudio.play();
        //     return;
        // }

        const post_data = {
            text: selectedText,
            voice_id: ttsVoiceId,
            audio_speed: audioSpeed,
        };

        setMasterTTSAudioText(null);

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
                    setPreviouslyFetchedAudioText(selectedText);

                    if(masterTTSAudio) {
                        masterTTSAudio.pause();
                    }

                    let audio = new Audio(url);
                    setMasterTTSAudio(audio);
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
        <PlayCircleIcon className="text-scheme5 hover:brightness-[120%] size-[24px] cursor-pointer" onClick={handleTtsFetchClicked} />
    );

    return (
        <header className="sticky z-50 top-0 pl-5 pr-5 pt-2 pb-2 overflow-hidden max-w-6xl mx-auto px-4">
            <div className="w-full
                            max-h-[300px]
                            p-6
                            mx-auto rounded-xl bg-white
                            shadow-xl outline outline-black/5 drop-shadow-xl/30">
                <div className="flex">
                    <div className="w-[48px]">
                        {selectedText && fetchTTSButton}
                    </div>

                    <div className="flex-1">
                        {selectedText}
                    </div>

                    <VerticalDivider />

                    <div className="flex-1">
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
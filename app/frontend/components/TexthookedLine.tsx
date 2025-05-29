import React, {useEffect} from 'react';
import TexthookedTextbox from "./TexthookedTextbox";
import axios from "axios";
import {useHotkeys} from "react-hotkeys-hook";

interface TexthookedLineProps {
    originalSourceText: string;
    isFirstLine: boolean;
}

const TexthookedLine: React.FC<TexthookedLineProps> = ({ originalSourceText, isFirstLine }) => {
    const [translatedText, setTranslatedText] = React.useState<string>();
    const [audioElement, setAudioElement] = React.useState<HTMLAudioElement | null>(null);

    useEffect(() => {
        axios({
            method: "get",
            url: "/api/v1/fetch_translation",
            params: {
                text: originalSourceText,
                content_language: localStorage.getItem("texthooker.contentLanguage"),
                translation_language: localStorage.getItem("texthooker.translationLanguage")
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

    const fetchTts = () => {
        const post_data = {
            text: originalSourceText,
            voice_id: localStorage.getItem("texthooker.ttsVoiceId"),
            audio_speed: localStorage.getItem("texthooker.audioSpeed"),
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
                    const el = new Audio(url);
                    setAudioElement(el);
                    el.play();
                }
            });
    };

    const fetchTtsEvent = (e) => {
        e.preventDefault();
        fetchTts();
    }

    const onSpacebarPress = (e) => {
        e.preventDefault();
        console.log("Spacebar pressed. Is this the first line? " + isFirstLine.toString());

        if(isFirstLine) {
            if(audioElement === null || audioElement === undefined) {
                fetchTts();
                return;
            }

            if(audioElement.currentTime > 0) {
                audioElement.pause();
                audioElement.currentTime = 0;
            }
            else {
                audioElement.play();
            }

        }
    }
    useHotkeys('space', onSpacebarPress);

    return (
        <>
            <TexthookedTextbox text={originalSourceText} ttsButton={true} fetchTtsEvent={fetchTtsEvent} />
            <TexthookedTextbox text={translatedText} ttsButton={false} />
        </>
    );
};

export default React.memo(TexthookedLine);
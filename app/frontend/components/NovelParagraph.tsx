import React, {useContext, useState} from 'react';
import {PlayCircleIcon, StopCircleIcon} from "@heroicons/react/24/outline";
import axios from "axios";
import { NovelReaderContext } from './NovelReaderContext';

interface NovelParagraphProps {
    sentences: Array<string>;
}

const NovelParagraph: React.FC<NovelParagraphProps> = ({ sentences }) => {
    const { novelReaderState, setNovelReaderState } = useContext(NovelReaderContext);

    const ttsContent = sentences.join(" ");

    const handleTtsFetchClicked = (e) => {
        e.preventDefault();

        const post_data = {
            text: ttsContent,
            voice_id: localStorage.getItem("novelReader.ttsVoiceId"),
            audio_speed: localStorage.getItem("novelReader.audioSpeed"),
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
                    if(novelReaderState.masterTTSAudio) {
                        novelReaderState.masterTTSAudio.pause();
                    }

                    let audio = new Audio(url);
                    setNovelReaderState({
                        ...novelReaderState,
                        masterTTSAudio: audio,
                        masterTTSAudioText: ttsContent
                    });

                    audio.play();
                    audio.addEventListener("ended", function() {
                        setNovelReaderState({
                            ...novelReaderState,
                            masterTTSAudioText: null
                        });
                    });
                }
            });
    };

    const fetchTTSButton = (
        <PlayCircleIcon className="text-scheme5 hover:brightness-[120%] size-[24px] cursor-pointer" onClick={handleTtsFetchClicked} />
    );

    let ttsStartStopButton = fetchTTSButton;

    return (
        <div className="flex mb-[12px]">
            <div className="pt-[2px]">
                {ttsStartStopButton}
            </div>

            <div className="flex-1 pl-[10px]">
                <div className={ttsContent === novelReaderState.masterTTSAudioText ? "bg-yellow-100" : null}>
                    {sentences.map((sentence) => (
                        <div>{sentence}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NovelParagraph;
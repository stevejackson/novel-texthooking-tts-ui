import React, {useContext, useState} from 'react';
import {PlayCircleIcon, StopCircleIcon} from "@heroicons/react/24/outline";
import axios from "axios";
import { NovelReaderContext } from './NovelReaderContext';

interface NovelParagraphProps {
    sentences: Array<string>;
    paragraphIndex: number;
}

const NovelParagraph: React.FC<NovelParagraphProps> = ({ paragraphIndex }) => {
    const { novelReaderState, setNovelReaderState } = useContext(NovelReaderContext);
    const fontSize = localStorage.getItem("novelReader.fontSize") || "16px";

    const playTTSByParagraphIndex = (paragraphIndex) => {
        console.log("Playing TTS for paragraph: ", paragraphIndex);

        if(paragraphIndex >= novelReaderState.paragraphs.length) {
            console.log("Stopping TTS playback, reached end of paragraphs");
            return;
        }

        const ttsContent = novelReaderState.paragraphs[paragraphIndex].join(" ");
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
                        currentlyPlayingParagraph: paragraphIndex
                    });

                    audio.play();
                    audio.addEventListener("ended", function() {
                        if(localStorage.getItem("novelReader.autoplay") === "true") {
                            playTTSByParagraphIndex(paragraphIndex + 1)
                        }
                        else {
                            setNovelReaderState({
                                ...novelReaderState,
                                currentlyPlayingParagraph: null
                            });
                        }
                    });
                }
            });
    }


    const handleTtsFetchClicked = (e) => {
        e.preventDefault();

        playTTSByParagraphIndex(paragraphIndex);
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
                <div className={paragraphIndex === novelReaderState.currentlyPlayingParagraph ? "bg-yellow-100" : null}>
                    {novelReaderState.paragraphs[paragraphIndex].map((sentence, idx) => (
                        <div key={idx} style={{ fontSize: fontSize }}>{sentence}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NovelParagraph;
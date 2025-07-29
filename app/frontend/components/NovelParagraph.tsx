import React, {useState} from 'react';
import {PlayCircleIcon, StopCircleIcon} from "@heroicons/react/24/outline";
import axios from "axios";

interface NovelParagraphProps {
    sentences: Array<string>;
    masterTTSAudio: HTMLAudioElement;
    setMasterTTSAudio: (audio: HTMLAudioElement) => void;
    masterTTSAudioText: string;
    setMasterTTSAudioText: (string) => void;
}

const NovelParagraph: React.FC<NovelParagraphProps> = ({ sentences, masterTTSAudio, setMasterTTSAudio, masterTTSAudioText, setMasterTTSAudioText }) => {
    // const [paragraphTtsAudio, setParagraphTtsAudio] = useState(null);

    const ttsContent = sentences.join(" ");

    const handleTtsFetchClicked = (e) => {
        e.preventDefault();

        /*
        if(masterTTSAudio !== null) {
            console.log("Already have this audio fetched.");

            if(paragraphTtsAudio.isPaused || paragraphTtsAudio.currentTime === 0) {
                console.log("It was paused. Playing again.");
                paragraphTtsAudio.play();
            }
            else {
                console.log("Pausing it.");
                paragraphTtsAudio.pause();
                paragraphTtsAudio.currentTime = 0;
            }
            return;
        }
        */

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
                    if(masterTTSAudio) {
                        masterTTSAudio.pause();
                    }

                    setMasterTTSAudioText(ttsContent);

                    let audio = new Audio(url);
                    setMasterTTSAudio(audio);
                    audio.play();

                    audio.addEventListener("ended", function() {
                        setMasterTTSAudioText(null);
                    });
                }
            });
    };

    const fetchTTSButton = (
        <PlayCircleIcon className="text-scheme5 hover:brightness-[120%] size-[24px] cursor-pointer" onClick={handleTtsFetchClicked} />
    );

    const stopTTSButton = (
        <StopCircleIcon className="text-scheme5 hover:brightness-[120%] size-[24px]" onClick={() => masterTTSAudio.pause()} />
    )

    let ttsStartStopButton = fetchTTSButton;

    return (
        <div className="flex mb-[12px]">
            <div className="pt-[2px]">
                {ttsStartStopButton}
            </div>

            <div className="flex-1 pl-[10px]">
                <div className={ttsContent === masterTTSAudioText ? "bg-yellow-100" : null}>
                    {sentences.map((sentence) => (
                        <div>{sentence}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NovelParagraph;
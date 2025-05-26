import React, {useState} from 'react';
import {PlayCircleIcon, StopCircleIcon} from "@heroicons/react/24/outline";
import axios from "axios";

interface NovelParagraphProps {
    sentences: Array<string>;
}

const NovelParagraph: React.FC<NovelParagraphProps> = ({ sentences }) => {
    const [paragraphTtsAudio, setParagraphTtsAudio] = useState(null);

    const handleTtsFetchClicked = (e) => {
        e.preventDefault();

        if(paragraphTtsAudio !== null) {
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

        const post_data = {
            text: sentences.join(" "),
            voice_id: localStorage.getItem("novelReader.ttsVoiceId")
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
                    setParagraphTtsAudio(audio);
                    audio.play();
                }
            });
    };

    const fetchTTSButton = (
        <PlayCircleIcon className="text-blue-500 size-[24px]" onClick={handleTtsFetchClicked} />
    );

    const stopTTSButton = (
        <StopCircleIcon className="text-blue-500 size-[24px]" onClick={() => paragraphTtsAudio.pause()} />
    )

    let ttsStartStopButton = fetchTTSButton;

    // if(paragraphTtsAudio !== null && paragraphTtsAudio.duration > 0 && !paragraphTtsAudio.paused) {
    //     ttsStartStopButton = fetchTTSButton;
    // }
    // else {
    //     ttsStartStopButton = stopTTSButton;
    // }

    return (
        <div className="flex m-[12px]">
            <div className="w-[48px]">
                {ttsStartStopButton}
            </div>

            <div className="flex-1">
                {sentences.map((sentence) => (
                    <div>{sentence}</div>
                ))}
            </div>
        </div>
    );
};

export default NovelParagraph;
import React, {useEffect} from 'react';
import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { useState } from "react";
import axios from "axios";

interface AddToAnkiModalProps {
}

const AddToAnkiModal: React.FC<AddToAnkiModalProps> = ({ initialSentence, initialTranslation, initialAudioUrl, ttsVoiceId }) => {
    const [modalOpened, setModalOpened] = useState(false);
    const [sentence, setSentence] = useState(initialSentence);
    const [translation, setTranslation] = useState(initialTranslation);
    const [audioUrl, setAudioUrl] = useState(initialAudioUrl);
    const [audioSpeed, setAudioSpeed] = useState("1.0");
    const [audioElement, setAudioElement] = React.useState<HTMLAudioElement | null>();
    const [awaitingSubmissionResult, setAwaitingSubmissionResult] = useState(false);
    const [submissionResult, setSubmissionResult] = useState(null);
    const [submissionResultErrorMessage, setSubmissionResultErrorMessage] = useState(null);

    document.getElementById("anki-deck-name").dataset.name = localStorage.getItem("anki.deckName");

    const openModal = () => {
        setSentence(initialSentence);
        setTranslation(initialTranslation);
        setAudioUrl(initialAudioUrl);
        setAwaitingSubmissionResult(false)
        setSubmissionResult(null);

        setModalOpened(true);
    }

    function onCloseModal() {
        setModalOpened(false);
    }

    const onSubmit = () => {
        // Set the data in a DDOM element; the chrome extension is monitoring this element for changes, and will
        // then submit it to anki.
        const rootAnkiSubmissionObserved = document.getElementById("root-anki-submission-observed");
        rootAnkiSubmissionObserved.dataset.sentence = sentence;
        rootAnkiSubmissionObserved.dataset.translation = translation;
        rootAnkiSubmissionObserved.dataset.audioUrl = audioUrl;

        setAwaitingSubmissionResult(true);

        // Monitor a DOM element to receive success/error of anki card creation
        let observer = new MutationObserver((mutations) => {
            const el = document.getElementById("root-anki-submission-result-observed");
            console.log("Anki submission result observed has changed, result: ", el.dataset.response);

            setSubmissionResult(el.dataset.result);
            setSubmissionResultErrorMessage(el.dataset.resultData);
        });

        observer.observe(document.getElementById("root-anki-submission-result-observed"), {
            attributes: true,
            childList: false,
            subtree: false
        });
    }

    const generateTtsAudio = () => {
        const post_data = {
            text: sentence,
            voice_id: ttsVoiceId,
            audio_speed: audioSpeed,
        };

        axios({
            method: "post",
            url: "/api/v1/tts/fetch",
            data: post_data,
            config: {'Content-Type': 'application/json', params: {}}
        })
            .then(response => {
                const url = response.data.tts_file_url;
                console.log("TTS File fetched, URL result: " + url);

                if (url) {
                    setAudioUrl(url);

                    let audio = new Audio(url);
                    setAudioElement(audio);
                    audio.play();
                }
            });
    }

    const missingRequiredFields = !sentence || !translation || !audioUrl;

    const awaitingResponseButton = (
        <Button disabled={true}>
            <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"/>
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        </Button>);

    let modalBody = null;

    if(submissionResult === 'success') {
        modalBody = <div><span className="text-green-500">Successfully added card to Anki.</span></div>;
    }
    else if(submissionResult === 'error') {
        modalBody = <div><span className="text-red-500">Failed to add card to Anki</span>. Check browser console for more details. Error message: {submissionResultErrorMessage}</div>;
    }
    else {
        modalBody = (
            <div className="space-y-6">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="sentence">Sentence</Label>
                    </div>
                    <TextInput
                        id="sentence"
                        value={sentence}
                        onChange={(event) => setSentence(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="translation">Translation</Label>
                    </div>
                    <TextInput
                        id="translation"
                        value={translation}
                        onChange={(event) => setTranslation(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="Audio">Audio</Label>
                        <div>
                            <Button size="xs" onClick={generateTtsAudio} className="bg-scheme2 hover:bg-scheme2-brightened">
                                Regenerate Audio & Play
                            </Button>
                        </div>

                        <p className="text-xs text-gray-400">{audioUrl}</p>
                    </div>
                </div>

                <div>
                    <div className="mb-2 block relative">
                        <label htmlFor="audio-speed"
                               className="block mb-2 text-sm font-medium text-gray-900">
                            Audio Speed: {audioSpeed}x
                        </label>
                        <input id="audio-speed" type="range"
                               min="0.5" max="1.5" onChange={(e) => setAudioSpeed(e.target.value)}
                               step="0.1"
                               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                        <span className="text-sm absolute start-0 -bottom-6">0.5x</span>
                        <span className="text-sm absolute end-0 -bottom-6">1.5x</span>
                    </div>
                </div>

                <div className="w-full pt-[15px]">
                    {!awaitingSubmissionResult &&
                        <Button onClick={onSubmit} disabled={missingRequiredFields} className="bg-scheme2 hover:bg-scheme2-brightened">
                            Add to Anki
                        </Button>}
                    {awaitingSubmissionResult && awaitingResponseButton}
                </div>
            </div>
        );
    }

    return (
        <>
            <Button className="bg-scheme2 hover:bg-scheme2-brightened" onClick={openModal}>Create Anki Card</Button>

            <Modal show={modalOpened} size="md" onClose={onCloseModal} popup>
                <ModalHeader>
                    <h2 className="text-scheme2">Create Anki Card</h2>
                </ModalHeader>

                <ModalBody>
                    {modalBody}
                </ModalBody>
            </Modal>
        </>
    );
}

export default AddToAnkiModal;
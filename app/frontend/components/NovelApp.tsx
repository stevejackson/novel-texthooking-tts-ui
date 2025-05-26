import React, {useEffect, useState} from 'react';
import { useHotkeys } from 'react-hotkeys-hook'
import axios from "axios";
import NovelParagraph from "./NovelParagraph";
import NovelSelectedTextPopup from "./NovelSelectedTextPopup";

const NovelApp = () => {
    const [novelParagraphs, setNovelParagraphs] = React.useState([]);
    const [selection, setSelection] = React.useState("");

    const fetchFromClipboard = async () => {
        const clipboardContent = await navigator.clipboard.readText();
        console.log("Clipboard content: ", clipboardContent);

        if(confirm("Replace novel text with clipboard contents?")) {
            console.log("Confirmed. Replacing novel text with clipboard contents.");
            console.log("New Novel text: ");
            console.log(clipboardContent)

            let splitByLineBreaks  = clipboardContent.split("\n");
            splitByLineBreaks = splitByLineBreaks.filter((line) => line.length > 0);
            console.log(splitByLineBreaks);

            axios({
                method: "post",
                url: "/api/v1/segment_paragraphs",
                data: {
                    paragraphs: splitByLineBreaks
                },
                config: { 'Content-Type': 'application/json', params: {} }})
                .then(response => {
                    const paragraphs = response.data.paragraphs;
                    console.log("API responded with segmented paragraphs: ");
                    console.log(paragraphs);

                    if(paragraphs !== null && paragraphs.length > 0) {
                        console.log("Affirm");
                        setNovelParagraphs(paragraphs);
                    }
                });
        }
        else {
            console.log("User decided not to replace novel text with clipboard contents.");
        }
    }

    useHotkeys('meta+v, ctrl+v', fetchFromClipboard);

    const updateSelection = (e) => {
        setTimeout(() => setSelection(window.getSelection().toString(), 100));
    }

    const initializeDefaultSettings = () => {
        const novelReaderContentLanguage = localStorage.getItem("novelReader.contentLanguage");
        const novelReaderTranslationLanguage = localStorage.getItem("novelReader.translationLanguage");
        const novelReaderTTSVoiceId = localStorage.getItem("novelReader.ttsVoiceId");

        if(novelReaderContentLanguage === undefined || novelReaderContentLanguage === null) {
            localStorage.setItem("novelReader.contentLanguage", "EN");
        }

        if(novelReaderTranslationLanguage === undefined || novelReaderTranslationLanguage === null) {
            localStorage.setItem("novelReader.translationLanguage", "ZH-HANS");
        }

        if(novelReaderTTSVoiceId === undefined || novelReaderTTSVoiceId === null) {
            localStorage.setItem("novelReader.ttsVoiceId", "2402");
        }
    }

    useEffect(() => {
        document.addEventListener("contextmenu", updateSelection);
        initializeDefaultSettings();
    }, []);

    return (
        <div className="flex flex-col min-h-screen w-screen
                      bg-gray-950/[4.5%]
                      bg-[radial-gradient(circle,#73737350_1px,transparent_1px)]
                      bg-[size:10px_10px]
                      absolute -z--10">
            {selection && <NovelSelectedTextPopup selectedText={selection} />}

            <div className="flex-grow">
                <main id="app-container"
                      className="pl-5 pr-5 pt-2 pb-2">
                    <div className="w-full
                        mx-auto rounded-xl bg-white
                        p-6 cursor-pointer
                        shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none
                        dark:-outline-offset-1 dark:outline-white/10">

                        {(novelParagraphs === null || novelParagraphs.length === 0) && (
                            <div>
                                No novel has been pasted in yet.
                                &nbsp;<a href="#" className="text-blue-500" onClick={fetchFromClipboard}>Fetch from clipboard now?</a>
                            </div>
                        )}

                        <div className="whitespace-pre-wrap"
                             onClick={updateSelection}>
                            {novelParagraphs.map((paragraph) =>
                                <NovelParagraph sentences={paragraph}/>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default NovelApp;
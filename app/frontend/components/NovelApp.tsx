import React, {useEffect, useState} from 'react';
import { useHotkeys } from 'react-hotkeys-hook'
import axios from "axios";
import NovelParagraph from "./NovelParagraph";
import NovelSelectedTextPopup from "./NovelSelectedTextPopup";
import RoundedContentBox from "./utilities/RoundedContentBox";

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

            let splitByLineBreaks = clipboardContent.split("\n");
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

    useEffect(() => {
        document.addEventListener("contextmenu", updateSelection);
    }, []);

    return (
        <div className="flex flex-col min-h-screen w-screen
                      bg-gray-950/[4.5%]
                      bg-[radial-gradient(circle,#73737350_1px,transparent_1px)]
                      bg-[size:10px_10px]
                      absolute -z--10
                      text-gray-800">
            {selection && <NovelSelectedTextPopup selectedText={selection}
                                                  contentLanguage={localStorage.getItem("novelReader.contentLanguage")}
                                                  translationLanguage={localStorage.getItem("novelReader.translationLanguage")}
                                                  ttsVoiceId={localStorage.getItem("novelReader.ttsVoiceId")}
                                                  audioSpeed={localStorage.getItem("novelReader.audioSpeed")}
            />}

            <RoundedContentBox>
                {(novelParagraphs === null || novelParagraphs.length === 0) && (
                    <div>
                        No novel has been pasted in yet.
                        &nbsp;<a href="#" onClick={fetchFromClipboard}>Fetch from clipboard now?</a>
                    </div>
                )}

                <div className="whitespace-pre-wrap"
                     onClick={updateSelection}>
                    {novelParagraphs.map((paragraph) =>
                        <NovelParagraph sentences={paragraph}/>
                    )}
                </div>
            </RoundedContentBox>

            <RoundedContentBox>
                <a href="/dashboard">Back to Dashboard</a>
            </RoundedContentBox>
        </div>
    );
};

export default NovelApp;
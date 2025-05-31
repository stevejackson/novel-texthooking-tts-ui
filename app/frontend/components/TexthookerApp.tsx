import React, {useEffect, useRef, useState} from 'react';
import TexthookedLine from "./TexthookedLine";
import {useHotkeys} from "react-hotkeys-hook";
import NovelSelectedTextPopup from "./NovelSelectedTextPopup";

const TexthookerApp = () => {
    const [texthookedLines, setTexthookedLines] = React.useState([]);
    const clipboardPollTimeoutId = useRef(null);
    const [selection, setSelection] = React.useState("");

    useEffect(() => {
        clearTimeout(clipboardPollTimeoutId.current);

        // This won't work in firefox; it doesn't allow reading clipboard data without direct user interaction.
        const startClipboardPoll = async () => {
            let clipboardContent;

            // Comment the following line
            // if you want to run <CODE> when clipboard change from other pages
            // (when the user focus back on your app)
            // window.onfocus = async function () { clipboardContent = await navigator.clipboard.readText() }

            while (true) {
                let pollingInterval = 500;
                await new Promise(r => {
                    clipboardPollTimeoutId.current = setTimeout(r, pollingInterval);
                });
                console.info(`Checking clipboard for update each ${pollingInterval}ms...`);

                const previousContent = clipboardContent;
                try {
                    clipboardContent = await navigator.clipboard.readText()
                } catch (e) {
                    // This function may fail if you focus another webpage
                    // just ignoring and continuing.
                    continue;
                }

                if (previousContent == undefined) {
                    continue;
                }

                if (clipboardContent !== previousContent) {
                    console.log("Clipboard content changed. New content: ", clipboardContent);
                    setTexthookedLines([clipboardContent, ...texthookedLines]);
                }
            }
        }

        startClipboardPoll();

        return () => {
            clearTimeout(clipboardPollTimeoutId.current);
        };
    });

    const updateSelection = (e) => {
        setTimeout(() => setSelection(window.getSelection().toString(), 100));
    }

    const strToHashCode = (s) => {
        for(var i = 0, h = 0; i < s.length; i++) {
          h = Math.imul(31, h) + s.charCodeAt(i) | 0;
        }
        return h;
    }

    console.log("Rendering texthooker app with the following lines: ", texthookedLines);


    return (
        <main id="app-container"
              className="w-screen bg-gray-950/[4.5%]
              bg-[radial-gradient(circle,#73737350_1px,transparent_1px)]
              bg-[size:10px_10px]
              absolute -z--10
              text-gray-800">
            {selection && <NovelSelectedTextPopup selectedText={selection}
                                                  contentLanguage={localStorage.getItem("texthooker.contentLanguage")}
                                                  translationLanguage={localStorage.getItem("texthooker.translationLanguage")}
                                                  ttsVoiceId={localStorage.getItem("texthooker.ttsVoiceId")}
                                                  audioSpeed={localStorage.getItem("texthooker.audioSpeed")}
            />}
            <div className="grid grid-flow-row auto-rows-max grid-cols-2 gap-4 mx-auto pl-5 pr-5 pt-2 pb-2"
                 onClick={updateSelection}>
                {texthookedLines.map((text, index) =>
                    <TexthookedLine key={strToHashCode(text)} originalSourceText={text} isFirstLine={index === 0} />)}

                {texthookedLines.length === 0 && (
                    <div className="w-full
                                    mx-auto rounded-xl bg-white
                                    p-6
                                    shadow-lg outline outline-black/5">
                        When new text is copied to the clipboard, you should see this page update.
                    </div>
                )}
            </div>
        </main>
    );
};

export default TexthookerApp;
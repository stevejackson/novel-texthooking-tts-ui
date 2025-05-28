import React, {useEffect, useState} from 'react';
import TexthookedLine from "./TexthookedLine";

const TexthookerApp = () => {
    const [texthookedLines, setTexthookedLines] = React.useState([]);

    useEffect(() => {
        // This won't work in firefox; it doesn't allow reading clipboard data without direct user interaction.
        const startClipboardPoll = async () => {
            let clipboardContent;

            // Comment the following line
            // if you want to run <CODE> when clipboard change from other pages
            // (when the user focus back on your app)
            // window.onfocus = async function () { clipboardContent = await navigator.clipboard.readText() }

            while (true) {
                await new Promise(r => setTimeout(r, 500)) // wait
                console.info("Checking clipboard for update...");

                const previousContent = clipboardContent;
                try {
                    clipboardContent = await navigator.clipboard.readText()
                } catch (e) {
                    // This function may fail if you focus another webpage
                    // just ignoring and continuing.
                    continue
                }

                if (previousContent == undefined) {
                    continue
                }

                if (clipboardContent !== previousContent) {
                    console.log("Clipboard content changed. New content: ", clipboardContent);

                    setTexthookedLines([...texthookedLines, clipboardContent]);
                }
            }
        }

        startClipboardPoll();
    });

    return (
        <main id="app-container"
              className="w-screen bg-gray-950/[4.5%]
              bg-[radial-gradient(circle,#73737350_1px,transparent_1px)]
              bg-[size:10px_10px]
              absolute -z--10
              pl-5 pr-5 pt-2 pb-2">
            <div className="grid grid-flow-row auto-rows-max grid-cols-2 gap-4 mx-auto">
                {texthookedLines.reverse().map(text => <TexthookedLine originalSourceText={text} />)}

                {texthookedLines.length === 0 && (
                    <div className="w-full
                                    mx-auto rounded-xl bg-white
                                    p-6
                                    shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none
                                    dark:-outline-offset-1 dark:outline-white/10">
                        When new text is copied to the clipboard, you should see this page update.
                    </div>
                )}
            </div>
        </main>
    );
};

export default TexthookerApp;
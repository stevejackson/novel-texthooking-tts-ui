import React, {useContext, useEffect, useMemo, useState} from 'react';
import NovelParagraph from "./NovelParagraph";
import NovelSelectedTextPopup from "./NovelSelectedTextPopup";
import RoundedContentBox from "./utilities/RoundedContentBox";
import { useQuery, gql } from "@apollo/client";
import { NovelReaderContext } from './NovelReaderContext';

const NovelApp = () => {
    const [selection, setSelection] = React.useState("");

    // Default state
    const [novelReaderState, setNovelReaderState] = useState({
        masterTTSAudio: null,
        masterTTSAudioText: null,
        currentlyPlayingParagraph: null,
        paragraphs: null
    });

    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    const selectionEvent = {
        updateSelection() {
            const text = document.getSelection().toString();
            if(text === "") {
                // If text is deselected e.g. by playing audio or something, don't remove the popup.
                return;
            }
            console.log("Selected text: " + text);
            setSelection(text);
            this.timeoutID = undefined;
        },

        setup() {
            if (typeof this.timeoutID === "number") {
                this.cancel();
            }

            this.timeoutID = setTimeout(this.updateSelection, 800);
        },

        cancel() {
            clearTimeout(this.timeoutID);
        },
    };


    useEffect(() => {
        document.addEventListener("selectionchange", () => selectionEvent.setup());
    }, []);

    const GET_READABLE_TEXT = gql`
                  query readableText($id: ID!) {
                    fetchReadableText(id: $id) {
                      id
                      name
                      language
                      content
                      segmentedParagraphs
                    }
                  }`;

    const {error, loading, data} = useQuery(GET_READABLE_TEXT, {
        variables: {id: params.id}
    });

    console.log({error, loading, data});

    useEffect(() => {
        if(data && data.fetchReadableText) {
            setNovelReaderState({
                ...novelReaderState,
                paragraphs: data.fetchReadableText.segmentedParagraphs
            });
        }
    }, [data]);

    if (loading) {
        return <div>Loading text...</div>
    }

    if(!params.id) {
        return (
            <div>
                Please visit <a href="/readable_texts">here</a> to select a text to read.
            </div>
        )
    }

    return (
        <NovelReaderContext.Provider value={{ novelReaderState, setNovelReaderState }}>
            <NovelSelectedTextPopup selectedText={selection}
                                    contentLanguage={localStorage.getItem("novelReader.contentLanguage")}
                                    translationLanguage={localStorage.getItem("novelReader.translationLanguage")}
                                    ttsVoiceId={localStorage.getItem("novelReader.ttsVoiceId")}
                                    audioSpeed={localStorage.getItem("novelReader.audioSpeed")}
            />

            <RoundedContentBox>
                <div className="whitespace-pre-wrap">
                    {novelReaderState.paragraphs && novelReaderState.paragraphs.map((paragraph, index) =>
                        <NovelParagraph key={index} paragraphIndex={index} sentences={paragraph} />
                    )}
                </div>
            </RoundedContentBox>
        </NovelReaderContext.Provider>
    );
};

export default NovelApp;
import React, {useEffect, useState} from 'react';
import NovelParagraph from "./NovelParagraph";
import NovelSelectedTextPopup from "./NovelSelectedTextPopup";
import RoundedContentBox from "./utilities/RoundedContentBox";
import { useQuery, gql } from "@apollo/client";

const NovelApp = () => {
    const [selection, setSelection] = React.useState("");

    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

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

    const { error, loading, data } = useQuery(GET_READABLE_TEXT, {
       variables: { id: params.id }
    });

    console.log({ error, loading, data });

    const selectionEvent = {
        updateSelection() {
            const text = document.getSelection().toString();
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

    if(loading) {
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
        <>
            {selection && <NovelSelectedTextPopup selectedText={selection}
                                                  contentLanguage={localStorage.getItem("novelReader.contentLanguage")}
                                                  translationLanguage={localStorage.getItem("novelReader.translationLanguage")}
                                                  ttsVoiceId={localStorage.getItem("novelReader.ttsVoiceId")}
                                                  audioSpeed={localStorage.getItem("novelReader.audioSpeed")}
            />}

            <RoundedContentBox>
                <div className="whitespace-pre-wrap">
                    {data.fetchReadableText.segmentedParagraphs.map((paragraph) =>
                        <NovelParagraph sentences={paragraph}/>
                    )}
                </div>
            </RoundedContentBox>
        </>
    );
};

export default NovelApp;
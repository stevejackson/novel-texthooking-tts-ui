import React, {useEffect} from 'react';
import TexthookedTextbox from "./TexthookedTextbox";
import axios from "axios";

interface TexthookedLineProps {
    originalSourceText: string;
}

const TexthookedLine: React.FC<TexthookedLineProps> = ({ originalSourceText }) => {
    const [translatedText, setTranslatedText] = React.useState<string>();

    useEffect(() => {
        axios({
            method: "get",
            url: "/api/v1/fetch_translation",
            params: {
                text: originalSourceText,
                content_language: localStorage.getItem("texthooker.contentLanguage"),
                translation_language: localStorage.getItem("texthooker.translationLanguage")
            },
            config: { 'Content-Type': 'application/json', params: {} }})
            .then(response => {
                const result = response.data.translated_text;
                console.log(response.data);
                console.log("Translation fetched: " + result);

                if(result) {
                    setTranslatedText(result);
                }
            });
    });

    return (
        <>
            <TexthookedTextbox text={originalSourceText} ttsButton={true} />
            <TexthookedTextbox text={translatedText} ttsButton={false} />
        </>
    );
};

export default React.memo(TexthookedLine);
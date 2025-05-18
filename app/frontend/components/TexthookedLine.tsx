import React from 'react';
import TexthookedTextbox from "~/components/TexthookedTextbox";

interface TexthookedLineProps {
    originalSourceText: string;
}

const TexthookedLine: React.FC<TexthookedLineProps> = ({ originalSourceText }) => {
    return (
        <>
            <TexthookedTextbox text={originalSourceText} ttsButton={true} />
            <TexthookedTextbox text={originalSourceText} ttsButton={false} />
        </>
    );
};

export default TexthookedLine;
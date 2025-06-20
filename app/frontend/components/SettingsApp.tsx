import React, {useEffect, useState} from 'react';
import RoundedContentBox from "./utilities/RoundedContentBox";
import { Button, Checkbox, Label, TextInput, Select} from "flowbite-react";

const SettingsApp = () => {
    const [novelReaderTtsVoiceId, setNovelReaderTtsVoiceId] = useState(localStorage.getItem("novelReader.ttsVoiceId"));
    const [novelReaderContentLanguage, setNovelReaderContentLanguage] = useState(localStorage.getItem("novelReader.contentLanguage"));
    const [novelReaderTranslationLanguage, setNovelReaderTranslationLanguage] = useState(localStorage.getItem("novelReader.translationLanguage"));
    const [novelReaderAudioSpeed, setNovelReaderAudioSpeed] = useState(localStorage.getItem("novelReader.audioSpeed"));

    const [texthookerTtsVoiceId, setTexthookerTtsVoiceId] = useState(localStorage.getItem("texthooker.ttsVoiceId"));
    const [texthookerContentLanguage, setTexthookerContentLanguage] = useState(localStorage.getItem("texthooker.contentLanguage"));
    const [texthookerTranslationLanguage, setTexthookerTranslationLanguage] = useState(localStorage.getItem("texthooker.translationLanguage"));
    const [texthookerAudioSpeed, setTexthookerAudioSpeed] = useState(localStorage.getItem("texthooker.audioSpeed"));

    const [ankiDeckName, setAnkiDeckName] = useState(localStorage.getItem("anki.deckName"));
    if(!ankiDeckName) { setAnkiDeckName("NT_TTS"); }

    const updateNovelReaderTTSVoiceId = (e) => {
        localStorage.setItem("novelReader.ttsVoiceId", e.target.value);
        setNovelReaderTtsVoiceId(e.target.value);
    }

    const updateNovelReaderContentLanguage = (e) => {
        localStorage.setItem("novelReader.contentLanguage", e.target.value);
        setNovelReaderContentLanguage(e.target.value);
    }

    const updateNovelReaderTranslationLanguage = (e) => {
        localStorage.setItem("novelReader.translationLanguage", e.target.value);
        setNovelReaderTranslationLanguage(e.target.value);
    }

    const updateNovelReaderAudioSpeed = (e) => {
        localStorage.setItem("novelReader.audioSpeed", e.target.value);
        setNovelReaderAudioSpeed(e.target.value);
    }

    const updateTexthookerTTSVoiceId = (e) => {
        localStorage.setItem("texthooker.ttsVoiceId", e.target.value);
        setTexthookerTtsVoiceId(e.target.value);
    }

    const updateTexthookerContentLanguage = (e) => {
        localStorage.setItem("texthooker.contentLanguage", e.target.value);
        setTexthookerContentLanguage(e.target.value);
    }

    const updateTexthookerTranslationLanguage = (e) => {
        localStorage.setItem("texthooker.translationLanguage", e.target.value);
        setTexthookerTranslationLanguage(e.target.value);
    }

    const updateTexthookerAudioSpeed = (e) => {
        localStorage.setItem("texthooker.audioSpeed", e.target.value);
        setTexthookerAudioSpeed(e.target.value);
    }

    const updateAnkiDeckName = (e) => {
        localStorage.setItem("anki.deckName", e.target.value);
        setAnkiDeckName(e.target.value);
    }

    const ttsVoiceOptions = (
        <>
            <option value="1501">China/Female - Jing (1501)</option>
            <option value="2402">United Kingdom/Male - Richard (2402)</option>
        </>
    );

    const languageOptions  = (
        <>
            <option value="EN">English</option>
            <option value="ZH-HANS">Chinese (Simplified)</option>
        </>
    );

    const speedOptions = (
        <>
            <option value="0.5">0.5x</option>
            <option value="0.6">0.6x</option>
            <option value="0.7">0.7x</option>
            <option value="0.8">0.8x</option>
            <option value="0.9">0.9x</option>
            <option value="1.0">1x</option>
            <option value="1.1">1.1x</option>
            <option value="1.2">1.2x</option>
        </>
    );

    const novelReaderSettings = (
        <section>
            <h2>Novel Reader</h2>

            <div className="m-[15px]">
                <Label>TTS Voice Id:</Label>
                <Select onChange={updateNovelReaderTTSVoiceId} value={novelReaderTtsVoiceId}>
                    {ttsVoiceOptions}
                </Select>
            </div>

            <div className="m-[15px]">
                <Label>Content Language:</Label>
                <Select onChange={updateNovelReaderContentLanguage} value={novelReaderContentLanguage}>
                    {languageOptions}
                </Select>
            </div>

            <div className="m-[15px]">
                <Label>Translation Language:</Label>
                <Select onChange={updateNovelReaderTranslationLanguage} value={novelReaderTranslationLanguage}>
                    {languageOptions}
                </Select>
            </div>

            <div className="m-[15px]">
                <Label>Audio Speed:</Label>
                <Select onChange={updateNovelReaderAudioSpeed} value={novelReaderAudioSpeed}>
                    {speedOptions}
                </Select>
            </div>
        </section>
    );

    const texthookerSettings = (
        <section className="">
            <h2>Texthooker</h2>

            <div className="m-[15px]">
                <Label>TTS Voice Id:</Label>
                <Select onChange={updateTexthookerTTSVoiceId} value={texthookerTtsVoiceId}>
                    {ttsVoiceOptions}
                </Select>
            </div>

            <div className="m-[15px]">
                <Label>Content Language:</Label>
                <Select onChange={updateTexthookerContentLanguage} value={texthookerContentLanguage}>
                    {languageOptions}
                </Select>
            </div>

            <div className="m-[15px]">
                <Label>Translation Language:</Label>
                <Select onChange={updateTexthookerTranslationLanguage} value={texthookerTranslationLanguage}>
                    {languageOptions}
                </Select>
            </div>

            <div className="m-[15px]">
                <Label>Audio Speed:</Label>
                <Select onChange={updateTexthookerAudioSpeed} value={texthookerAudioSpeed}>
                    {speedOptions}
                </Select>
            </div>
        </section>
    );

    const ankiSettings = (
        <section className="">
            <h2>Anki</h2>

            <div className="m-[15px]">
                <div className="mb-2 block">
                    <Label htmlFor="ankiDeckName">Anki Deck Name:</Label>
                </div>

                <TextInput id="ankiDeckName"
                       type="text"
                       className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                       placeholder="NT_TTS"
                       required
                       onChange={updateAnkiDeckName}
                       value={ankiDeckName} />
            </div>
        </section>
    );

    return (
        <RoundedContentBox>
            <form className="flex max-w-md flex-col gap-4">
                {novelReaderSettings}
                {texthookerSettings}
                {ankiSettings}
            </form>
        </RoundedContentBox>
    );
};

export default SettingsApp;
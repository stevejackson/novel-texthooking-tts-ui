import React, {useEffect, useState} from 'react';

const SettingsApp = () => {
    const [novelReaderTtsVoiceId, setNovelReaderTtsVoiceId] = useState(localStorage.getItem("novelReader.ttsVoiceId"));
    const [novelReaderContentLanguage, setNovelReaderContentLanguage] = useState(localStorage.getItem("novelReader.contentLanguage"));
    const [novelReaderTranslationLanguage, setNovelReaderTranslationLanguage] = useState(localStorage.getItem("novelReader.translationLanguage"));

    const [texthookerTtsVoiceId, setTexthookerTtsVoiceId] = useState(localStorage.getItem("texthooker.ttsVoiceId"));
    const [texthookerContentLanguage, setTexthookerContentLanguage] = useState(localStorage.getItem("texthooker.contentLanguage"));
    const [texthookerTranslationLanguage, setTexthookerTranslationLanguage] = useState(localStorage.getItem("texthooker.translationLanguage"));

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

    const novelReaderSettings = (
        <section>
            <h2>Novel Reader</h2>

            <div>
                <label>TTS Voice Id:</label>
                <select onChange={updateNovelReaderTTSVoiceId} value={novelReaderTtsVoiceId}>
                    <options>
                        <option value="1501">China/Female - Jing (1501)</option>
                        <option value="2402">United Kingdom/Male - Richard (2402)</option>
                    </options>
                </select>
            </div>

            <div>
                <label>Content Language:</label>
                <select onChange={updateNovelReaderContentLanguage} value={novelReaderContentLanguage}>
                    <options>
                        <option value="EN">English</option>
                        <option value="ZH-HANS">Chinese (Simplified)</option>
                    </options>
                </select>
            </div>

            <div>
                <label>Translation Language:</label>
                <select onChange={updateNovelReaderTranslationLanguage} value={novelReaderTranslationLanguage}>
                    <options>
                        <option value="EN">English</option>
                        <option value="ZH-HANS">Chinese (Simplified)</option>
                    </options>
                </select>
            </div>
        </section>
    );

    const texthookerSettings = (
        <section className="mt-[50px]">
            <h2>Texthooker</h2>

            <div>
                <label>TTS Voice Id:</label>
                <select onChange={updateTexthookerTTSVoiceId} value={texthookerTtsVoiceId}>
                    <options>
                        <option value="1501">China/Female - Jing (1501)</option>
                        <option value="2402">United Kingdom/Male - Richard (2402)</option>
                    </options>
                </select>
            </div>

            <div>
                <label>Content Language:</label>
                <select onChange={updateTexthookerContentLanguage} value={texthookerContentLanguage}>
                    <options>
                        <option value="EN">English</option>
                        <option value="ZH-HANS">Chinese (Simplified)</option>
                    </options>
                </select>
            </div>

            <div>
                <label>Translation Language:</label>
                <select onChange={updateTexthookerTranslationLanguage} value={texthookerTranslationLanguage}>
                    <options>
                        <option value="EN">English</option>
                        <option value="ZH-HANS">Chinese (Simplified)</option>
                    </options>
                </select>
            </div>
        </section>
    );

    return (
        <div className="flex flex-col min-h-screen w-screen
                      bg-gray-950/[4.5%]
                      bg-[radial-gradient(circle,#73737350_1px,transparent_1px)]
                      bg-[size:10px_10px]
                      absolute -z--10">
            <div className="flex-grow">
                <main id="app-container"
                      className="pl-5 pr-5 pt-2 pb-2">
                    <div className="w-full
                        mx-auto rounded-xl bg-white
                        p-6 cursor-pointer
                        shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none
                        dark:-outline-offset-1 dark:outline-white/10">
                        <a href="/" className="text-blue-500">Back to Dashboard</a>

                        {novelReaderSettings}
                        {texthookerSettings}

                    </div>
                </main>
            </div>
        </div>
    );
};

export default SettingsApp;
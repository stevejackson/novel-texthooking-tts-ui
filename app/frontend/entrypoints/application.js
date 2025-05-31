import '../controllers'

const initializeDefaultSettings = () => {
    const novelReaderContentLanguage = localStorage.getItem("novelReader.contentLanguage");
    const novelReaderTranslationLanguage = localStorage.getItem("novelReader.translationLanguage");
    const novelReaderTTSVoiceId = localStorage.getItem("novelReader.ttsVoiceId");
    const novelReaderAudioSpeed = localStorage.getItem("novelReader.audioSpeed");

    const texthookerContentLanguage = localStorage.getItem("texthooker.contentLanguage");
    const texthookerTranslationLanguage = localStorage.getItem("texthooker.translationLanguage");
    const texthookerTTSVoiceId = localStorage.getItem("texthooker.ttsVoiceId");
    const texthookerAudioSpeed = localStorage.getItem("texthooker.audioSpeed");

    if(novelReaderContentLanguage === undefined || novelReaderContentLanguage === null) {
        localStorage.setItem("novelReader.contentLanguage", "EN");
    }

    if(novelReaderTranslationLanguage === undefined || novelReaderTranslationLanguage === null) {
        localStorage.setItem("novelReader.translationLanguage", "ZH-HANS");
    }

    if(novelReaderTTSVoiceId === undefined || novelReaderTTSVoiceId === null) {
        localStorage.setItem("novelReader.ttsVoiceId", "2402");
    }

    if(novelReaderAudioSpeed === undefined || novelReaderAudioSpeed === null) {
        localStorage.setItem("novelReader.audioSpeed", "1.0");
    }

    if(texthookerContentLanguage === undefined || texthookerContentLanguage === null) {
        localStorage.setItem("texthooker.contentLanguage", "ZH-HANS");
    }

    if(texthookerTranslationLanguage === undefined || texthookerTranslationLanguage === null) {
        localStorage.setItem("texthooker.translationLanguage", "EN");
    }

    if(texthookerTTSVoiceId === undefined || texthookerTTSVoiceId === null) {
        localStorage.setItem("texthooker.ttsVoiceId", "2402");
    }

    if(texthookerAudioSpeed === undefined || texthookerAudioSpeed === null) {
        localStorage.setItem("texthooker.audioSpeed", "1.0");
    }
}

initializeDefaultSettings();
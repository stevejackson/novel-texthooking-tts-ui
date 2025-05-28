import '@hotwired/turbo-rails'
import '../controllers'

const initializeDefaultSettings = () => {
    const novelReaderContentLanguage = localStorage.getItem("novelReader.contentLanguage");
    const novelReaderTranslationLanguage = localStorage.getItem("novelReader.translationLanguage");
    const novelReaderTTSVoiceId = localStorage.getItem("novelReader.ttsVoiceId");

    const texthookerContentLanguage = localStorage.getItem("texthooker.contentLanguage");
    const texthookerTranslationLanguage = localStorage.getItem("texthooker.translationLanguage");
    const texthookerTTSVoiceId = localStorage.getItem("texthooker.ttsVoiceId");

    if(novelReaderContentLanguage === undefined || novelReaderContentLanguage === null) {
        localStorage.setItem("novelReader.contentLanguage", "EN");
    }

    if(novelReaderTranslationLanguage === undefined || novelReaderTranslationLanguage === null) {
        localStorage.setItem("novelReader.translationLanguage", "ZH-HANS");
    }

    if(novelReaderTTSVoiceId === undefined || novelReaderTTSVoiceId === null) {
        localStorage.setItem("novelReader.ttsVoiceId", "2402");
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
}

initializeDefaultSettings();
console.log("NovelTexthookingTTSUI Chrome Extension Loading...");

const callAnkiConnect = async (action, version, params={}) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('error', () => reject('failed to issue request'));

        xhr.addEventListener('load', () => {
            try {
                const response = JSON.parse(xhr.responseText);
                // if (Object.getOwnPropertyNames(response).length != 2) {
                //     throw 'response has an unexpected number of fields';
                // }
                // if (!response.hasOwnProperty('error')) {
                //     throw 'response is missing required error field';
                // }
                // if (!response.hasOwnProperty('result')) {
                //     throw 'response is missing required result field';
                // }
                // if (response.error) {
                //     console.log("WTF");
                //     throw response.error;
                // }
                resolve(response);
            } catch (e) {
                reject(e);
            }
        });

        xhr.open('POST', 'http://127.0.0.1:8765');
        xhr.send(JSON.stringify({action, version, params}));
    });
}

const requestCorsPermission = async () => {
    await callAnkiConnect("requestPermission", 6);
}

const onCreateAnkiCardSubmit = async () => {
    console.log("In extension: onCreateAnkiCardSubmit");

    const ankiDataElement = document.getElementById("root-anki-submission-observed");
    const sentence = ankiDataElement.dataset.sentence;
    const translation = ankiDataElement.dataset.translation;
    const audioUrl = ankiDataElement.dataset.audioUrl;

    console.log("onCreateAnkiCardSubmit: sentence -- " + sentence);
    console.log("onCreateAnkiCardSubmit: translation -- " + translation);
    console.log("onCreateAnkiCardSubmit: audioUrl -- " + audioUrl);

    const addNoteParams = {
        "note": {
            "deckName": "MyTestDeck_Mk1",
            "modelName": "NT_TTS_UI_V1",
            "fields": {
                "sentence": sentence,
                "translation": translation
            },
            "tags": ["NT_TTS_UI"],
            "audio": [{
                "url": audioUrl,
                "filename": audioUrl.split("/").pop(),
                "fields": ["Audio"]
            }],
        }
    };

    const result = await callAnkiConnect("addNote", 6, addNoteParams);
    console.log("Anki connect call result: ");
    console.log(result);

    if(result["error"]) {
        console.log(result["error"]);
    }

    const submissionResultEl = document.getElementById("root-anki-submission-result-observed");
    submissionResultEl.dataset.result = result["error"] === null ? "success" : "error";
    submissionResultEl.dataset.resultData = result["error"] || result["result"];
}

const ankiCardCreationFeatureSetup = async () => {
    requestCorsPermission();

    let observer = new MutationObserver((mutations) => onCreateAnkiCardSubmit());

    observer.observe(document.getElementById("root-anki-submission-observed"), {
        attributes: true,
        childList: false,
        subtree: false
    });

    console.log("NovelTexthookingTTSUI Chrome Extension Loaded");
}

ankiCardCreationFeatureSetup();
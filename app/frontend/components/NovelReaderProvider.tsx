import { useState } from 'react';
import GlobalStateContext from './GlobalStateContext';

const NovelReaderProvider = ({ children }) => {
    const [novelReaderState, setNovelReaderState] = useState({
        masterTTSAudio: null,
        setMasterTTSAudio: null
    });

    return (
        <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export default GlobalStateProvider;

import React, { useState } from 'react';
import UtillsContext from './UtillsContext';

const UtillsProvider = ({children})=>{
    const [showSidebar, setShowSidebar] = useState(true);
    return (
        <UtillsContext.Provider value={{showSidebar, setShowSidebar}}>
            {children}
        </UtillsContext.Provider>
    )
}

export default UtillsProvider;
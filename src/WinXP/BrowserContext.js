import { createContext, useContext } from 'react';

export const BrowserContext = createContext({ openUrl: () => {} });
export const useBrowser = () => useContext(BrowserContext);

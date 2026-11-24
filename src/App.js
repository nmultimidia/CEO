import React, { useState } from 'react';

import WinXP from 'WinXP';
import WelcomeScreen from 'WelcomeScreen';
import { LanguageContext } from 'i18n/LanguageContext';

const App = () => {
  const [language, setLanguage] = useState(null);

  if (!language) return <WelcomeScreen onSelect={setLanguage} />;

  return (
    <LanguageContext.Provider value={language}>
      <WinXP />
    </LanguageContext.Provider>
  );
};

export default App;

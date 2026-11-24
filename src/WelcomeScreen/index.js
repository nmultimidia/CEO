import React, { useState } from 'react';
import styled from 'styled-components';

import user from 'assets/windowsIcons/user.png';

const languages = [
  {
    code: 'pt',
    label: 'Português',
    description: 'Entrar no portfólio em português',
  },
  {
    code: 'en',
    label: 'English',
    description: 'Enter the portfolio in English',
  },
];

export default function WelcomeScreen({ onSelect }) {
  const [entering, setEntering] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const enter = language => {
    setSelectedLanguage(language.label);
    setEntering(true);
    playWelcomeChime();
    window.setTimeout(() => onSelect(language.code), 680);
  };
  return (
    <Screen>
      <TopBar />
      <Panel>
        <Intro>
          <h1>{entering ? (selectedLanguage === 'Português' ? 'Bem-vindo' : 'Welcome') : 'Welcome'}</h1>
          <p>{entering ? 'Windows XP' : 'Bem-vindo'}</p>
          <span>{entering ? (selectedLanguage === 'Português' ? 'A iniciar sessão...' : 'Logging on...') : 'Select your preferred language to continue.'}</span>
          {!entering && <span>Selecione o idioma para continuar.</span>}
          {entering && <Loading><i /><b /></Loading>}
        </Intro>
        <Accounts aria-label="Language selection">
          {!entering && languages.map(language => (
            <Account key={language.code} type="button" onClick={() => enter(language)}>
              <img src={user} alt="" />
              <div>
                <strong>{language.label}</strong>
                <small>{language.description}</small>
              </div>
            </Account>
          ))}
        </Accounts>
      </Panel>
      <BottomBar>
        <span>Gabriel Nathan Tati</span>
        <span>Portfolio</span>
      </BottomBar>
    </Screen>
  );
}

function playWelcomeChime() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const context = new AudioContext();
  [523.25, 659.25, 783.99].forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0, context.currentTime + index * 0.08);
    gain.gain.linearRampToValueAtTime(0.075, context.currentTime + index * 0.08 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + index * 0.08 + 0.25);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(context.currentTime + index * 0.08);
    oscillator.stop(context.currentTime + index * 0.08 + 0.27);
  });
  window.setTimeout(() => context.close(), 650);
}

const Screen = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: #fff;
  font-family: Tahoma, Arial, sans-serif;
  background: linear-gradient(110deg, #003399 0%, #0d65bd 41%, #4aa5ec 100%);
`;

const TopBar = styled.div`
  height: 9px;
  background: linear-gradient(#79c6f5, #2169c3 60%, #003b9e);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
`;

const Panel = styled.section`
  flex: 1;
  width: min(880px, calc(100% - 32px));
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  align-items: center;
  gap: 50px;
  @media (max-width: 650px) {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 44px 0;
  }
`;

const Intro = styled.div`
  border-right: 1px solid rgba(255, 255, 255, 0.55);
  padding-right: 48px;
  h1, p { margin: 0; font-weight: 400; }
  h1 { font-size: 42px; letter-spacing: -1px; }
  p { font-size: 28px; margin: 3px 0 22px; }
  span { display: block; font-size: 15px; line-height: 1.55; color: #e7f4ff; }
  @media (max-width: 650px) { border-right: 0; border-bottom: 1px solid rgba(255,255,255,.55); padding: 0 0 26px; }
`;

const Accounts = styled.div`
  display: grid;
  gap: 15px;
`;

const Account = styled.button`
  width: 100%;
  border: 1px solid transparent;
  border-radius: 6px;
  padding: 10px;
  color: #fff;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 13px;
  background: transparent;
  cursor: pointer;
  &:hover, &:focus-visible { background: rgba(5, 46, 125, .45); border-color: rgba(255,255,255,.55); outline: 0; }
  img { width: 58px; height: 58px; object-fit: cover; object-position: center 20%; border: 3px solid #fff; border-radius: 5px; background: #fff; }
  strong, small { display: block; }
  strong { font-size: 21px; font-weight: 400; }
  small { margin-top: 3px; color: #e5f4ff; font-size: 13px; }
`;

const BottomBar = styled.footer`
  min-height: 44px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  background: linear-gradient(#0c5ab7, #003b91);
  border-top: 1px solid #89cfff;
`;

const Loading = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
  margin-top: 15px;
  i, b { width: 10px; height: 10px; border-radius: 50%; background: #f5b642; animation: spin 1s infinite ease-in-out; }
  b { background: #7ed4ff; animation-delay: .14s; }
  @keyframes spin { 50% { transform: translateX(22px) scale(.6); } }
`;

import React, { useState } from 'react';
import styled from 'styled-components';
import { useLanguage } from 'i18n/LanguageContext';

const recipient = 'contact@gabrieltati.online';

export default function OutlookExpress() {
  const isPortuguese = useLanguage() === 'pt';
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  function sendMessage(event) {
    event.preventDefault();
    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailto;
  }

  return (
    <App>
      <Menu>{isPortuguese ? 'Ficheiro   Editar   Ver   Ferramentas   Mensagem   Ajuda' : 'File   Edit   View   Tools   Message   Help'}</Menu>
      <Toolbar>
        <button type="button">✉ {isPortuguese ? 'Nova mensagem' : 'New message'}</button>
        <button type="button" onClick={() => window.location.href = `mailto:${recipient}`}>↗ {isPortuguese ? 'Contactos' : 'Contacts'}</button>
      </Toolbar>
      <Main>
        <Sidebar>
          <Title>{isPortuguese ? 'Pastas' : 'Folders'}</Title>
          <Folder>⌄ {isPortuguese ? 'Pastas locais' : 'Local Folders'}</Folder>
          <Folder>📥 {isPortuguese ? 'Caixa de entrada' : 'Inbox'}</Folder>
          <Folder>📤 {isPortuguese ? 'Caixa de saída' : 'Outbox'}</Folder>
          <Folder>✉ {isPortuguese ? 'Itens enviados' : 'Sent Items'}</Folder>
          <Folder>🗑 {isPortuguese ? 'Itens eliminados' : 'Deleted Items'}</Folder>
        </Sidebar>
        <Compose onSubmit={sendMessage}>
          <Title>{isPortuguese ? 'Nova mensagem' : 'New message'}</Title>
          <Row><label>{isPortuguese ? 'Para:' : 'To:'}</label><input value={recipient} readOnly /></Row>
          <Row><label>{isPortuguese ? 'Assunto:' : 'Subject:'}</label><input value={subject} onChange={event => setSubject(event.target.value)} placeholder={isPortuguese ? 'Como posso ajudar?' : 'How can I help?'} /></Row>
          <Message value={message} onChange={event => setMessage(event.target.value)} placeholder={isPortuguese ? 'Escreva a sua mensagem para Gabriel...' : 'Write your message to Gabriel...'} />
          <ComposeFooter>
            <button type="submit">{isPortuguese ? 'Enviar' : 'Send'}</button>
            <span>{isPortuguese ? 'Será aberto o seu aplicativo de e-mail para enviar a mensagem.' : 'Your email application will open to send this message.'}</span>
          </ComposeFooter>
        </Compose>
      </Main>
      <Status>{isPortuguese ? `Pronto · Destinatário: ${recipient}` : `Ready · Recipient: ${recipient}`}</Status>
    </App>
  );
}

const App = styled.div`
  height: 100%; display: flex; flex-direction: column; background: #ece9d8; color: #000;
  font: 11px Tahoma, Arial, sans-serif;
  button { border: 1px solid #9aa9bd; background: linear-gradient(#fff, #d9e2ee); padding: 4px 8px; font: inherit; cursor: pointer; }
  button:hover { background: #fff; }
`;
const Menu = styled.div`padding: 4px 7px; border-bottom: 1px solid #aaa; white-space: pre-wrap;`;
const Toolbar = styled.div`display: flex; gap: 5px; padding: 5px 7px; border-bottom: 1px solid #a8b4c5; background: #f5f5f2;`;
const Main = styled.div`min-height: 0; flex: 1; display: grid; grid-template-columns: 150px minmax(0, 1fr); @media (max-width: 520px) { grid-template-columns: 105px minmax(0, 1fr); }`;
const Sidebar = styled.aside`padding: 8px; border-right: 1px solid #aab6c6; background: linear-gradient(90deg, #dce9f8, #f8fbff); overflow: auto;`;
const Title = styled.div`font-weight: bold; color: #123c75; margin: 2px 0 9px;`;
const Folder = styled.div`padding: 4px 1px; white-space: nowrap;`;
const Compose = styled.form`min-width: 0; padding: 10px; display: flex; flex-direction: column;`;
const Row = styled.div`
  display: flex; align-items: center; margin-bottom: 6px; gap: 6px;
  label { width: 54px; text-align: right; } input { min-width: 0; flex: 1; border: 1px solid #7f9db9; padding: 4px; font: inherit; }
`;
const Message = styled.textarea`min-height: 120px; flex: 1; resize: none; border: 1px solid #7f9db9; padding: 6px; font: 12px Tahoma, Arial, sans-serif;`;
const ComposeFooter = styled.div`display: flex; align-items: center; gap: 10px; padding-top: 8px; span { color: #4b5563; font-size: 10px; }`;
const Status = styled.div`padding: 3px 6px; border-top: 1px solid #aab6c6; background: #f5f5f2; color: #475569;`;

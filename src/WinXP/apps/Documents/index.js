import React from 'react';
import styled from 'styled-components';
import folder from 'assets/windowsIcons/318(48x48).png';
import document from 'assets/windowsIcons/308(32x32).png';
import { useLanguage } from 'i18n/LanguageContext';

const categories = [
  ['Certificações', 'Certificates'],
  ['Formação', 'Education'],
  ['Experiência profissional', 'Professional experience'],
  ['Projetos e portfólio', 'Projects and portfolio'],
];

export default function Documents() {
  const isPortuguese = useLanguage() === 'pt';
  return <Explorer>
    <Header>{isPortuguese ? 'Meus Documentos' : 'My Documents'}</Header>
    <Path>{isPortuguese ? 'C:\Documents and Settings\Gabriel\Meus Documentos' : 'C:\Documents and Settings\Gabriel\My Documents'}</Path>
    <Content>
      <Sidebar>
        <b>{isPortuguese ? 'Tarefas de arquivo e pasta' : 'File and Folder Tasks'}</b>
        <span>{isPortuguese ? 'Organizar documentos por categoria' : 'Organize documents by category'}</span>
        <span>{isPortuguese ? 'Partilhar esta pasta' : 'Share this folder'}</span>
      </Sidebar>
      <Files>
        <h2>{isPortuguese ? 'Documentos de Gabriel' : "Gabriel's Documents"}</h2>
        <Grid>
          {categories.map(([pt, en]) => <File key={pt}><img src={folder} alt="" /><span>{isPortuguese ? pt : en}</span></File>)}
          <File muted><img src={document} alt="" /><span>{isPortuguese ? 'Aguardando sincronização segura de certificados' : 'Awaiting secure certificate sync'}</span></File>
        </Grid>
      </Files>
    </Content>
    <Status>{isPortuguese ? 'Selecione um item para visualizá-lo.' : 'Select an item to view it.'}</Status>
  </Explorer>;
}

const Explorer = styled.div`height:100%; display:flex; flex-direction:column; background:#fff; color:#1c1c1c; font:11px Tahoma,Arial,sans-serif;`;
const Header = styled.div`padding:5px 9px; color:#fff; background:linear-gradient(#4d8df3,#1d55b0); font-weight:bold;`;
const Path = styled.div`padding:5px 10px; border-bottom:1px solid #a6a6a6; background:#eee9d8;`;
const Content = styled.div`flex:1; display:flex; overflow:auto;`;
const Sidebar = styled.aside`width:170px; padding:12px; color:#13539c; background:linear-gradient(#d9edff,#fff); border-right:1px solid #c0d4e7; b,span{display:block; margin-bottom:10px;} b{color:#245f9f;}`;
const Files = styled.main`flex:1; padding:16px; h2{margin:0 0 18px; font-size:14px; font-weight:normal;}`;
const Grid = styled.div`display:flex; flex-wrap:wrap; gap:22px;`;
const File = styled.div`width:110px; display:flex; flex-direction:column; align-items:center; gap:5px; text-align:center; color:${({ muted }) => muted ? '#777' : '#003399'}; img{width:48px; height:48px; object-fit:contain;}`;
const Status = styled.div`padding:4px 8px; border-top:1px solid #aaa; background:#eee9d8;`;

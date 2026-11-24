import React from 'react';
import styled from 'styled-components';
import document from 'assets/windowsIcons/308(32x32).png';
import { useLanguage } from 'i18n/LanguageContext';
import { useBrowser } from 'WinXP/BrowserContext';

const files = [
  { category: ['Certificações profissionais', 'Professional certifications'], pt: 'Fundamentos de Gestão de Projetos — FM2S (2026)', en: 'Project Management Fundamentals — FM2S (2026)', file: 'fundamentos-gestao-projetos-fm2s-2026.pdf' },
  { category: ['Certificações profissionais', 'Professional certifications'], pt: 'Fundamentos de Cibersegurança — Google / Coursera (2024)', en: 'Cybersecurity Foundations — Google / Coursera (2024)', file: 'google-fundamentos-ciberseguranca-coursera-2024.pdf' },
  { category: ['Fintech e finanças', 'Fintech and finance'], pt: 'Literacia Financeira e Pagamentos Digitais — USAID Afrimoney (2024)', en: 'Financial Literacy and Digital Payments — USAID Afrimoney (2024)', file: 'literacia-financeira-pagamentos-digitais-usaid-2024.pdf' },
  { category: ['Fintech e finanças', 'Fintech and finance'], pt: 'Programa de Aceleração Fintech — Zeta Fintech LISPA', en: 'Fintech Acceleration Programme — Zeta Fintech LISPA', file: 'programa-aceleracao-fintech-zeta-lispa.pdf' },
  { category: ['Experiência profissional', 'Professional experience'], pt: 'Estágio — Angola Telecom: Comutação e Fibra Óptica (2020–2021)', en: 'Internship — Angola Telecom: Switching and Fibre Optics (2020–2021)', file: 'estagio-angola-telecom-comutacao-fibra-2020-2021.pdf' },
  { category: ['Experiência profissional', 'Professional experience'], pt: 'Estágio Angola Telecom — scan original', en: 'Angola Telecom internship — original scan', file: 'estagio-angola-telecom-scan-original-2020-2021.jpg' },
  { category: ['Formação e mérito académico', 'Education and academic merit'], pt: 'Excelência Académica — Melhor Aluno de Telecomunicações, IPSA (2021)', en: 'Academic Excellence — Top Telecommunications Student, IPSA (2021)', file: 'excelencia-academica-telecomunicacoes-ipsa-2021.pdf' },
  { category: ['Outros documentos', 'Other documents'], pt: 'Certificado profissional (2022)', en: 'Professional certificate (2022)', file: 'certificado-profissional-2022.pdf' },
];

export default function Documents() {
  const isPortuguese = useLanguage() === 'pt';
  const { openUrl } = useBrowser();
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
        {Array.from(new Set(files.map(item => item.category[0]))).map(category => (
          <section key={category}>
            <h3>{isPortuguese ? category : files.find(item => item.category[0] === category).category[1]}</h3>
            <Grid>{files.filter(item => item.category[0] === category).map(item => <File key={item.file} role="button" tabIndex="0" onClick={() => openUrl(`/documents/${item.file}`, isPortuguese ? item.pt : item.en)} onKeyDown={event => { if (event.key === 'Enter') openUrl(`/documents/${item.file}`, isPortuguese ? item.pt : item.en); }}><img src={document} alt="" /><span>{isPortuguese ? item.pt : item.en}</span></File>)}</Grid>
          </section>
        ))}
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
const Files = styled.main`flex:1; padding:16px; h2{margin:0 0 18px; font-size:14px; font-weight:normal;} h3{margin:20px 0 10px; color:#265e9a; font-size:12px; font-weight:bold;}`;
const Grid = styled.div`display:flex; flex-wrap:wrap; gap:22px;`;
const File = styled.div`width:130px; display:flex; flex-direction:column; align-items:center; gap:5px; text-align:center; color:#003399; cursor:pointer; outline:0; &:hover span,&:focus span{background:#316ac5;color:#fff;} img{width:40px;height:40px;object-fit:contain;} span{padding:2px;}`;
const Status = styled.div`padding:4px 8px; border-top:1px solid #aaa; background:#eee9d8;`;

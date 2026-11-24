import React, { useState } from 'react';
import styled from 'styled-components';

const tracks = [
  { title: 'Talk About You', artist: 'Elijah Thomas', id: 'OgvV3aAXRJA' },
  { title: 'Calling', artist: 'Noël Mio', id: 'FT25Q3fAzYc' },
];

export default function MediaPlayer() {
  const [track, setTrack] = useState(tracks[0]);
  return (
    <Player>
      <TopBar>Windows Media Player</TopBar>
      <Screen>
        <iframe
          key={track.id}
          title={`${track.title} — ${track.artist}`}
          src={`https://www.youtube-nocookie.com/embed/${track.id}?autoplay=1&rel=0`}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </Screen>
      <NowPlaying>
        <span>Now Playing</span>
        <strong>{track.title}</strong>
        <small>{track.artist}</small>
      </NowPlaying>
      <Playlist>
        {tracks.map(item => (
          <button
            key={item.id}
            type="button"
            className={item.id === track.id ? 'active' : ''}
            onClick={() => setTrack(item)}
          >
            <span>▶</span><b>{item.title}</b><small>{item.artist}</small>
          </button>
        ))}
      </Playlist>
      <Footer>Vídeos incorporados do YouTube · nenhuma música é descarregada</Footer>
    </Player>
  );
}

const Player = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  color: #eaf4ff;
  background: linear-gradient(135deg, #152d64, #06152f 70%);
  font-family: Tahoma, Arial, sans-serif;
`;
const TopBar = styled.div`padding: 7px 11px; font-size: 12px; font-weight: bold; background: linear-gradient(#518be3, #174b9c); border-bottom: 1px solid #9dd7ff;`;
const Screen = styled.div`margin: 14px auto 8px; width: min(92%, 620px); aspect-ratio: 16 / 9; background: #000; border: 2px inset #6aa7de; iframe { width: 100%; height: 100%; border: 0; }`;
const NowPlaying = styled.div`width: min(92%, 620px); margin: 0 auto; padding: 8px 10px; box-sizing: border-box; background: rgba(0, 0, 0, .42); span, small { display:block; color:#a5d4ff; font-size:11px; } strong { display:block; margin:2px 0; font-size:15px; }`;
const Playlist = styled.div`width:min(92%,620px); margin: 8px auto; button { width:100%; display:grid; grid-template-columns:22px 1fr auto; gap:6px; align-items:center; padding:7px; color:#eaf4ff; text-align:left; border:0; border-bottom:1px solid #3e5c83; background:transparent; cursor:pointer; } button:hover, button.active { background:#285da9; } small { color:#b8d5f2; }`;
const Footer = styled.div`margin-top:auto; padding:7px 12px; color:#b8d5f2; background:#0a214b; font-size:10px;`;

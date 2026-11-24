import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const WIDTH = 600;
const HEIGHT = 760;
const bumpers = [
  { x: 185, y: 205, r: 30 },
  { x: 300, y: 155, r: 30 },
  { x: 415, y: 205, r: 30 },
  { x: 300, y: 325, r: 25 },
];

const careerMessages = [
  'Missão de carreira: uma boa sequência abre boas conversas.',
  'A jogar bem? Veja também os projetos que Gabriel já entregou.',
  'Pontuação alta, impacto real: automação, IA e produtos digitais.',
  'Próxima fase: transformar a sua ideia num produto que funciona.',
];

const resetBall = ball => Object.assign(ball, { x: 550, y: 620, vx: 0, vy: 0, launched: false });

export default function Pinball() {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const gameRef = useRef({ ball: { x: 550, y: 620, vx: 0, vy: 0, launched: false }, left: false, right: false, score: 0, lives: 3, last: 0 });
  const [hud, setHud] = useState({ score: 0, lives: 3 });
  const [careerMessage, setCareerMessage] = useState(careerMessages[0]);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      index = (index + 1) % careerMessages.length;
      setCareerMessage(careerMessages[index]);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const game = gameRef.current;
    const key = down => event => {
      if (['ArrowLeft', 'ArrowRight', ' ', 'a', 'd', 'A', 'D'].includes(event.key)) event.preventDefault();
      if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') game.left = down;
      if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') game.right = down;
      if (down && event.key === ' ') launch(game);
    };
    const keyDown = key(true);
    const keyUp = key(false);
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);
    return () => { window.removeEventListener('keydown', keyDown); window.removeEventListener('keyup', keyUp); };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const game = gameRef.current;
    let frame;
    const tick = time => {
      const dt = Math.min((time - (game.last || time)) / 16.67, 2);
      game.last = time;
      update(game, dt);
      if (game.uiDirty) { game.uiDirty = false; setHud({ score: game.score, lives: game.lives }); }
      draw(ctx, game);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  function launch(game = gameRef.current) {
    const ball = game.ball;
    if (!ball.launched) Object.assign(ball, { launched: true, vx: -4.5, vy: -12 });
  }
  function restart() {
    const game = gameRef.current;
    game.score = 0; game.lives = 3; resetBall(game.ball); setHud({ score: 0, lives: 3 });
  }
  const press = side => value => { gameRef.current[side] = value; };
  const focusGame = () => {
    if (frameRef.current) frameRef.current.focus();
  };

  return <Game>
    <Header><b>3D Pinball: Space Cadet</b><span>WebAssembly Edition</span></Header>
    <CareerPanel><b>MISSÃO GABRIEL:</b> {careerMessage}</CareerPanel>
    <PinballFrame
      ref={frameRef}
      title="3D Pinball for Windows — Space Cadet"
      src="https://pinball.alula.me/"
      allow="autoplay; fullscreen"
      tabIndex="0"
      onLoad={focusGame}
      onMouseDown={focusGame}
    />
    <Attribution>
      Motor baseado em <a href="https://github.com/k4zmu2a/spacecadetpinball" target="_blank" rel="noreferrer">SpaceCadetPinball</a> (MIT). Clique na mesa para ativar as teclas: <b>F2</b> inicia, <b>Espaço</b> lança, <b>Z</b> é o flipper esquerdo e <b>/</b> o direito.
    </Attribution>
  </Game>;
}

function update(game, dt) {
  const { ball } = game;
  if (!ball.launched) return;
  ball.vy += 0.28 * dt;
  ball.x += ball.vx * dt; ball.y += ball.vy * dt;
  if (ball.x < 28 || ball.x > WIDTH - 28) { ball.x = Math.max(28, Math.min(WIDTH - 28, ball.x)); ball.vx *= -0.9; }
  if (ball.y < 28) { ball.y = 28; ball.vy *= -0.9; }
  bumpers.forEach(bumper => {
    const dx = ball.x - bumper.x; const dy = ball.y - bumper.y; const distance = Math.hypot(dx, dy);
    if (distance < bumper.r + 11) {
      const nx = dx / (distance || 1); const ny = dy / (distance || 1);
      ball.x = bumper.x + nx * (bumper.r + 12); ball.y = bumper.y + ny * (bumper.r + 12);
      const dot = ball.vx * nx + ball.vy * ny;
      ball.vx = (ball.vx - 2 * dot * nx) * 1.08; ball.vy = (ball.vy - 2 * dot * ny) * 1.08;
      game.score += 100; game.uiDirty = true;
    }
  });
  const flippers = [{ x: 190, y: 635, dir: 1, active: game.left }, { x: 410, y: 635, dir: -1, active: game.right }];
  flippers.forEach(f => {
    const near = Math.hypot(ball.x - f.x, ball.y - f.y) < 72;
    if (f.active && near && ball.y < 655) { ball.vx += f.dir * 2.4; ball.vy = -Math.max(10, Math.abs(ball.vy) + 2); game.score += 10; game.uiDirty = true; }
  });
  if (ball.y > HEIGHT + 25) {
    game.lives -= 1;
    if (game.lives <= 0) { game.lives = 3; game.score = 0; }
    resetBall(ball); game.uiDirty = true;
  }
}

function draw(ctx, game) {
  const { ball } = game;
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT); gradient.addColorStop(0, '#08296d'); gradient.addColorStop(1, '#020a2a'); ctx.fillStyle = gradient; ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.strokeStyle = '#48c7ff'; ctx.lineWidth = 8; ctx.strokeRect(18, 18, WIDTH - 36, HEIGHT - 36);
  ctx.fillStyle = '#173c91'; ctx.fillRect(48, 50, WIDTH - 96, HEIGHT - 105);
  ctx.fillStyle = '#ffd64c'; ctx.font = 'bold 33px Arial'; ctx.textAlign = 'center'; ctx.fillText('GABRIEL PINBALL', WIDTH / 2, 92);
  bumpers.forEach(b => { ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fillStyle = '#f13f69'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = '#ffd84c'; ctx.stroke(); ctx.fillStyle = '#fff'; ctx.font = 'bold 15px Arial'; ctx.fillText('100', b.x, b.y + 5); });
  drawFlipper(ctx, 190, 635, game.left, false); drawFlipper(ctx, 410, 635, game.right, true);
  ctx.beginPath(); ctx.arc(ball.x, ball.y, 11, 0, Math.PI * 2); const shine = ctx.createRadialGradient(ball.x - 4, ball.y - 5, 1, ball.x, ball.y, 12); shine.addColorStop(0, '#fff'); shine.addColorStop(.35, '#caeeff'); shine.addColorStop(1, '#3a70aa'); ctx.fillStyle = shine; ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.stroke();
  if (!ball.launched) { ctx.fillStyle = '#fff'; ctx.font = '18px Arial'; ctx.fillText('Press SPACE or LAUNCH', WIDTH / 2, 710); }
}

function drawFlipper(ctx, x, y, active, mirror) {
  ctx.save(); ctx.translate(x, y); ctx.rotate((mirror ? 1 : -1) * (active ? .38 : .08)); ctx.fillStyle = '#f44b45'; ctx.fillRect(mirror ? -72 : 0, -9, 72, 18); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.strokeRect(mirror ? -72 : 0, -9, 72, 18); ctx.restore();
}

const Game = styled.div`height:100%; display:flex; flex-direction:column; align-items:center; overflow:hidden; background:#ece9d8; color:#102657; padding:10px; font-family:Tahoma,Arial,sans-serif; canvas{width:min(100%,520px); height:auto; border:3px inset #fff; touch-action:none;}`;
const Header = styled.div`width:min(100%,720px); display:flex; justify-content:space-between; padding:6px 9px; box-sizing:border-box; background:#0c3d90; color:#fff; font-size:13px;`;
const PinballFrame = styled.iframe`width:min(100%,720px); flex:1; min-height:560px; border:3px inset #fff; background:#3a6ea5; @media (max-width:700px){min-height:500px;}`;
const CareerPanel = styled.div`width:min(100%,720px); box-sizing:border-box; padding:6px 9px; color:#fff5b1; background:#173b6f; border-bottom:1px solid #4ea1e9; font-size:11px; b{color:#8ce4ff;}`;
const Attribution = styled.p`width:min(100%,720px); margin:8px 0 2px; text-align:center; font-size:11px; line-height:1.4; a{color:#0645ad;}`;
const Controls = styled.div`display:flex; flex-wrap:wrap; justify-content:center; gap:6px; padding:9px 0 4px; button{font:12px Tahoma,Arial; border:2px outset #fff; padding:5px 10px; background:#ece9d8; cursor:pointer;&:active{border-style:inset;}}`;
const Hint = styled.small`font-size:11px; padding-bottom:4px;`;

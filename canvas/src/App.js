import React, { useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const canvasRef = useRef();

  let currentX = 0;
  const radianDeg = (deg) => {
    return deg * Math.PI / 180;
  }

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d'); 
      // 채워진 사각형 그리지
      // ctx.fillStyle = "salmon"; 
      // ctx.fillRect(10, 10, 50, 50);

      // 모든 영역 삭제
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // arc 를 활용하여 원 그르기
      ctx.beginPath();
      ctx.arc(currentX, 100, 50, 0, radianDeg(360)); 
      ctx.stroke();
      currentX++;
      requestAnimationFrame(render);
    }
    render();
  }, [])


  return (
    <div className={"container"}>
      Canvas Tutorial

      <canvas ref={canvasRef} width="500" height="500  "></canvas>
    </div>
  );
}

export default App;

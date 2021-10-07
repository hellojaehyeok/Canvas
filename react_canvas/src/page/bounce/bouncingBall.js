import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';


const radianDeg = (deg) => {
    return deg * Math.PI / 180;
  }


const BouncingBall = (props) => {

    const canvasRef = useRef();
    const ballCount = 5;
    const ballColorArr = ["#ffa6a6", "#ffe0a6", "#c2ffa6", "#a6fffe", "#dea6ff"]
  
  
    useEffect(() => {
      // 공 배열
      let ballObjArr = [];
      // 배열에 각 공 속성 담기
      for(let i = 0 ; i < ballCount ; i++){
        const ballObj = {
          x : Math.round((Math.random() * ( 450 -50) + 50)),
          y : Math.round((Math.random() * ( 450 -50) + 50)),
          dx : Math.round((Math.random() * ( 10 - 3) + 3)),
          dy : Math.round((Math.random() * ( 10 - 3) + 3)),
          rad : Math.round((Math.random() * ( 50 -20) + 20)),
          colorIndex : Math.round(Math.random() * 4)
        } 
        ballObjArr.push(ballObj);
      }
  
      // 공 움직임 
      const ballMovment = (ctx, ballObj) => {
        ctx.beginPath();
        ctx.fillStyle = ballColorArr[ballObj.colorIndex];
        ctx.arc(ballObj.x, ballObj.y, ballObj.rad, 0, radianDeg(360)); 
        ctx.fill();
        ballObj.x += ballObj.dx;
        ballObj.y += ballObj.dy;
        
        if(ballObj.y - ballObj.rad < 0 || ballObj.y + ballObj.rad > 500){
          ballObj.dy *= -1
        }
  
        if(ballObj.x - ballObj.rad < 0 || ballObj.x + ballObj.rad > 500){
          ballObj.dx *= -1
        }
      }
  
      // 캔버스 렌더링
      const render = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d'); 
  
        // 캔버스 초기화
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 공 생성
        for(let i = 0 ; i < ballCount ; i++){
          ballMovment(ctx, ballObjArr[i]);
        }
  
        // 애니메이션
        requestAnimationFrame(render);
      }
      render();
    }, [])



    return(
        <Container>
            Canvas Tutorial - Ball Animation
            <BallCanvas ref={canvasRef} width="500" height="500  "></BallCanvas>
        </Container>
    )
};

export default BouncingBall;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const BallCanvas = styled.canvas`
  border:1px solid salmon;
`


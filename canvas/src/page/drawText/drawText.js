import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const DrawText = (props) => {

    const canvasRef = useRef();
    const PI2 = Math.PI * 2;


    useEffect(() => {
        const canvas = canvasRef.current; // canvasRef 가져오기 
        const ctx = canvas.getContext('2d'); // 드로잉 컨텍스트에 엑세스
        const pixelRatio = window.devicePixelRatio>1?2:1; // 접속 기기가 레티나 디스플레이인지 체크
        const stageWidth = document.body.clientWidth; // 화면의 가로값을 가져온다
        const stageHeight = document.body.clientHeight; // 화면의 세로값을 가져온다.
        
        let fontSize = 1;
        const drawText = (_fontSize) => {
            const txt = "Hello World";
            ctx.fillStyle = "black";
            ctx.font = `${_fontSize}px serif`;
            ctx.fillText(txt, stageWidth/2, stageHeight/2);
            for(var i =1;i<10;i++){
                ctx.fillText(txt, _fontSize * i, _fontSize * i);
            }
        }

        // 리사이즈 이벤트
        const resizeEvent = () => {
            // 레티나 디스플레이에서 흐릿하게 보이지 않기 위하여 pixelRatio를 곱해준다.
            canvasRef.current.width = stageWidth * pixelRatio; 
            canvasRef.current.height = stageHeight * pixelRatio;
            ctx.scale(pixelRatio, pixelRatio);
        }
        window.addEventListener("resize", resizeEvent);
        resizeEvent();

        // 애니메이션
        const render = () => {
            window.requestAnimationFrame(render);
            ctx.clearRect(0, 0, stageWidth, stageHeight);
            drawText(fontSize);
            if(fontSize < 200){
                fontSize++;
            }
        }
        render();

        
    }, [])



    return(
        <Container>
            <BallCanvas ref={canvasRef}></BallCanvas>
        </Container>
    )
};

export default DrawText;    

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const BallCanvas = styled.canvas`
    width: 100%;
    height: 100%;
`


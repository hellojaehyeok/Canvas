import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import {Polygon} from '../../components/movePoly/polygon';

const MovePoly = (props) => {

    const canvasRef = useRef();
    const PI2 = Math.PI * 2;


    useEffect(() => {
        const canvas = canvasRef.current; // canvasRef 가져오기 
        const ctx = canvas.getContext('2d'); // 드로잉 컨텍스트에 엑세스
        const pixelRatio = window.devicePixelRatio>1?2:1; // 접속 기기가 레티나 디스플레이인지 체크
        const stageWidth = document.body.clientWidth; // 화면의 가로값을 가져온다
        const stageHeight = document.body.clientHeight; // 화면의 세로값을 가져온다.
        let polygon = null; //  new Polygon이 들어갈 변수
        let isDown = false; // 마우스 다운 유무
        let moveX = 0; // 이동한 마우스의 위치
        let offsetX = 0; // 마우스의 현재 위치 


        // 리사이즈 이벤트
        const resizeEvent = () => {
            // 레티나 디스플레이에서 흐릿하게 보이지 않기 위하여 pixelRatio를 곱해준다.
            canvasRef.current.width = stageWidth * pixelRatio; 
            canvasRef.current.height = stageHeight * pixelRatio;
            ctx.scale(pixelRatio, pixelRatio);
            polygon = new Polygon(
                stageWidth/2, // x
                stageHeight + (stageHeight / 4), // y
                stageHeight/1.5, // 반지름
                10 
            );
        }
        window.addEventListener("resize", resizeEvent);
        resizeEvent();

        // 마우스 이벤트
        // 마수스의 현재 위치와 움직인 위치를 빼주어 속도 및 방향을 계산한다.
        const mouseDown = (e) => {
            isDown = true;
            moveX = 0;
            offsetX = e.clientX;
        }
        const mouseMove = (e) => {
            if(isDown){
                moveX = offsetX - e.clientX;
                offsetX = e.clientX;
            }
        }
        const mouseUp = (e) => {
            isDown = false;
        }
        window.addEventListener("mousedown", mouseDown);
        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseup", mouseUp);

        // 애니메이션
        const render = () => {
            window.requestAnimationFrame(render);
            ctx.clearRect(0, 0, stageWidth, stageHeight);
            // 0.92를 곱하여 영원히 도는것을 방지한다.
            // 천천히 속도가 줄어든다.
            moveX *= 0.92;
            polygon.animate(ctx, moveX)
        }
        render();

        
    }, [])



    return(
        <Container>
            <BallCanvas ref={canvasRef}></BallCanvas>
        </Container>
    )
};

export default MovePoly;    

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


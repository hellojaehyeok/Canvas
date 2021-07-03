import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import {Polygon} from '../../components/movePoly/polygon';

const MovePoly = (props) => {

    const canvasRef = useRef();
    const PI2 = Math.PI * 2;


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio>1?2:1;
        const stageWidth = document.body.clientWidth;
        const stageHeight = document.body.clientHeight;
        let polygon = null;
        let isDown = false;
        let moveX = 0;
        let offsetX = 0;


        // 리사이즈 이벤트
        const resizeEvent = () => {
            canvasRef.current.width = stageWidth * pixelRatio;
            canvasRef.current.height = stageHeight * pixelRatio;
            ctx.scale(pixelRatio, pixelRatio);
            polygon = new Polygon(stageWidth/2, stageHeight/2, stageHeight/3, 3);
        }
        window.addEventListener("resize", resizeEvent);
        resizeEvent();

        // 마우스 이벤트
        const mouseDown = (e) => {
            isDown = true;
            moveX = 0;
            offsetX = e.clientX;
        }
        const mouseMove = (e) => {
            if(isDown){
                moveX = e.clientX - offsetX;
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


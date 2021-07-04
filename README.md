# React_Canvas

React Canvas 정리              

## canvas 기초코드

### fillRect(x, y, width, height)
색칠된 직사각형을 그린다.               
               
### strokeRect(x, y, width, height)
윤곽선으로 이루어진 직사각형을 그린다.               
               
### clearRect(x, y, width, height)
특정부분을 지우는 직사각형을 만든다.               
               
### arc(x, y, radius, startAngle, endAngle, anticlockwise)
(x, y) 위치에 원점을 두면서, 반지름 r을 가지고,               
startAngle 에서 시작하여 endAngle 에서 끝나며 주어진               
anticlockwise 방향으로 향하는 (기본값은 시계방향 회전) 호를 그리게 된다.               
               
Angle은  라디안 기법을 사용합니다.               
아래 코드를 사용하여 원하는 각도를 변수로 넣는다.               
               
    const radianDeg = (deg) => {
        return deg * Math.PI / 180;
    }

### beginPath()
선 그리기를 시작한다.               
               
### closePath()
끝부분과 시작부분을 연결한다.                
               
### stroke()
윤곽선을 이용하여 도형을 그린다.               
               
### fill()
이어진 경로의 내부를 채운다.               
               
### fillStyle               
채워지는 스타일을 정한다.               

    // 색을 #000 으로 채운다.
    ctx.fillStyle = "#000";

### moveTo(x, y)               
펜을 x, y 좌표로 옮긴다.               
               
### lineTo(x, y)               
현재의 드로잉 위치에서 x, y 좌표까지 선을 그린다.               
                      
### translate(x, y)
기준점을 x, y 로 정한다.

## devicePixelRatio              
레티나 디스플레이 혹은 모바일의 경우 흐릿하게              
보이는 현상이 있어 분기처리 해주어야 한다.               

    const pixelRatio = window.devicePixelRatio>1?2:1;

## requestAnimationFrame
브라우저에게 수행하기를 원하는 애니메이션을 알리고              
다음 리페인트가 진행되기 전에 해당 애니메이션을 업데이트하는 함수를 호출하게 한다.              
리페인트 이전에 실행할 콜백을 인자로 받는디.              

## save & restore
save -> context의 properties를 저장한다              
restore -> save로 저장하였던 properties를 저장한다                

## sin & cos
sin -> 0 부터 시작하여 1과 -1 사이를 반복한다              
챈 -> 1부터 시작하여 1과 -1 사이를 반복한다                   
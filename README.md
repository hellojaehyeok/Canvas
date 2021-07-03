# React_Canvas

React Canvas 정리

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
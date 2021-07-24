
const PI2 = Math.PI * 2;

export class Polygon{
    constructor(x, y, radius, sides){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.sides = sides;
        this.rotate = 0;
    }

    animate (ctx, moveX) {
        ctx.save();
        ctx.fillStyle = "#000";

        // 외부 n각현
        const angle = PI2/this.sides;
        // 내부 n각형
        const angleInside = PI2/4;
        
        // 기준점을 옮긴다,
        ctx.translate(this.x, this.y);
        
        this.rotate -= moveX*0.002;
        ctx.rotate(this.rotate);


        for(let i = 0 ; i < this.sides ; i++){
            const x = this.radius * Math.cos(angle * i);
            const y = this.radius * Math.sin(angle * i);

            ctx.save();
            // 기준점을 각 꼭지점으로 옮긴다.
            ctx.translate(x, y);
            // 각 방향에 맞게 회전을 시킨다.
            // 360 / this.sides * i -> n만큼 360 을 나누어 키울인다.
            // + 45 -> cos, sin 함수를 활용하여 만든 n각형은 마름모 모양이기 때문에 45를 더해주어 기울기를 바로 잡는다.
            // 라디안값을 구하기 위하여 Math.PI / 180을 곱한다.  
            ctx.rotate(((360 / this.sides * i + 45) * Math.PI / 180));
            ctx.beginPath();
            for(let j = 0 ; j < 4 ; j++){
                const xInside = 180 * Math.cos(angleInside * j);
                const yInside = 180 * Math.sin(angleInside * j);
                j==0?ctx.moveTo(xInside, yInside):ctx.lineTo(xInside, yInside);
            }
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }

        // restore를 한번 더 사용하여 기준점을 다시 잡는다.
        ctx.restore();
    }
};
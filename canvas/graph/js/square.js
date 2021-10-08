export class Square{
    constructor(ctx){
        this.ctx = ctx;
    }

    draw(x, y, width, height, color){
        this.ctx.save();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
        this.ctx.restore();
    }
} 
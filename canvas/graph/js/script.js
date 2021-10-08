
import { Square } from "./square.js";



class App {
    constructor(){
        this.canvas = document.createElement("canvas");
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");
        
        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
        
        window.addEventListener("resize", this.resize.bind(this), false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize(){
        
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.square = new Square(this.ctx);
    }


    animate(){
        window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        var boxSize = 100;
        var colorArr = ["#ffe49c", "#e0abff"];
        let gutter = 0;
        for(let j = 0 ; j < 500 ; j++){
            
            for(let i = 0 ; i < 500 ; i++){
                this.square.draw( 10 + (boxSize*j) + gutter , 10 + (boxSize*i), boxSize, boxSize, colorArr[1]);
            }

            gutter += 5;
        }
        
    }

}

window.onload = () => {
    new App();
} 

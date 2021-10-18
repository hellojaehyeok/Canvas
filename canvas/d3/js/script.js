


var heatmapBoxEls = document.querySelectorAll(".heatmapBox");

for(var i = 0 ; i < heatmapBoxEls.length ; i++){
    heatmapBoxEls[i].style.backgroundColor = "hsl("+ Number(heatmapBoxEls[i].innerHTML.replace("%", "")) * 2.5 +", 100%, 57%)";
}
   

// dot line
var lineArr = [100, 50, 62, 42, 10, 87];
var dotEls = document.querySelectorAll(".dot_line");

var lineHeight = 0;
for(var i = 0 ; i < lineArr.length; i++){
    lineHeight += lineArr[i];
}
let linePlus = 0;
for(var i = 0 ; i < lineArr.length - 1; i++){
    dotEls[i].style.top =  lineArr[i] * (100 / lineHeight) + linePlus + "%";
    linePlus +=lineArr[i] * (100 / lineHeight);
}
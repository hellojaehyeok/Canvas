

// const percent = 100/272602287;
// console.log(percent * (
//     (26107688 - 18185663)+
//     (26297316 - 26107688)+
//     (47503017 - 31185327)+
//     (170085342 - 161052341)+
//     (217668184 - 170085342)+
//     (238692928 - 217668184))
// )


// ------------------------------------------------------
//                         그래프
// ------------------------------------------------------

var xlsxData = [];
var graphWrap = document.querySelector(".graphWrap");
var chartDataArr = {};
var chrTotalData = {};
var chrTotalIndex = 0; 
var chrPercent = {};
var clickX = 0;
var clickY = 0;


// # . 1 엑셀 data 가져오기
function readExcel() {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function () {
        var data = reader.result;
        var workBook = XLSX.read(data, { type: 'binary' });
        workBook.SheetNames.forEach(function (sheetName) {
            var rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
            xlsxData = JSON.parse(JSON.stringify(rows));
            parsingData(xlsxData);
        })
    };
    reader.readAsBinaryString(input.files[0]);
}

// # . 2 data 원하는 형태로 변환
function parsingData(xlsxData){
    for(var i = 0 ; i <  xlsxData.length ; i++){
        for(var key in xlsxData[i]){
            if(key == "f" || key == "m" || key == "__EMPTY" || key == "pos" || key == "chr"){continue;}
            chartDataArr[key] = chartDataArr[key] ? chartDataArr[key] : [];
            chrPercent[key] = {};
            chartDataArr[key].push({ tpye : xlsxData[i][key], pos : xlsxData[i]["pos"], chr : xlsxData[i]["chr"]});
        }

        chrTotalData[xlsxData[i]["chr"]] = xlsxData[i]["pos"];
    }

    for(var key in chrTotalData){
        if(typeof(chrTotalData[key]) !== "number"){continue;}
        chrTotalIndex += chrTotalData[key];
    }

    buildGraph();
} 

// # . 3 그래프 생성
function buildGraph(){

    function makeParent(className){
        var graphElName = document.createElement('div');
        graphElName.classList.add("graphElName");
        var divEl = document.createElement('div');
        divEl.classList.add(className);
        
        var graphName = document.createElement('div');
        graphName.innerText = className;
        graphName.classList.add("graphName");

        graphElName.appendChild( graphName ); 
        graphElName.appendChild( divEl ); 
        graphWrap.appendChild( graphElName ); 
    }
    makeParent("mother");
    makeParent("father");

    // 클 틀 생성
    for(var key in chartDataArr){
        var graphElName = document.createElement('div');
        graphElName.classList.add("graphElName");

        var divEl = document.createElement('div');
        divEl.setAttribute("data-column", key);
        divEl.classList.add("graphEl");

        var graphName = document.createElement('div');
        graphName.innerText = key;
        graphName.classList.add("graphName");

        graphElName.appendChild( graphName ); 
        graphElName.appendChild( divEl ); 
        graphWrap.appendChild( graphElName ); 
        

        // 작은 틀 생성
        for(var keySmall in chrTotalData){
            // if(typeof(chrTotalData[keySmall])!=="number"){continue;}
            var divElSmall = document.createElement('div');
            divElSmall.setAttribute("data-column", keySmall);
            divElSmall.classList.add("chrStack");
            divElSmall.style.height = (100/chrTotalIndex) * chrTotalData[keySmall] + "%";
            divEl.appendChild( divElSmall );
        }
        
        // 작은거 안에 작은거 생성 
        for(var i = 0 ; i < chartDataArr[key].length ; i++){
            var divElSmallStack = document.createElement('div');
            divElSmallStack.setAttribute("data-pos", chartDataArr[key][i]["pos"]);
            divElSmallStack.setAttribute("data-chr", chartDataArr[key][i]["chr"]);
            divElSmallStack.setAttribute("data-tpye", chartDataArr[key][i]["tpye"]);
            divElSmallStack.classList.add("chrStackSmall");


            // 높이값
            var gap = 0;
            if(i==0){
                gap = chartDataArr[key][i]["pos"];
            }else{
                if(chartDataArr[key][i]["chr"] == chartDataArr[key][i-1]["chr"]){
                    gap = chartDataArr[key][i]["pos"] - chartDataArr[key][i-1]["pos"];
                }else{
                    gap = chartDataArr[key][i]["pos"];
                }
            }

            var currentChr = chartDataArr[key][i]["chr"];
            var divElSmall = divEl.querySelector("[data-column=" +currentChr+ "]");
        
            chrPercent[key][currentChr] = chrPercent[key][currentChr] ? chrPercent[key][currentChr] : 0;

            divElSmallStack.style.height = (  100/chrTotalData[currentChr]  ) * gap + "%";
            
            // 배경색
            if(chartDataArr[key][i]["tpye"] == "A"){
                chrPercent[key][currentChr] += (100/chrTotalData[chartDataArr[key][i]["chr"]]) * gap;
                divElSmallStack.style.backgroundColor= "#FF9BBD"
            }else if(chartDataArr[key][i]["tpye"] == "B"){
                divElSmallStack.style.backgroundColor= "#95CAFF"
            }else{
                divElSmallStack.style.backgroundColor= "#FFE395"
            }
            divElSmall.appendChild( divElSmallStack );
        }
    }    


    // var graphContainer = document.querySelector(".graphContainer");

    // // 작은 틀 생성
    // for(var keySmall in chrTotalData){
    //     var divElSmall = document.createElement('div');
    //     divElSmall.classList.add("chrStack");
    //     divElSmall.style.height = (100/chrTotalIndex) * chrTotalData[keySmall] + "%";
    //     graphContainer.appendChild( divElSmall );
    // }

    

    // // 작은 틀 생성
    // var graphContainer = document.querySelector(".graphContainer");

    // var topPercent = 0;
    // for(var key in chrTotalData){
    //     if(typeof(chrTotalData[key])!=="number"){continue}

    //     topPercent += (100/chrTotalIndex) * chrTotalData[key]

    //     var dotEl = document.createElement('div');
    //     dotEl.classList.add("dotline");
    //     dotEl.style.top =  (topPercent * 4.9) + 0 +"px";
    //     graphContainer.appendChild( dotEl );

    //     console.log(key);
    //     console.log((topPercent * 4.9) + 0)
    //     // console.log(topPercent);
    // }


    buildTable();
}


// 드래그&드롭 인터랙션
var isMouseMove = false;
var clickColumn = "";
graphWrap.addEventListener("mousedown", function(e){
    if(e.path[0].classList.contains("chrStackSmall")){
        isMouseMove = true;
        clickColumn = e.path[2].dataset.column;

        var clickEl = document.querySelector("[data-column=" +clickColumn+ "]");
        clickY = e.clientY - clickEl.offsetTop;
        clickX = e.clientX - clickEl.offsetLeft;
    }
});

graphWrap.addEventListener("mousemove", function(e){
    if(!isMouseMove){return};
    var clickEl = document.querySelector("[data-column=" +clickColumn+ "]").parentNode;
    clickEl.style.position = "absolute";
    clickEl.style.top = `${e.clientY - clickY}px`;
    clickEl.style.left = `${e.clientX - clickX}px`;
    clickEl.style.pointerEvents = "none";


    // 그림자
    if(!e.path[2].dataset.column){return;}
    var currentEl = document.querySelector("[data-column=" +e.path[2].dataset.column+ "]").parentNode;
    var currentShadow = document.querySelector(".graphShadow");
    if(currentShadow){
        currentShadow.remove();
    }

    var shadowGraph = document.createElement('div');
    shadowGraph.classList.add("graphShadow");

    clickEl.parentNode.insertBefore(shadowGraph, currentEl)

});

graphWrap.addEventListener("mouseup", function(e){
    isMouseMove = false;
    if(!clickColumn){return;}
    var clickEl = document.querySelector("[data-column=" +clickColumn+ "]").parentNode;
    var currentShadow = document.querySelector(".graphShadow");
    if(!currentShadow){return}

    clickEl.style.position = "unset";
    clickEl.style.top = 0;
    clickEl.style.left = 0;
    clickEl.style.pointerEvents = "all";

    clickEl.parentNode.replaceChild(clickEl, currentShadow);
    sortGraphData();
});


// 그래프 정렬
function sortGraphData(){
    var newChrArr = [];
    var graphEls = document.querySelectorAll(".graphEl");

    for(var i = 0 ; i < graphEls.length ; i++){
        newChrArr.push(graphEls[i].dataset.column)
    }
    var newChrObj = {};

    for(var i = 0 ; i < newChrArr.length ; i++){
        newChrObj[newChrArr[i]] = chartDataArr[newChrArr[i]];
    }
    chartDataArr = newChrObj;
    buildTable();
}






// ------------------------------------------------------
//                         테이블
// ------------------------------------------------------
var isTable = false;
function buildTable(){
    var table = document.querySelector('.table');
    isTable = true;
    // 초기화
    var tableContent = document.querySelector('.tableContent');
    table.remove();

    var newTable = document.createElement('table');
    newTable.classList.add("table");
    

    // 머리
    var thead = document.createElement('thead');
    var theadTr = document.createElement('tr');
    var theadTh = document.createElement('th');
    theadTr.appendChild(theadTh);
    for(var key in chrTotalData){
        var theadTh = document.createElement('th');
        theadTh.innerText = key;
        theadTr.appendChild(theadTh);
    }
    thead.appendChild(theadTr);
    
    


    // 몸통
    var tbody = document.createElement('tbody');
    for(var key in chartDataArr){
        var tbodyTr = document.createElement('tr');
        var tbodyTdName = document.createElement('td');
        tbodyTdName.innerText = key;
        tbodyTr.setAttribute("data-column", key + "_table");
        tbodyTr.appendChild(tbodyTdName);
        tbody.appendChild(tbodyTr);

        for(var keySmall in chrPercent[key]){
            var tbodyTd = document.createElement('td');
            tbodyTd.innerText = chrPercent[key][keySmall].toFixed(2) + "%";
            tbodyTd.style.backgroundColor = "hsl("+ (250-(chrPercent[key][keySmall].toFixed(2) * 2.5)) +", 100%, 57%)";
            tbodyTr.appendChild(tbodyTd);
        }
    }

    
    newTable.appendChild(thead);
    newTable.appendChild(tbody);


    tableContent.appendChild(newTable);

}







// ------------------------------------------------------
//                         사진찍기
// ------------------------------------------------------
function downloadGraphImg(e){
    var graphContainer = document.querySelector(".graphContainer");
    graphContainer.style.width = "unset";
    graphContainer.style.height = "unset";

    html2canvas(graphWrap).then(function(canvas){
        var myImage = canvas.toDataURL();
        downloadURI(myImage, "저장이미지이름.png") 
    });
}
function downloadURI(uri, name){
	var link = document.createElement("a")
	link.download = name;
	link.href = uri;
	document.body.appendChild(link);
	link.click();

    var graphContainer = document.querySelector(".graphContainer");
    graphContainer.style.width = "700px";
    graphContainer.style.height = "600px";

}

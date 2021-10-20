







var xlsxData = [];
var graphWrap = document.querySelector(".graphWrap");
var chartDataArr = {};
var chrTotalData = {};
var chrTotalIndex = 0; 

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
            
            chartDataArr[key].push({ tpye : xlsxData[i][key], pos : xlsxData[i]["pos"], chr : xlsxData[i]["chr"]});
        }

        chrTotalData[xlsxData[i]["chr"]] = xlsxData[i]["pos"];
    }

    for(var key in chrTotalData){
        if(typeof(chrTotalData[key]) !== "number"){continue;}
        chrTotalIndex += chrTotalData[key];
    }

    buildGraph(chrTotalData, chrTotalIndex);
} 

// # . 그래프 생성
function buildGraph(chrTotalData, chrTotalIndex){

    // 클 틀 생성
    for(var key in chartDataArr){
        var divEl = document.createElement('div');
        divEl.setAttribute("data-column", key);
        divEl.classList.add("graphEl");
        graphWrap.appendChild( divEl );
        
        
        // 작은 틀 생성
        for(var keySmall in chrTotalData){
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
            var divElSmall = divEl.querySelector("[data-column=" +chartDataArr[key][i]["chr"]+ "]");
            divElSmallStack.style.height = (  100/chrTotalData[chartDataArr[key][i]["chr"]]  ) * gap + "%";
            
            // 배경색
            if(chartDataArr[key][i]["tpye"] == "A"){
                divElSmallStack.style.backgroundColor= "#FF9BBD"
            }else if(chartDataArr[key][i]["tpye"] == "B"){
                divElSmallStack.style.backgroundColor= "#95CAFF"
            }else{
                divElSmallStack.style.backgroundColor= "#FFE395"
            }
            
            divElSmall.appendChild( divElSmallStack );
        }
    }
}


// window.addEventListener("click", function(e){
    
//     if(e.path[0].classList.contains("chrStackSmall")){
//         // console.log(e.path[1].dataset.column);
//         // console.log(e.path[2].dataset.column);
//         // console.log(chartDataArr);

//         console.log(chartDataArr[e.path[2].dataset.column]);
//     }
// });
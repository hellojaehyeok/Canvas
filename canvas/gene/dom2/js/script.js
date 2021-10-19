




var xlsxData = [];
var graphWrap = document.querySelector(".graphWrap");





function readExcel() {
    let input = event.target;
    let reader = new FileReader();
    reader.onload = function () {
        let data = reader.result;
        let workBook = XLSX.read(data, { type: 'binary' });
        workBook.SheetNames.forEach(function (sheetName) {
            let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
            xlsxData = JSON.parse(JSON.stringify(rows));

            let chartDataArr = {};
            for(var i = 0 ; i <  xlsxData.length ; i++){

                for(var key in xlsxData[i]){
                    if(key == "f" || key == "m" || key == "__EMPTY" || key == "pos" || key == "chr"){continue;}
                    chartDataArr[key] = chartDataArr[key] ? chartDataArr[key] : [];

                    chartDataArr[key].push({ tpye : xlsxData[i][key], pos : xlsxData[i]["pos"]  })
                }

            }


            for(var key in chartDataArr){
                var divEl = document.createElement( 'div' );
                graphWrap.appendChild( divEl );


                // chartDataArr[key]
            }


        })
    };
    reader.readAsBinaryString(input.files[0]);
}












    // let chartDataArr = {};
    // for(var i = 0 ; i <  xlsxData.length ; i++){
    //     chartDataArr[ xlsxData[i]["chr"]] = chartDataArr[ xlsxData[i]["chr"]] ? chartDataArr[ xlsxData[i]["chr"]] : {};

    //     for(var key in xlsxData[i]){
    //         if(key == "f" || key == "m" || key == "__EMPTY" || key == "pos" || key == "chr"){continue;}
    //         chartDataArr[ xlsxData[i]["chr"]][key] = chartDataArr[ xlsxData[i]["chr"]][key]?chartDataArr[ xlsxData[i]["chr"]][key]:[];
    //         chartDataArr[ xlsxData[i]["chr"]][key].push( { pos : xlsxData[i]["pos"], type : xlsxData[i][key] } )
    //     }
    // }
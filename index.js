// 필드 생성

var fields = [
  {
    fieldName: "KorName",
    dataType: "text"
  },
  {
    fieldName: "Gender",
    dataType: "text"
  },
  {
    fieldName: "Age",
    dataType: "number"
  },
  {
    fieldName: "Phone",
    dataType: "text"
  },
  {
    fieldName: "ProductId",
    dataType: "text"
  },
  {
    fieldName: "KorCountry",
    dataType: "text"
  },
  {
    fieldName: "OrderDate",
    dataType: "datetime",
    datetimeFormat: "yyyy-MM-dd",
    amText: "오전",
    pmText: "오후"
  },
  {
    fieldName: "CardNumber",
    dataType: "text"
  },
  {
    fieldName: "Monetary",
    dataType: "text"
  },
  {
    fieldName: "StartDate",
    dataType: "datetime",
    datetimeFormat: "yyyy-MM-dd",
    amText: "오전",
    pmText: "오후"
  },
  {
    fieldName: "EndDate",
    dataType: "datetime",
    datetimeFormat: "yyyy-MM-dd",
    amText: "오전",
    pmText: "오후"
  },
  {
    fieldName: "ToMonth",
    dataType: "number"
  },
  {
    fieldName: "Month",
    dataType: "number"
  },
  {
    fieldName: "Year",
    dataType: "number"
  },
  {
    fieldName: "InterestRate",
    dataType: "number"
  },
  {
    fieldName: "SaveCost",
    dataType: "number"
  },
  {
    fieldName: "SaveMaturity",
    dataType: "number"
  },
  {
    fieldName: "CurrentSave",
    dataType: "number"
  }
];

var columns = [
  {
    name: "KorName",
    fieldName: "KorName",
    width: "60",
    header: {
      text: "이름"
    },
    renderer: {
      type: "text"
    }
  },
  {
    name: "Gender",
    fieldName: "Gender",
    width: "40",
    header: {
      text: "성별"
    },
    renderer: {
      type: "text"
    }
  },
  {
    name: "Age",
    fieldName: "Age",
    width: "40",
    header: {
      text: "나이"
    },
    renderer: {
      type: "text"
    }
  },
  {
    name: "Phone",
    fieldName: "Phone",
    width: "100",
    header: {
      text: "전화번호"
    },
    renderer: {
      type: "text"
    }
  },
  {
    name: "ProductId",
    fieldName: "ProductId",
    width: "120",
    header: {
      text: "제품번호"
    },
    renderer: {
      type: "text"
    }
  },
  {
    name: "KorCountry",
    fieldName: "KorCountry",
    width: "100",
    header: {
      text: "투자국가"
    },
    renderer: {
      type: "text"
    }
  },
  {
    name: "OrderDate",
    fieldName: "OrderDate",
    width: "100",
    header: {
      text: "주문일자"
    }
  },
  {
    name: "CardNumber",
    fieldName: "CardNumber",
    width: "140",
    header: {
      text: "카드번호"
    },
    renderer: {
      type: "text"
    }
  },
  {
    name: "Monetary",
    fieldName: "Monetary",
    width: "40",
    header: {
      text: "통화"
    },
    renderer: {
      type: "text"
    }
  },
  {
    name: "StartDate",
    fieldName: "StartDate",
    width: "100",
    header: {
      text: "최초납입일"
    }
  },
  {
    name: "EndDate",
    fieldName: "EndDate",
    width: "100",
    header: {
      text: "종료일"
    }
  },
  {
    name: "ToMonth",
    fieldName: "ToMonth",
    width: "40",
    header: {
      text: "납입 횟수"
    }
  },
  {
    name: "Month",
    fieldName: "Month",
    width: "40",
    header: {
      text: "남은 횟수"
    }
  },
  {
    name: "InterestRate",
    fieldName: "InterestRate",
    width: "40",
    numberFormat: "0.00",
    header: {
      text: "이율"
    }
  },
  {
    name: "SaveCost",
    fieldName: "SaveCost",
    width: "80",
    numberFormat: "#,##0",
    header: {
      text: "납입금"
    }
  },
  {
    name: "SaveMaturity",
    fieldName: "SaveMaturity",
    width: "80",
    numberFormat: "#,##0",
    header: {
      text: "만기금액"
    }
  },
  {
    name: "CurrentSave",
    fieldName: "CurrentSave",
    width: "80",
    numberFormat: "#,##0",
    header: {
      text: "현재잔액"
    }
  }
];
  
  var httpRequest;
  
  function setProvider(filename) {
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = loadData;
    httpRequest.open("GET", "/public/data/" + filename);
    httpRequest.send();
  }
  // 데이터 가져오는 함수
  function loadData() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        var data = httpRequest.responseText;
        dataProvider.fillXmlData(data);
        dataProvider.setRows(data);
        gridView.refresh();
      }
    }
  }
  
  var dataProvider, gridContainer, grid, gridView;
  
  //표 만들기 함수
  function createGrid(container) {
    dataProvider = new RealGrid.LocalDataProvider();
    gridView = new RealGrid.GridView(container);
  
    gridView.setDataSource(dataProvider);
    //필드생성
    dataProvider.setFields(fields);
    //타이틀 형성(맨 위 가로줄)
    gridView.setColumns(columns);
    // 표 스타일 설정
    gridView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
    gridView.displayOptions.rowHeight = 36;
    gridView.header.height = 40;
    gridView.footer.height = 40;
    gridView.stateBar.width = 16;
    gridView.editOptions.insertable = true;
    gridView.editOptions.appendable = true;
    // 토스트 팝업
    gridView.groupPanel.visible = true;
  
    // 체크바 & 데이터 필드 연동
    gridView.checkBar.fieldName = "Bool2"; 
  
    fillXmlData();
    setContextMenu(gridView);
    btnSetToastView();
    setFilters();
  }
  
  function start() {
    createGrid("realgrid");
  }
  
  // $.document.ready(start);
  window.onload = start;
  // domloaded를 대신 써도 됩니다.
  // 페이지가 언로드되거나 브라우저 창 닫으면 발생.(gridView, dataProvider)
  window.onunload = function() {
    dataProvider.clearRows();
  
    gridView.destroy();
    dataProvider.destroy();
  
    gridView = null;
    dataProvider = null;
  }

  function btnSetContextMenu() {
    gridView.setContextMenu([
      {
        label: "Menu1"
      },
      {
        label: "Menu2"
      },
      {
        label: "-" // menu separator를 삽입합니다.
      },
      {
        label: "ExcelExport"
      }
    ]);
  }
  
  // 실제 들어가는 데이터(초기값)
  function fillXmlData() {
    var data = '<rows>    <row KorName= "박영호" Gender= "남" Age= "71" Phone= "(025)6563-2802" ProductId= "198160731-00008" KorCountry= "모잠비크" OrderDate= "2021-01-16" CardNumber= "5587-2139-9692-3644" Monetary= "EUR" StartDate= "2018-02-25" EndDate= "2021-08-12" ToMonth= "23" Month= "41" Year= "3" InterestRate= "0.15" SaveCost= "51000" SaveMaturity= "14950650" CurrentSave= "9304950"  Rating= "5" BusinessProficiency= "59" Address= "서울특별시 강서구 공항동 45-89"/>    <row KorName= "조일형" Gender= "남" Age= "62" Phone= "(093)8809-8696" ProductId= "571215854-00001" KorCountry= "캐나다" OrderDate= "2019-07-29" CardNumber= "5348-5093-3750-0623" Monetary= "USD" StartDate= "2019-10-21" EndDate= "2022-12-11" ToMonth= "3" Month= "37" Year= "3" InterestRate= "0.38" SaveCost= "14000" SaveMaturity= "7801080" CurrentSave= "1108520" Rating= "3" BusinessProficiency= "53" Address= "서울특별시 중구 봉래동2가 122" />  </rows>';
  
    dataProvider.fillXmlData(data, { fillMode: "set" });
  }
//   마지막 줄에 추가(append)
  function appendData() {
    var data = '<rows>\
      <row KorName= "박영호" Gender= "남" Age= "71" Phone= "(025)6563-2802" ProductId= "198160731-00008" KorCountry= "모잠비크" OrderDate= "2021-01-16" CardNumber= "5587-2139-9692-3644" Monetary= "EUR" StartDate= "2018-02-25" EndDate= "2021-08-12" ToMonth= "23" Month= "41" Year= "3" InterestRate= "0.15" SaveCost= "51000" SaveMaturity= "14950650" CurrentSave= "9304950"  Rating= "5" BusinessProficiency= "59" Address= "서울특별시 강서구 공항동 45-89"/>\
      <row KorName= "조일형" Gender= "남" Age= "62" Phone= "(093)8809-8696" ProductId= "571215854-00001" KorCountry= "캐나다" OrderDate= "2019-07-29" CardNumber= "5348-5093-3750-0623" Monetary= "USD" StartDate= "2019-10-21" EndDate= "2022-12-11" ToMonth= "3" Month= "37" Year= "3" InterestRate= "0.38" SaveCost= "14000" SaveMaturity= "7801080" CurrentSave= "1108520" Rating= "3" BusinessProficiency= "53" Address= "서울특별시 중구 봉래동2가 122" />\
    </rows>';
  
    dataProvider.fillXmlData(data, { fillMode: "append", start: 0, count: 1 });
  }
  // 클릭 열 위로 추가됨(insert)
  function insertData() {
    var data = '<rows>\
      <row KorName= "소정현" Gender= "남" Age= "31" Phone= "(025)6563-2802" ProductId= "198160731-00008" KorCountry= "모잠비크" OrderDate= "2021-01-16" CardNumber= "5587-2139-9692-3644" Monetary= "EUR" StartDate= "2018-02-25" EndDate= "2021-08-12" ToMonth= "23" Month= "41" Year= "3" InterestRate= "0.15" SaveCost= "51000" SaveMaturity= "14950650" CurrentSave= "9304950"  Rating= "5" BusinessProficiency= "59" Address= "서울특별시 강서구 공항동 45-89"/>\
      <row KorName= "소정현" Gender= "남" Age= "31" Phone= "(093)8809-8696" ProductId= "571215854-00001" KorCountry= "캐나다" OrderDate= "2019-07-29" CardNumber= "5348-5093-3750-0623" Monetary= "USD" StartDate= "2019-10-21" EndDate= "2022-12-11" ToMonth= "3" Month= "37" Year= "3" InterestRate= "0.38" SaveCost= "14000" SaveMaturity= "7801080" CurrentSave= "1108520" Rating= "3" BusinessProficiency= "53" Address= "서울특별시 중구 봉래동2가 122" />\
    </rows>';
  
    dataProvider.fillXmlData(data, { 
      fillMode: "insert",
      start: 1,
      count: 1,
      fillPos: 0 
    });
  }
  // indicator off
  function setIndicatorInvisible() {
    gridView.setRowIndicator({
      visible: false
    });
  }
//   indicator on
  function setIndicatorVisible() {
    gridView.rowIndicator.visible = true;
    gridView.rowIndicator.width = 8;
  }
// 상태바
  function btnSetStateBarText() {
    dataProvider.setRowState(0,"created");
    dataProvider.setRowState(1,"updated");
    dataProvider.setRowState(2,"createAndDeleted");
    dataProvider.setRowState(3,"deleted");
    
    gridView.setStateBar({
      mark: "text",
      stateTexts: {
        created: "C",
        updated: "U",
        deleted: "D",
        createAndDeleted: "X"
      }
    });
  }
  
  function btnSetStateBarDefault() {
    gridView.setStateBar({
      mark: "image"
    });
  }
//헤더셀 영역에서는 컨텍스트 메뉴 실행하지 않음
  function btnOnContextMenuPopup() {
    gridView.onContextMenuPopup = function(grid, x, y, elementName) {
      
      return elementName.cellType != "header";
    };
  }

var toggle = false;
function setContextMenu(grid) {
   grid.onContextMenuItemClicked = function (grid, item, clickData) { 
       if (item.tag == "excel") {
           grid.exportGrid({
               type: "excel",
               target: "local",
               fileName: "gridExportSample.xlsx"
           });
       } else if (item.tag == 'filter' && clickData.column) {
           createColumnFilter(grid, clickData.column);
       } else if (item.tag == 'visibleTrue') {
           var columns = grid.getColumns();

           for (var i in columns) {
               grid.setColumnProperty(columns[i].name, "visible", true);
           }
           toggle = false;
           setHeaderCellContextMenu(grid, toggle);
       } else if (item.tag == 'visibleFalse') {
           grid.setColumnProperty(clickData.column, "visible", false);

           toggle = true;
           setHeaderCellContextMenu(grid, toggle);
       } else if (item.tag == 'fixedCol') {
           var count = grid.getColumnProperty(clickData.column, "displayIndex") + 1;
           grid.setFixedOptions({ colCount: count });
       } else if (item.tag == 'fixedRow') {
           var count = clickData.itemIndex + 1;
           grid.setFixedOptions({ rowCount: count });
       } else if (item.tag == 'fixedCancel') {
           grid.setFixedOptions({ colCount: 0, rowCount: 0 });
       };
   }

   grid.onContextMenuPopup = function (grid, x, y, elementName) {
       if (elementName.cellType == 'header') {
           setHeaderCellContextMenu(grid, toggle);
       } else if (elementName.cellType == 'data') {
           setDataCellContextMenu(grid);
       } else {
           return false;
       }
   };

   setDataCellContextMenu(grid);
}

function setHeaderCellContextMenu(grid, val) {
   var contextMenu = [{
       label: '엑셀 내보내기',
       tag: 'excel'
   }, {
       label: '필터 만들기',
       tag: 'filter'
   }, {
       label: "-"
   }, {
       label: '컬럼 숨기기',
       tag: 'visibleFalse'
   }, {
       label: '컬럼 모두 보이기',
       tag: 'visibleTrue',
       enabled: val
   }];

   grid.setContextMenu(contextMenu);
}

function setDataCellContextMenu(grid) {
   var contextMenu = [{
       label: '엑셀 내보내기',
       tag: 'excel'
   }, {
       label: "-"
   }, {
       label: '열 고정',
       tag: 'fixedCol'
   }, {
       label: '행 고정',
       tag: 'fixedRow'
   }, {
       label: '고정 취소',
       tag: 'fixedCancel'
   }];

   grid.setContextMenu(contextMenu);
}

// 헤더 컨텍스트 메뉴
function setHeaderCellContextMenu(grid, val) {
   var contextMenu = [{
       label: '엑셀 내보내기',
       tag: 'excel'
   }, {
       label: '필터 만들기',
       tag: 'filter'
   }, {
       label: "-"
   }, {
       label: '컬럼 숨기기',
       tag: 'visibleFalse'
   }, {
       label: '컬럼 모두 보이기',
       tag: 'visibleTrue',
       enabled: val
   }];

   grid.setContextMenu(contextMenu);
}

// 컨텍스트 한글메뉴
function setDataCellContextMenu(grid) {
   var contextMenu = [{
       label: '엑셀 내보내기',
       tag: 'excel'
   }, {
       label: "-"
   }, {
       label: '열 고정',
       tag: 'fixedCol'
   }, {
       label: '행 고정',
       tag: 'fixedRow'
   }, {
       label: '고정 취소',
       tag: 'fixedCancel'
   }];

   grid.setContextMenu(contextMenu);
}

function createColumnFilter(grid, colName) {
    var fieldName = grid.getColumnProperty(colName, "fieldName");
    var distinctValues = dataProvider.getDistinctValues(fieldName);
    var filters = [];

    for (var i = 0; i < distinctValues.length; i++) {
        filters.push({ name: distinctValues[i], criteria: "value = " + "'" + distinctValues[i] + "'" });
    }

    grid.setColumnFilters(colName, filters);
}
setContextMenu(grid);
// 필터 함수(필터창에 나오는 목록)
function setFilters(){
  var filters = [
    {
      name: "모잠비크",
      criteria: "value = '모잠비크'"
    },
    {
      name: "캐나다",
      criteria: "value = '캐나다'"
    }
  ];
  gridView.setColumnFilters("KorCountry", filters);
}

setContextMenu(grid);

function btnSetToastView() {
  gridView.sortingOptions.toast.visible = true;
  gridView.sortingOptions.toast.message = "정렬 중입니다..."

  gridView.filteringOptions.toast.visible = true;
  gridView.filteringOptions.toast.message = "필터링 중입니다..."

  gridView.groupingOptions.toast.visible = true;
  gridView.groupingOptions.toast.message = "그룹핑 입니다..."

  /*
  gridView.setOptions({
    sorting: {
      toast: {
        visible: true,
        message: "정렬 중입니다..."
      }
    },
    filtering: {
      toast: {
        visible: true,
        message: "필터링 중입니다..."
      }
    },
    grouping: {
      toast: {
        visible: true,
        message: "그룹핑 중입니다..."
      }
    }
  });
  */
}
// 셀 기준 왼쪽 열 고정
function btnSetColCount() {
  gridView.setFixedOptions({
    colCount: 2
  });
}
// 셀 기준 아래 행 고정
function btnSetRowCount() {
  gridView.setFixedOptions({
    rowCount: 2
  });
}

function btnSetSelectionStyleSingleColumn() {
  gridView.displayOptions.selectionStyle = "singleColumn"
}

function btnSetSelectionStyleSingleRow() {
  gridView.displayOptions.selectionStyle = "singleRow"
}

function btnSetSelectionStyleNone() {
  gridView.displayOptions.selectionStyle = "none"
}
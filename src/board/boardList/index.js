import "./index.css";
import { Button, Input } from "antd";
import React from "react";
const { Search } = Input;

function BoardList() {
  // 임시데이터
  const boardListData = [
    {
      index: "1",
      title: "안녕하세요",
      writename: "김철수",
    },
    { index: "2", title: "테스트입니다", writename: "홍길동" },
    { index: "3", title: "임시 글 입니다", writename: "영희" },
    { index: "4", title: "임시 글 입니다", writename: "영희" },
    { index: "5", title: "임시 글 입니다", writename: "영희" },
    { index: "6", title: "임시 글 입니다", writename: "영희" },
    { index: "7", title: "임시 글 입", writename: "영희" },
    { index: "8", title: "임시 글 입니다", writename: "영희" },
    { index: "9", title: "임시 글 입다", writename: "영희" },
    { index: "10", title: "임시 글 입니다", writename: "영희" },
    { index: "11", title: "임시 글니다", writename: "영희" },
    { index: "12", title: "임시 글 입니다", writename: "영희" },
    { index: "13", title: "임시 글니다", writename: "영희" },
    { index: "14", title: "임시 글 입니다", writename: "영희" },
    { index: "15", title: "임시 글 입니다", writename: "영희" },
    { index: "16", title: "임시 니다", writename: "영희" },
    { index: "17", title: "임시 글 입니다", writename: "영희" },
    { index: "18", title: "임시 글 입니다", writename: "영희" },
    { index: "19", title: "임시니다", writename: "영희" },
    { index: "20", title: "임시 글 입니다", writename: "영희" },
    { index: "21", title: "임시 글 입니다", writename: "영희" },
    { index: "22", title: "임시 글 입니다", writename: "영희" },
    { index: "23", title: "임시 글 입니다", writename: "영희" },
  ];
  var searchLishData = boardListData;

  var maxViewIndex = 10; // 페이지에서 보여주는 글의 갯수
  var [searchLishData, setSearchLishData] = React.useState(boardListData);
  var [curViewPage, setViewPage] = React.useState(0); // 현재의 페이지
  var maxViewPage = parseInt(searchLishData.length / maxViewIndex); // 글의 데이터상 최대 페이지수

  // 게시판의 페이지 버튼 설정
  const pagebuttonset = () => {
    const result = [];
    for (var i = 0; i <= maxViewPage; i++) {
      const key = i;
      result.push(
        <Button
          onClick={() => {
            setViewPage(key);
          }}
          className="tabel-pagebutton"
          key={key}
          type={curViewPage === key ? "primary" : "default"}
        >
          {key + 1}
        </Button>
      );
    }

    return result;
  };
  const onSearch = (value) => {
    var searchLishData = [];
    if (value == "") return;

    boardListData.map(function (boardData, index) {
      if (boardData.title.indexOf(value) != -1) searchLishData.push(boardData);
    });
    console.log(searchLishData.length);

    setSearchLishData(searchLishData);
  };

  return (
    <div>
      <h1 id="board-title">게시판 이름</h1>

      <table id="table">
        <thead>
          <tr>
            <th id="table-id">글 번호</th>
            <th id="table-title">글 제목</th>
            <th id="table-writename">작성자</th>
          </tr>
        </thead>
        <tbody>
          {searchLishData.map(function (boardData, index) {
            var curminviewindex = curViewPage * maxViewIndex;
            var curmaxviewindex = curminviewindex + maxViewIndex;
            if (index >= curmaxviewindex) return;
            if (index < curminviewindex) return;
            console.log(searchLishData.length);
            return (
              <tr key={index}>
                <td>{boardData.index}</td>
                <td>{boardData.title}</td>
                <td>{boardData.writename}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
      <div id="table-bottom">
        {pagebuttonset()}
        <div id="table-search">
          <Search
            placeholder="검색어를 입력해 주세요."
            allowClear
            style={{ width: 200 }}
            onSearch={onSearch}
          ></Search>
        </div>
      </div>
    </div>
  );
}
export default BoardList;

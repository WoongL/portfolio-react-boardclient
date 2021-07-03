import "./index.css";
import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URI } from "../../config/constants";
import { Link } from "react-router-dom";
// import CaretLeftOutlined

const { Search } = Input;

function BoardList({ history, location }) {
  // 임시데이터
  //1
  const [boardListData, setBoardListData] = React.useState([]);

  var maxViewIndex = 10; // 페이지에서 보여주는 글의 갯수
  var [curViewPage, setViewPage] = React.useState(0); // 현재의 페이지

  var maxViewPage = Math.ceil(boardListData.length / maxViewIndex); // 글의 데이터상 최대 페이지수

  const getBoard = () => {
    axios
      .get(`${API_URI}/board${location.search}`)
      .then((result) => {
        setBoardListData(result.data.board);
        setViewPage(0);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    getBoard();
  }, [location]);
  // 게시판의 페이지 버튼 설정
  const pagebuttonset = () => {
    const result = [];
    for (var i = 0; i < maxViewPage; i++) {
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

  return (
    <div>
      <table id="table">
        <thead>
          <tr>
            <th id="table-id">글 번호</th>
            <th id="table-title">글 제목</th>
            <th id="table-writename">작성자</th>
            <th id="table-hit">조회수</th>
          </tr>
        </thead>
        <tbody>
          {boardListData.map(function (boardData, index) {
            var curminviewindex = curViewPage * maxViewIndex;
            var curmaxviewindex = curminviewindex + maxViewIndex;
            if (index >= curmaxviewindex) return;
            if (index < curminviewindex) return;
            return (
              <tr
                key={index}
                onClick={() => {
                  history.push(`/${boardData.id}${location.search}`);
                }}
              >
                <td>{boardData.id}</td>
                <td>{boardData.title}</td>
                <td>{boardData.writer}</td>
                <td>{boardData.hit}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>

      <div id="tabel-bottom">
        <Link to="">
          <Button className="table-topButton">목록</Button>
        </Link>
        <Link to="/write">
          <Button className="table-topButton">글쓰기</Button>
        </Link>
      </div>
      <div id="table-bottom2">
        <div>{pagebuttonset()}</div>
        <div id="table-search">
          <Search
            id="table-searchbar"
            placeholder="검색어를 입력해 주세요."
            allowClear
            style={{ width: 200 }}
            onSearch={(value) => {
              if (value != "") history.push(`?search=${value}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default BoardList;

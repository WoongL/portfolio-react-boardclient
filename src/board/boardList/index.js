import "./index.css";
import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URI } from "../../config/constants";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import getQueryString from "../../main/getQueryString";
import $ from "jquery";

const { Search } = Input;

function BoardList({ history, location }) {
  // 임시데이터
  //

  const [boardListData, setBoardListData] = React.useState([]);

  var curquerypagescale = getQueryString(["pagescale"], location).replace(
    "?pagescale=",
    ""
  );
  var curquerypage = getQueryString(["page"], location).replace("?page=", "");

  var maxViewIndex = curquerypagescale != "" ? curquerypagescale : 10; // 페이지에서 보여주는 글의 갯수
  var [curViewPage, setViewPage] = React.useState(
    curquerypage != "" ? curquerypage - 1 : 0
  ); // 현재의 페이지
  var [boardsearchcount, setBoardSearchCount] = React.useState(0);

  var maxViewPage = Math.ceil(boardsearchcount / maxViewIndex); // 글의 데이터상 최대 페이지수

  const getBoard = () => {
    axios
      .get(
        `${API_URI}/board${getQueryString(
          ["search", "page", "pagescale"],
          location
        )}`
      )
      .then((result) => {
        setBoardSearchCount(result.data.count.count);
        setBoardListData(result.data.board);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    getBoard();
  }, [location]);
  // 게시판의 페이지 버튼 설정
  const pagebuttonset = () => {
    const result = [];
    var startindex = curViewPage - 4 < 0 ? 0 : curquerypage - 4;
    var endindex =
      curViewPage + 5 > maxViewPage ? maxViewPage : curViewPage + 5;

    for (var i = startindex; i < endindex; i++) {
      const key = i;
      result.push(
        <Button
          onClick={() => {
            history.push(
              `?page=${key + 1}&pagescale=${maxViewIndex}${getQueryString(
                ["search"],
                location,
                false
              )}`
            );
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
  $("html").scrollTop(0);
  return (
    <div>
      <table id="table">
        <thead>
          <tr>
            <th id="table-id">글 번호</th>
            <th id="table-title">글 제목</th>
            <th id="table-writename">작성자</th>
            <th id="table-createdat">작성일</th>
            <th id="table-hit">조회수</th>
          </tr>
        </thead>
        <tbody>
          {boardListData.map(function (boardData, index) {
            return (
              <tr
                key={index}
                onClick={() => {
                  history.push(
                    `/${boardData.id}${getQueryString(
                      ["search", "page", "pagescale"],
                      location
                    )}`
                  );

                  getBoard();
                }}
              >
                <td>{boardData.id}</td>
                <td>{boardData.title}</td>
                <td>{boardData.writer}</td>
                <td>{dayjs(boardData.createdAt).format("MM-DD")}</td>
                <td id={`table-id${boardData.id}-hit`}>{boardData.hit}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>

      <div id="tabel-bottom">
        <Link to="">
          <Button
            className="table-topButton"
            onClick={() => {
              setViewPage(0);
            }}
          >
            목록
          </Button>
        </Link>
        <Link to="/write">
          <Button
            className="table-topButton"
            onClick={() => {
              setViewPage(0);
            }}
          >
            글쓰기
          </Button>
        </Link>
      </div>
      <div id="table-bottom2">
        <div id="table-pagebuttonset">{pagebuttonset()}</div>
        <div id="table-search">
          <Search
            id="table-searchbar"
            placeholder="검색어를 입력해 주세요."
            allowClear
            style={{ width: 200 }}
            onSearch={(value) => {
              if (value != "") {
                setViewPage(0);
                history.push(`/?search=${value}`);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default BoardList;

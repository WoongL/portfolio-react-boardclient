import { useParams } from "react-router-dom";
import "./index.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URI } from "../../config/constants";
import dayjs from "dayjs";
import { Button, Input, Form } from "antd";
import getQueryString from "../../main/getQueryString";
import $ from "jquery";
import BoardReply from "../boardReply";

function BoardDetail({ location, history }) {
  const { id } = useParams();

  const [boarddata, setboarddata] = useState(null);

  const getBoardDetail = () => {
    axios
      .get(`${API_URI}/board/${id}`)
      .then((result) => {
        setboarddata(result.data.board);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    getBoardDetail();
  }, [location]);

  if (!boarddata) return <div></div>;

  //조회수증가가 제일 마지막 통신이기 때문에 게시글 보는 화면에서 목록창의 조회수의 동기화를 위한 Jquery
  $(`#table-id${boarddata.id}-hit`).html(boarddata.hit);

  return (
    <div>
      <div id="boarddetail">
        <div id="boarddetail-header">
          <span id="boarddetail-writer">{boarddata.writer}</span>
          <span id="boarddetail-createdat">
            {dayjs(boarddata.createdAt).format("YYYY-MM-DD HH:mm")}
          </span>
          <span id="boarddetail-hit">조회수 : {boarddata.hit}</span>
        </div>
        <div id="boarddetail-body">
          <h1 id="boarddetail-title">{boarddata.title}</h1>
          <p id="boarddetail-content">{boarddata.content}</p>
        </div>
        <div id="boarddetail-button">
          <Button
            size="large"
            onClick={() => {
              history.push(
                `/${id}/update${getQueryString(
                  ["search", "page", "pagescale"],
                  location,
                  true
                )}`
              );
            }}
          >
            수정
          </Button>
          <Button
            size="large"
            onClick={() => {
              // 로그인 기능 추가시 인증후 삭제
              history.push(
                `/${id}/delete${getQueryString(
                  ["search", "page", "pagescale"],
                  location,
                  true
                )}`
              );
            }}
          >
            삭제
          </Button>
        </div>
      </div>
      <BoardReply id={boarddata.id} history={history} location={location} />
    </div>
  );
}

export default BoardDetail;

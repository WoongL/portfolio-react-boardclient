import { useParams } from "react-router-dom";
import "./index.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URI } from "../../config/constants";
import dayjs from "dayjs";
import { Button, Input, Form } from "antd";

function BoardDetail({ location, history }) {
  const { id } = useParams();

  const [boarddata, setboarddata] = useState(null);
  var isDeleteflag = false;

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

  const deleteBoard = () => {
    if (isDeleteflag) return;
    isDeleteflag = true;
    axios
      .delete(`${API_URI}/board/${id}`)
      .then((result) => {})
      .catch((error) => {});
    history.push("/");
  };

  if (!boarddata) return <div></div>;
  return (
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
            console.log("1");
          }}
        >
          수정
        </Button>
        <Button
          size="large"
          onClick={() => {
            // 로그인 기능 추가시 인증후 삭제
            deleteBoard();
          }}
        >
          삭제
        </Button>
      </div>
    </div>
  );
}

export default BoardDetail;

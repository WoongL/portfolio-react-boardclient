import { useParams } from "react-router-dom";
import "./index.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URI } from "../../config/constants";

function BoardDetail({ location }) {
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
  return (
    <div id="boarddetail">
      <div id="boarddetail-header">
        <span id="boarddetail-writer">{boarddata.writer}</span>
        <span id="boarddetail-hit">조회수 : {boarddata.hit}</span>
      </div>
      <div id="boarddetail-body">
        <h1 id="boarddetail-title">{boarddata.title}</h1>
        <p id="boarddetail-content">{boarddata.content}</p>
      </div>
    </div>
  );
}

export default BoardDetail;

import { useParams } from "react-router-dom";
import "./index.css";

function BoardDetail() {
  const { id } = useParams();

  const boarddata = {
    index: "1",
    title: "안녕하세요 첫번째 글입니다",
    content: "임시 테스트클 확인중",
    writer: "김철수",
    hit: "0",
  };

  return (
    <div id="boarddetail">
      <h1>{boarddata.title}</h1>
      <span>작성자 : {boarddata.writer}</span>
      <br />
      <p>{boarddata.content}</p>

      <span>조회수 : {boarddata.hit}</span>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <span>id:{id}</span>
    </div>
  );
}

export default BoardDetail;

import "./index.css";
import BoardList from "../board/boardList";

function MainPage() {
  return (
    <div id="body">
      <h1 id="board-title">게시판 이름</h1>

      <BoardList />
    </div>
  );
}

export default MainPage;

import "./index.css";
import BoardList from "../board/boardList";
import { Route, Switch } from "react-router-dom";

function MainPage() {
  return (
    <div id="body">
      <h1 id="board-title">게시판 이름</h1>
      <Switch>
        <Route exact={true} path="/" component={BoardList} />
      </Switch>
    </div>
  );
}

export default MainPage;

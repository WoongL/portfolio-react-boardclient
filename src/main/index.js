import "./index.css";
import BoardList from "../board/boardList";
import { Route, Router, Switch } from "react-router-dom";
import BoardDetail from "../board/boardDetail";

function MainPage() {
  return (
    <div id="body">
      <h1 id="board-title">게시판 이름</h1>

      <Switch>
        <Route exact={true} path="/write" component={() => <div>b</div>} />
        <Route exact={true} path="/:id" component={BoardDetail} />
      </Switch>
      <Route path="/" component={BoardList} />
    </div>
  );
}

export default MainPage;

import "./index.css";
import BoardList from "../board/boardList";
import { Route, Router, Switch } from "react-router-dom";
import BoardDetail from "../board/boardDetail";
import BoardWrite from "../board/boardWrite";
import boardPasswordCheck from "../board/boardPasswordCheck";
import ReplyPasswordCheck from "../board/replyPasswordCheck";

function MainPage() {
  return (
    <div id="body">
      <h1 id="board-title">게시판</h1>

      <Switch>
        <Route exact={true} path="/write" component={BoardWrite} />
        <Route exact={true} path="/:id/delete" component={boardPasswordCheck} />
        <Route exact={true} path="/:id/update" component={boardPasswordCheck} />
        <Route
          exact={true}
          path="/:id/:replyid/update"
          component={ReplyPasswordCheck}
        />
        <Route
          exact={true}
          path="/:id/:replyid/delete"
          component={ReplyPasswordCheck}
        />
        <Route exact={true} path="/:id" component={BoardDetail} />
      </Switch>
      <Route path="/" component={BoardList} />
    </div>
  );
}

export default MainPage;

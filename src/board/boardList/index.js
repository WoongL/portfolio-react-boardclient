import "./index.css";
import { Button } from "antd";

function BoardList() {
  const boardListData = [
    {
      index: "1",
      title: "안녕하세요",
      writename: "김철수",
    },
    { index: "2", title: "테스트입니다", writename: "홍길동" },
    { index: "3", title: "임시 글 입니다", writename: "영희" },
    { index: "4", title: "임시 글 입니다", writename: "영희" },
    { index: "5", title: "임시 글 입니다", writename: "영희" },
    { index: "6", title: "임시 글 입니다", writename: "영희" },
    { index: "7", title: "임시 글 입", writename: "영희" },
    { index: "8", title: "임시 글 입니다", writename: "영희" },
    { index: "9", title: "임시 글 입다", writename: "영희" },
    { index: "10", title: "임시 글 입니다", writename: "영희" },
    { index: "11", title: "임시 글니다", writename: "영희" },
    { index: "12", title: "임시 글 입니다", writename: "영희" },
    { index: "13", title: "임시 글니다", writename: "영희" },
    { index: "15", title: "임시 글 입니다", writename: "영희" },
    { index: "16", title: "임시 글 입니다", writename: "영희" },
    { index: "17", title: "임시 니다", writename: "영희" },
    { index: "18", title: "임시 글 입니다", writename: "영희" },
    { index: "19", title: "임시 글 입니다", writename: "영희" },
    { index: "20", title: "임시니다", writename: "영희" },
    { index: "21", title: "임시 글 입니다", writename: "영희" },
    { index: "22", title: "임시 글 입니다", writename: "영희" },
    { index: "23", title: "임시 글 입니다", writename: "영희" },
    { index: "24", title: "임시 글 입니다", writename: "영희" },
  ];
  var maxViewIndex = 10;
  var curViewPage = 1;
  var maxViewPage = parseInt(boardListData.length / maxViewIndex + 1);

  const viewpageset = () => {
    const result = [];
    for (var i = 1; i <= maxViewPage; i++) {
      result.push(<Button key={i}>{i}</Button>);
    }
    return result;
  };

  return (
    <div>
      <h1 id="board-title">게시판 이름</h1>

      <table id="table">
        <thead>
          <tr>
            <th id="table-id">글 번호</th>
            <th id="table-title">글 제목</th>
            <th id="table-writename">작성자</th>
          </tr>
        </thead>
        <tbody>
          {boardListData.map(function (boardData, index) {
            if (index >= maxViewIndex) return;
            return (
              <tr key={index}>
                <td>{boardData.index}</td>
                <td>{boardData.title}</td>
                <td>{boardData.writename}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
      {}
      {viewpageset()}
    </div>
  );
}
export default BoardList;

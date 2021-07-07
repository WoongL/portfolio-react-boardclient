import { Button } from "antd";
import axios from "axios";
import { API_URI } from "../config/constants";
import "./index.css";

function HeaderMenuPage() {
  const onSubmit = () => {
    axios
      .post(`${API_URI}/board`, {
        title: "테스트글입니다",
        content: "테스트글의 내용입니다",
        writer: "테스터",
        pw: "1234",
      })
      .then((result) => {})
      .catch((error) => {});
  };

  return (
    <div id="header">
      <br />
      {/* <Button onClick={onSubmit}>테스트 글 생성하기</Button> */}
    </div>
  );
}

export default HeaderMenuPage;

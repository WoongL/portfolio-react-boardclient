import "./index.css";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { API_URI } from "../../config/constants";

function BoardWrite({ history }) {
  var isSubmitflag = false;
  const onSubmit = (value) => {
    const { writer, pw, title, content } = value;
    if (!writer) {
      message.error("작성자를 입력해주세요.");
      return;
    } else if (!pw) {
      message.error("비밀번호를 입력해주세요.");
      return;
    } else if (!title) {
      message.error("제목을 입력해주세요.");
      return;
    } else if (!content) {
      message.error("내용을 입력해주세요.");
      return;
    } else if (isSubmitflag) {
      message.warning("글 작성중입니다.");
      return;
    }
    isSubmitflag = true;
    axios
      .post(`${API_URI}/board`, { writer, pw, title, content })
      .then((result) => {
        message.success("작성완료");
        history.push(`/${result.data.id}`);
      })
      .catch((error) => {
        console.log(error);
        message.error("작성실패");
        isSubmitflag = false;
      });
  };
  return (
    <div id="boardwrite">
      <Form onFinish={onSubmit}>
        <div id="boardwrite-header">
          <Form.Item label="작성자 :" name="writer">
            <Input />
          </Form.Item>
          <Form.Item label="비밀번호 :" name="pw">
            <Input.Password />
          </Form.Item>
        </div>
        <div id="boardwrite-body">
          <Form.Item label="제목 :" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="본문 :" name="content">
            <Input.TextArea id="boardwrite-content" />
          </Form.Item>
        </div>
        <div id="boardwrite-button">
          <Button id="boardwrite-submit" size="large" htmlType="submit">
            작성완료
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default BoardWrite;

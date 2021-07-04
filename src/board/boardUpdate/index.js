import "./index.css";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { API_URI } from "../../config/constants";
import { useState, useEffect } from "react";

function BoardUpdate(props) {
  var submitflag = false;
  var id = props.id;
  var [boarddata, setBoarddata] = useState(null);
  const history = props.history;
  const onSubmit = (value) => {
    const { writer, pw, title, content } = value;
    if (!writer) {
      message.error(writer);
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
    } else if (submitflag) {
      message.warning("글 수정중입니다.");
      return;
    }
    submitflag = true;
    axios
      .put(`${API_URI}/board/${id}`, { writer, pw, title, content })
      .then((result) => {
        message.success("글 수정완료");
        history.push(`/${result.data.id}`);
      })
      .catch((error) => {
        console.log(error);
        message.error("수정실패");
        submitflag = false;
      });
  };

  const getBoardDetail = () => {
    axios
      .get(`${API_URI}/board/${id}`)
      .then((result) => {
        setBoarddata(result.data.board);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    getBoardDetail();
  }, []);
  if (!boarddata) return <div></div>;
  var defaultValue = {
    writer: boarddata.writer,
    title: boarddata.title,
    content: boarddata.content,
  };
  return (
    <div id="boardupdate">
      <Form onFinish={onSubmit} initialValues={defaultValue}>
        <div id="boardupdate-header">
          <Form.Item label="작성자 :" name="writer">
            <Input />
          </Form.Item>
          <Form.Item label="비밀번호 :" name="pw">
            <Input.Password />
          </Form.Item>
        </div>
        <div id="boardupdate-body">
          <Form.Item label="제목 :" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="본문 :" name="content">
            <Input.TextArea id="boardupdate-content" />
          </Form.Item>
        </div>
        <div id="boardupdate-button">
          <Button id="boardupdate-submit" size="large" htmlType="submit">
            작성완료
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default BoardUpdate;

import "./index.css";
import { Form, Input, Button, message } from "antd";

function boardPasswordCheck({ location }) {
  const isUpdate = location.pathname.includes("update");

  var submitflag = false;
  const onSubmit = (value) => {
    message.info(isUpdate ? "수정" : "삭제");
  };
  return (
    <div id="boardpwcheck">
      <Form onFinish={onSubmit}>
        <h2>
          {isUpdate
            ? "수정하시려면 비밀번호를 입력해주세요."
            : "글을 삭제하시려면 비밀번호를 입력해주세요."}
        </h2>
        <Form.Item label="비밀번호 입력 :" name="pw">
          <Input.Password />
        </Form.Item>
        <Button id="boardpwcheck-ok" htmlType="submit">
          확인
        </Button>
        <Button id="boardpwcheck-cancel">취소</Button>
      </Form>
    </div>
  );
}

export default boardPasswordCheck;

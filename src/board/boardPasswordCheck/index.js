import "./index.css";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { API_URI } from "../../config/constants";
import React from "react";
import BoardUpdate from "../boardUpdate";

function BoardPasswordCheck({ location, history }) {
  const isUpdate = location.pathname.includes("update");
  const id = location.pathname.split("/")[1];
  const [isUpdateflag, setUpdateflag] = React.useState(false);

  var isDeleteflag = false;
  var isSubmitflag = false;

  const onSubmit = (value) => {
    const pw = value.pw;
    // submitflag = true;
    if (!pw) {
      message.error("비밀번호를 입력해주세요.");
      return;
    } else if (isSubmitflag) {
      message.warning("비밀번호를 확인중 입니다.");
      return;
    }
    // submitflag = true;

    axios
      .get(`${API_URI}/board/${id}?pw=${pw}`)
      .then((result) => {
        if (result.data) {
          if (isUpdate) {
            //수정창으로
            setUpdateflag(true);
          } else {
            deleteBoard();
          }
        } else {
          message.error("비밀번호가 틀렸습니다");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteBoard = () => {
    if (isDeleteflag) return;
    isDeleteflag = true;
    axios
      .delete(`${API_URI}/board/${id}`)
      .then((result) => {
        message.info("글을 삭제하였습니다");
        history.push("/");
      })
      .catch((error) => {});
  };

  if (isUpdateflag) {
    return <BoardUpdate id={id} history={history} />;
  }

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
        <Button
          className="boardpwcheck-button"
          id="boardpwcheck-ok"
          htmlType="submit"
        >
          확인
        </Button>
        <Button
          className="boardpwcheck-button"
          id="boardpwcheck-cancel"
          onClick={() => {
            history.push(`/${id}`);
          }}
        >
          취소
        </Button>
      </Form>
    </div>
  );
}

export default BoardPasswordCheck;

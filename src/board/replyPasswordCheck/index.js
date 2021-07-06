import "./index.css";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { API_URI } from "../../config/constants";
import { useState } from "react";
import getQueryString from "../../main/getQueryString";

function ReplyPasswordCheck({ location, history }) {
  const isUpdate = location.pathname.includes("update");
  const locationpatharr = location.pathname.split("/");
  const id = locationpatharr[1];
  const replyid = locationpatharr[2];

  var isSubmitflag = false;

  const [isupdateflag, setUpdateFlag] = useState(false);
  const [beforereplydata, setbeforedata] = useState({});

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
    isSubmitflag = true;

    axios
      .get(`${API_URI}/replypwcheck/${replyid}?pw=${pw}`)
      .then((result) => {
        if (result.data) {
          if (isUpdate) {
            //수정창으로
            axios
              .get(`${API_URI}/replypwcheck/${replyid}`)
              .then((result) => {
                setbeforedata(result.data);
                setUpdateFlag(true);
              })
              .catch((error) => {});
          } else {
            axios
              .delete(`${API_URI}/reply/${replyid}`)
              .then((result) => {
                message.info("삭제 성공");
                history.push(
                  `/${id}${getQueryString(
                    ["search", "page", "pagescale"],
                    location,
                    true
                  )}`
                );
              })
              .catch((error) => {
                console.log(error);
                isSubmitflag = false;
              });
          }
        } else {
          message.error("비밀번호가 틀렸습니다");
        }
      })
      .catch((error) => {
        console.log(error);
        isSubmitflag = false;
      });
  };

  const onUpdateSubmit = (value) => {
    const { writer, pw, content } = value;
    if (!writer) {
      message.error(writer);
      message.error("댓글의 작성자를 입력해주세요.");
      return;
    } else if (!pw) {
      message.error("비밀번호를 입력해주세요.");
      return;
    } else if (!content) {
      message.error("내용을 입력해주세요.");
      return;
    } else if (isSubmitflag) {
      message.warning("댓글 수정중입니다.");
      return;
    }
    isSubmitflag = true;
    axios
      .put(`${API_URI}/reply/${replyid}`, { writer, pw, content })
      .then((result) => {
        message.success("댓글 수정완료");
        history.push(
          `/${id}${getQueryString(
            ["search", "page", "pagescale"],
            location,
            true
          )}`
        );
      })
      .catch((error) => {
        console.log(error);
        message.error("수정실패");
        isSubmitflag = false;
      });
  };

  var defaultValue = {
    writer: beforereplydata.writer,
    content: beforereplydata.content,
  };
  //수정창에서 비밀번호 성공시
  if (isupdateflag) {
    return (
      <div className="replyupdate-box">
        <Form onFinish={onUpdateSubmit} initialValues={defaultValue}>
          <div className="replyupdate-header">
            <Form.Item
              label="작성자 :"
              name="writer"
              className="replyupdate-writer"
            >
              <Input />
            </Form.Item>
            <Form.Item label="비밀번호 :" name="pw" className="replyupdate-pw">
              <Input.Password />
            </Form.Item>
          </div>
          <div className="replyupdate-body">
            <Form.Item name="content" className="replyupdate-content">
              <Input.TextArea />
            </Form.Item>
            <Button
              boardreplylist="replyupdate-button"
              htmlType="submit"
              size="large"
            >
              작성하기
            </Button>
          </div>
        </Form>
      </div>
    );
  } else
    return (
      //비밀번호 입력 ui
      <div>
        <div id="replypwcheck">
          <Form onFinish={onSubmit}>
            <h2>
              {isUpdate
                ? "댓글을 수정하시려면 비밀번호를 입력해주세요."
                : "댓글을 삭제하시려면 비밀번호를 입력해주세요."}
            </h2>
            <Form.Item label="비밀번호 입력 :" name="pw">
              <Input.Password />
            </Form.Item>
            <Button
              className="replypwcheck-button"
              id="replypwcheck-ok"
              htmlType="submit"
            >
              확인
            </Button>
            <Button
              className="replypwcheck-button"
              id="replypwcheck-cancel"
              onClick={() => {
                history.push(
                  `/${id}${getQueryString(
                    ["search", "page", "pagescale"],
                    location,
                    true
                  )}`
                );
              }}
            >
              취소
            </Button>
          </Form>
        </div>
      </div>
    );
}

export default ReplyPasswordCheck;

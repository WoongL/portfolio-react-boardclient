import { useParams } from "react-router-dom";
import { Input, Form, Button, message } from "antd";
import "./index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URI } from "../../config/constants";
import dayjs from "dayjs";
import $ from "jquery";
import getQueryString from "../../main/getQueryString";

function BoardReply({ location, history }) {
  const { id } = useParams();

  const [replylist, setReplyList] = useState([]);

  var isSubmitflag = false;

  const [form] = Form.useForm();

  const getReplyList = () => {
    axios
      .get(`${API_URI}/reply/${id}`)
      .then((result) => {
        setReplyList(result.data.reply);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getReplyList();
  }, [location]);

  const onSubmit = (value) => {
    const { writer, pw, content } = value;
    if (!writer) {
      message.error("작성자를 입력해주세요.");
      return;
    } else if (!pw) {
      message.error("비밀번호를 입력해주세요.");
      return;
    } else if (!content) {
      message.error("내용을 입력해주세요.");
      return;
    } else if (isSubmitflag) {
      message.warning("댓글 작성중입니다.");
      return;
    }
    isSubmitflag = true;
    axios
      .post(`${API_URI}/reply/${id}`, { writer, pw, content })
      .then((result) => {
        message.success("댓글 작성완료");
        form.resetFields();
        getReplyList();
      })
      .catch((error) => {
        console.log(error);
        message.error("댓글 작성실패");
        isSubmitflag = false;
      });
  };
  $("html").scrollTop(0);
  return (
    <div id="boardreplylist">
      {replylist.map(function (reply, index) {
        return (
          <div className="boardreplylist-box" key={index}>
            <div className="boardreplylist-header">
              {/* <span>{`${index + 1}번째 댓글`}</span> */}
              <p>{`작성자 : ${reply.writer}`}</p>
              <p>{`작성일 : ${dayjs(reply.createdAt).format(
                "YYYY-MM-DD HH:mm:ss"
              )}`}</p>
            </div>
            <div className="boardreplylist-body">
              <p>{`${reply.content}`}</p>
              <div>
                <Button
                  className="boardreplylist-button"
                  onClick={() => {
                    history.push(
                      `/${id}/${reply.id}/update${getQueryString(
                        ["search", "page", "pagescale"],
                        location,
                        true
                      )}`
                    );
                  }}
                >
                  수정
                </Button>
                <Button
                  className="boardreplylist-button"
                  onClick={() => {
                    history.push(
                      `/${id}/${reply.id}/delete${getQueryString(
                        ["search", "page", "pagescale"],
                        location,
                        true
                      )}`
                    );
                  }}
                >
                  삭제
                </Button>
              </div>
            </div>
          </div>
        );
      })}

      <div className="boardreplylist-box">
        <Form onFinish={onSubmit} form={form}>
          <div className="boardreplylist-header">
            <Form.Item
              label="작성자 :"
              name="writer"
              className="boardreplylist-writer"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="비밀번호 :"
              name="pw"
              className="boardreplylist-pw"
            >
              <Input.Password />
            </Form.Item>
          </div>
          <div className="boardreplylist-body">
            <Form.Item name="content" className="boardreplylist-content">
              <Input.TextArea />
            </Form.Item>
            <Button
              boardreplylist="boardreplylist-button"
              htmlType="submit"
              size="large"
            >
              작성하기
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default BoardReply;

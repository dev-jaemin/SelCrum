import { useEffect, useState } from "react";
import PwChangePage from "../components/PwChangePage";
import axios from "axios";

function PwChangePageContainer(props) {
  const loginUrl = process.env.REACT_APP_API_URL + "/login";
  useEffect(() => {
    //로그인 되어있는지 확인하고, 안되어 있으면 회원정보 수정시키면 안됌.
    if (window.localStorage.getItem("userId")) {
      axios.get(loginUrl).then((res) => {
        if (res.data !== "success") {
          props.history.push("/project/doing");
        }
      });
    }
  }, []);

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const currentPasswordHandler = (e) => {
    e.preventDefault();
    setCurrentPassword(e.target.value);
  };

  const passwordHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const checkPasswordHandler = (e) => {
    e.preventDefault();
    setCheckPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // state에 저장한 값을 가져옵니다.

    if (password !== checkPassword) {
      window.alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    let body = {
      userId: window.localStorage.userId,
      currentPw: currentPassword,
      newPw: password,
    };

    axios
      .put(loginUrl, body)
      .then(() => {
        window.alert("비밀번호가 변경되었습니다.");
        props.history.push("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <PwChangePage
      currentPasswordHandler={currentPasswordHandler}
      passwordHandler={passwordHandler}
      checkPasswordHandler={checkPasswordHandler}
      submitHandler={submitHandler}
    />
  );
}

export default PwChangePageContainer;

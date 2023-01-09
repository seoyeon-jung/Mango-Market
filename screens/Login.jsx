import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { authService } from "../firebase";
import { emailRegex, pwRegex, SCREEN_WIDTH } from "../util";
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
} from "react-native";

export default function Login({
  navigation: { navigate, goBack, setOptions },
}) {
  const emailRef = useRef(null);
  const pwRef = useRef(null);

  const [email, setEmail] = useState("");
  const [pw, setPW] = useState("");

  // 유효성 검사
  const validInput = () => {
    // 공백인 경우
    if (!email) {
      alert("email을 입력해주세요.");
      emailRef.current.focus();
      return true;
    }
    if (!pw) {
      alert("password를 입력해주세요.");
      pwRef.current.focus();
      return true;
    }

    const correctEmail = email.match(emailRegex);
    const correctPW = pw.match(pwRegex);

    // 공백은 아니지만 유효성 검사에 걸리는 경우
    if (correctEmail === null) {
      alert("이메일 형식에 맞게 입력해 주세요.");
      emailRef.current.focus();
      return true;
    }
    if (correctPW === null) {
      alert("비밀번호는 8자리 이상 영문자, 숫자, 특수문자 조합이어야 합니다.");
      pwRef.current.focus();
      return true;
    }
  };

  // login
  const userLogin = () => {
    // 1. 유효성 검사
    if (validInput()) {
      return;
    }

    // 2. login
    signInWithEmailAndPassword(authService, email, pw)
      .then(() => {
        setEmail("");
        setPW("");
        navigate("Home");
      })
      .catch((error) => {
        console.log("error message: ", error.message);

        // 회원이 아니거나, 비밀번호가 틀린 경우
        if (err.message.includes("user-not-found")) {
          alert("일치하는 회원 정보가 없습니다! 회원가입을 진행해주세요.");
        }
        if (err.message.includes("wrong-password")) {
          alert("비밀번호가 틀렸습니다.");
        }
      });
  };

  // register
  const userRegister = () => {
    // 1. 유효성 검사
    if (validInput()) {
      return;
    }

    // 2. register
    createUserWithEmailAndPassword(authService, email, pw)
      .then(() => {
        setEmail("");
        setPW("");
        goBack();
      })
      .catch((error) => {
        console.log("error.message: ", error.message);

        // 이미 가입된 경우
        if (error.message.includes("already-in-use")) {
          alert("이미 가입한 회원입니다.");
        }
      });
  };

  useEffect(() => {
    setOptions({ headerRight: () => null });
  }, []);

  return (
    <SafeAreaView>
      <TextInput
        ref={emailRef}
        onChangeText={(text) => setEmail(text)}
        textContentType="emailAddress"
        placeholder="email을 입력하세요"
      />
      <TextInput
        ref={pwRef}
        onChangeText={(text) => setPW(text)}
        textContentType="password"
        returnKeyType="send"
        secureTextEntry={true}
        placeholder="비밀번호를 입력하세요"
      />
      <TouchableOpacity onPress={userLogin}>
        <Text>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={userRegister}>
        <Text>회원가입</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

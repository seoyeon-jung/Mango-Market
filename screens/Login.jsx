import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { authService } from "../firebase";
import { emailRegex, pwRegex, SCREEN_WIDTH } from "../util";
import { Text, Alert } from "react-native";
import styled from "@emotion/native";
import { APPLEMANGO_COLOR, MANGO_COLOR } from "../colors";
import { async } from "@firebase/util";
import * as Font from "expo-font";

export default function Login({
  navigation: { navigate, goBack, setOptions },
}) {
  const emailRef = useRef(null);
  const pwRef = useRef(null);

  const [email, setEmail] = useState("");
  const [pw, setPW] = useState("");
  // 폰트 사용을 위한 state
  const [isFontReady, setIsFontReady] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPWFocused, setIsPWFocused] = useState(false);

  // 유효성 검사
  const validInput = () => {
    // 공백인 경우
    if (!email) {
      Alert.alert("email을 입력해주세요.");
      emailRef.current.focus();
      return true;
    }
    if (!pw) {
      Alert.alert("password를 입력해주세요.");
      pwRef.current.focus();
      return true;
    }

    const correctEmail = email.match(emailRegex);
    const correctPW = pw.match(pwRegex);

    // 공백은 아니지만 유효성 검사에 걸리는 경우
    if (correctEmail === null) {
      Alert.alert("이메일 형식에 맞게 입력해 주세요.");
      emailRef.current.focus();
      return true;
    }
    if (correctPW === null) {
      Alert.alert(
        "비밀번호는 8자리 이상 영문자, 숫자, 특수문자 조합이어야 합니다."
      );
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
          Alert.alert(
            "일치하는 회원 정보가 없습니다! 회원가입을 진행해주세요."
          );
        }
        if (err.message.includes("wrong-password")) {
          Alert.alert("비밀번호가 틀렸습니다.");
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
          Alert.alert("이미 가입한 회원입니다.");
        }
      });
  };

  useEffect(() => {
    setOptions({ headerRight: () => null });
    fontLoad();
  }, []);

  // 폰트 비동기 처리
  const fontLoad = async () => {
    await Font.loadAsync({
      korail: require("../assets/fonts/Korail_Round_Gothic_Bold.ttf"),
    });
    setIsFontReady(true);
  };

  return (
    <LoginForm>
      {isFontReady && (
        <>
          <Header style={{ flexDirection: "row" }}>
            {/* <HeaderImg source={require("../assets/mango.png")} /> */}
            <HeaderText>망고 마켓</HeaderText>
          </Header>
          <InputContainer>
            <InputHeader style={{ flexDirection: "row" }}>
              {/* <InputImg source={require("../assets/mango.png")} /> */}
              <InputLabel isEmailFocused={isEmailFocused}>이메일</InputLabel>
            </InputHeader>
            <InputBox
              ref={emailRef}
              onChangeText={(text) => setEmail(text)}
              textContentType="emailAddress"
              onBlur={() => {
                setIsEmailFocused(false);
              }}
              onFocus={() => {
                setIsEmailFocused(true);
              }}
              isEmailFocused={isEmailFocused}
            />
          </InputContainer>
          <InputContainer>
            <InputHeader style={{ flexDirection: "row" }}>
              {/* <InputImg source={require("../assets/mango.png")} /> */}
              <InputLabel isPWFocused={isPWFocused}>비밀번호</InputLabel>
            </InputHeader>
            <InputBox
              ref={pwRef}
              onChangeText={(text) => setPW(text)}
              textContentType="password"
              returnKeyType="send"
              secureTextEntry={true}
              onBlur={() => {
                setIsPWFocused(false);
              }}
              onFocus={() => {
                setIsPWFocused(true);
              }}
              isPWFocused={isPWFocused}
            />
          </InputContainer>

          <ButtonGrop>
            <LoginBtn onPress={userLogin}>
              <LoginText>로그인</LoginText>
            </LoginBtn>
            <RegisterBtn onPress={userRegister}>
              <RegisterText>회원가입</RegisterText>
            </RegisterBtn>
          </ButtonGrop>
        </>
      )}
    </LoginForm>
  );
}

const LoginForm = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
  background-color: ${MANGO_COLOR};
`;

// 헤더 부분
const Header = styled.View`
  margin-bottom: 50px;
  align-items: center;
  justify-content: center;
  /* border-width: 1px; */
`;

const HeaderImg = styled.Image`
  width: 70px;
  height: 70px;
`;

const HeaderText = styled.Text`
  font-size: 50px;
  margin-bottom: 10px;
  color: white;
  font-family: korail;
`;

// 인풋

const InputContainer = styled.View`
  margin-bottom: 18px;
`;

const InputHeader = styled.View`
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 5px;
  margin-bottom: 10px;
`;

const InputLabel = styled.Text`
  font-family: korail;
  font-size: 13px;
  color: ${(props) => {
    if (props.isEmailFocused || props.isPWFocused) {
      return APPLEMANGO_COLOR;
    } else {
      return "white";
    }
  }};
`;

const InputBox = styled.TextInput`
  background-color: white;
  padding: 10px;
  width: ${SCREEN_WIDTH / 1.5 + "px"};
  height: 40px;
  border-radius: 10px;
  /* border: 3px solid transparent; */
  border-width: 3px;
  border-color: ${(props) => {
    if (props.isEmailFocused || props.isPWFocused) {
      return APPLEMANGO_COLOR;
    } else {
      return MANGO_COLOR;
    }
  }}; ;
`;

// const InputImg = styled.Image`
//   width: 20px;
//   height: 20px;
// `;

// 버튼

const ButtonGrop = styled.View`
  width: ${SCREEN_WIDTH / 1.5 + "px"};
  margin-top: 30px;
  flex-direction: row;
  justify-content: space-between;
  /* border-width: 1px; */
`;
const LoginBtn = styled.TouchableOpacity`
  width: ${SCREEN_WIDTH / 3.5 + "px"};
  border-radius: 20px;
  padding: 14px;
  justify-content: center;
  align-items: center;
  /* border: 2px solid white; */
  margin-bottom: 14px;
  background-color: ${APPLEMANGO_COLOR};
`;

const RegisterBtn = styled.TouchableOpacity`
  width: ${SCREEN_WIDTH / 3.5 + "px"};
  border-radius: 20px;
  padding: 14px;
  justify-content: center;
  align-items: center;
  /* border: 2px solid white; */
  margin-bottom: 14px;
  background-color: white;
`;

const LoginText = styled.Text`
  font-size: 15px;
  color: white;
  font-family: korail;
`;

const RegisterText = styled.Text`
  font-size: 15px;
  color: ${APPLEMANGO_COLOR};
  font-family: korail;
`;

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  Button,
} from "react-native";
import styled from "@emotion/native";
import { useEffect, useRef, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { dbService } from "../firebase";
import { authService } from "../firebase";
import * as ImagePicker from "expo-image-picker";
import * as Font from "expo-font";
import { APPLEMANGO_COLOR, MANGO_COLOR } from "../colors";
import { SCREEN_WIDTH } from "../util";

const brandColor = "#ffc800";

const Write = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState(
    "data:image/png;base64,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"
  );

  // 스타일링 state
  const [isFontReady, setIsFontReady] = useState(false);
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isPriceFocused, setIsPriceFocused] = useState(false);
  const [isContentFocused, setIsContentFocused] = useState(false);

  useEffect(async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permisson denied!");
      }
    }
    fontLoad();
  }, []);

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const titleRef = useRef(null);
  const priceRef = useRef(null);
  const contentRef = useRef(null);

  const currentId = authService.currentUser.email;
  let today = new Date();

  const newBoard = {
    userId: currentId,
    title,
    content,
    price,
    date: today.toLocaleDateString(),
    isDone: false,
    isEdit: false,
    image,
  };

  const validateInput = () => {
    if (!title) {
      Alert.alert("상품 이름을 입력해주세요.");
      titleRef.current.focus();
      return true;
    }
    if (!price) {
      Alert.alert("상품 가격을 입력해주세요.");
      priceRef.current.focus();
      return true;
    }
    if (!content) {
      Alert.alert("상품 설명을 입력해주세요.");
      contentRef.current.focus();
      return true;
    }
  };

  const addBoard = async () => {
    if (validateInput()) {
      return;
    } else {
      await addDoc(collection(dbService, "posts"), newBoard);
      setContent("");
      setImage("");
      setTitle("");
      setPrice("");
      Alert.alert("글쓰기 완료");
    }
  };

  // 폰트 비동기 처리

  const fontLoad = async () => {
    await Font.loadAsync({
      korail: require("../assets/fonts/Korail_Round_Gothic_Bold.ttf"),
    });
    setIsFontReady(true);
  };

  return (
    <DetailContainer>
      {isFontReady && (
        <>
          <ImgContainer>
            <Button title="사진 추가" onPress={PickImage} />
            {image && <Image source={{ uri: image }} />}

            <InputBox
              value={Image}
              onChangeText={setImage}
              placeholder="상품 사진을 등록해주세요."
            />
          </ImgContainer>
          <InfoBox>
            <View style={{ marginTop: 20 }}>
              <InputBox
                value={title}
                onChangeText={(text) => setTitle(text)}
                placeholder="상품 이름을 입력해주세요."
                ref={titleRef}
                onBlur={() => {
                  setIsTitleFocused(false);
                }}
                onFocus={() => {
                  setIsTitleFocused(true);
                }}
                isTitleFocused={isTitleFocused}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <InputBox
                keyboardType="number-pad"
                value={price}
                onChangeText={(text) => setPrice(text)}
                placeholder="상품 가격을 입력해주세요."
                ref={priceRef}
                onBlur={() => {
                  setIsPriceFocused(false);
                }}
                onFocus={() => {
                  setIsPriceFocused(true);
                }}
                isPriceFocused={isPriceFocused}
              />
            </View>
          </InfoBox>
          <ContentBox isContentFocused={isContentFocused}>
            <InputContent
              style={{ textAlignVertical: "top" }}
              multiline={true}
              onChangeText={(text) => setContent(text)}
              value={content}
              placeholder="상품 설명을 입력해주세요."
              ref={contentRef}
              onBlur={() => {
                setIsContentFocused(false);
              }}
              onFocus={() => {
                setIsContentFocused(true);
              }}
            />
          </ContentBox>
          <BtnContainer>
            <TouchableOpacity
              onPress={() => {
                addBoard();
              }}
              style={{ margin: 10 }}
            >
              <ButtonView>
                <BtnText> 글쓰기 </BtnText>
              </ButtonView>
            </TouchableOpacity>
          </BtnContainer>
        </>
      )}
    </DetailContainer>
  );
};

export default Write;

const DetailContainer = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

const MarginBox = styled.View`
  margin-top: 10px;
`;

const ImgContainer = styled.View`
  height: 30%;
  width: 100%;
  justify-items: center;
  align-self: center;
`;
const InfoBox = styled.View`
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px;
  /* border-width: 1px; */
`;

const InputBox = styled.TextInput`
  height: 40px;
  width: 100%;
  border-bottom-width: 3px;
  border-color: ${(props) => {
    if (props.isPriceFocused || props.isTitleFocused) {
      return MANGO_COLOR;
    } else {
      return "#d1d1d1";
    }
  }};
  padding: 10px;
`;

const ContentBox = styled.View`
  min-height: 250px;
  width: 93%;
  border: 1px solid #d1d1d15f;
  border-radius: 5px;
  padding: 15px;
  margin: 15px;
  border-color: ${(props) => {
    if (props.isContentFocused) {
      return MANGO_COLOR;
    } else {
      return "#d1d1d1";
    }
  }};
`;

const InputContent = styled.TextInput`
  height: 150px;
  width: 100%;
  padding-left: 0;
  padding-top: 0;
  padding: 10px;
`;

const BtnContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const ButtonView = styled.View`
  background-color: ${MANGO_COLOR};
  border-radius: 10px;
  margin-right: 10px;
  padding: 13px;
  width: ${SCREEN_WIDTH / 5 + "px"};
`;

const BtnText = styled.Text`
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: white;
`;

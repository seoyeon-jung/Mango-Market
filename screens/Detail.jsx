import { View, Text, Image } from "react-native";
import styled from "@emotion/native";
import { useEffect, useState } from "react";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { dbService } from "../firebase";
import { Alert } from "react-native";
import { authService } from "../firebase";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import CustomBtn from "../components/CustomBtn";
import * as Font from "expo-font";
import { MANGO_COLOR } from "../colors";
import EditDetail from "../components/EditDetail";

const brandColor = "#ffc800";

const Detail = (props) => {
  const [detailItem, setDetailItem] = useState({});
  const [isFontReady, setIsFontReady] = useState(false);

  const { navigate } = useNavigation();
  const currentId = authService.currentUser.email;
  const itemId = props.route.params.postId;
  const userId = props.route.params.userId;

  useFocusEffect(
    useCallback(() => {
      if (!authService.currentUser) {
        // 로그인 X
        reset({
          index: 1,
          routes: [
            {
              name: "Tabs",
              params: {
                screen: "Home",
              },
            },
            {
              name: "Stacks",
              params: {
                screen: "Login",
              },
            },
          ],
        });
        return;
      }
    }, [])
  );

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(dbService, "posts", itemId);
      const docSnap = await getDoc(docRef);

      const newDetailItem = {
        id: docSnap.id,
        ...docSnap.data(),
      };

      setDetailItem(newDetailItem);
    };
    fontLoad();
    getData();
  }, []);

  const setEdit = async (detailItem) => {
    setDetailItem({ ...detailItem, isEdit: !detailItem.isEdit });
  };

  const deleteBoard = () => {
    Alert.alert("Todo 삭제", "정말 삭제하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
        onPress: () => console.log("취소 클릭!"),
      },
      {
        text: "삭제",
        style: "destructive",
        onPress: async () => {
          await deleteDoc(doc(dbService, "posts", itemId));
          navigate("Home");
        },
      },
    ]);
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
      {isFontReady &&
        (detailItem.isEdit ? (
          <EditDetail
            detailItem={detailItem}
            currentId={currentId}
            setEdit={setEdit}
            itemId={itemId}
            setDetailItem={setDetailItem}
          />
        ) : (
          <>
            <ImageContainer>
              <Image
                style={{ flex: 1 }}
                source={{
                  uri: String(detailItem.img),
                }}
              />
            </ImageContainer>

            <TitleBox>
              <Text> {detailItem.title} </Text>
            </TitleBox>

            <View style={{ marginTop: 10 }}></View>
            <View style={{ marginTop: 10 }}>
              <TitleBox>
                <TitelText> {detailItem.title} </TitelText>
              </TitleBox>
            </View>

            <View style={{ marginTop: 10 }}>
              <LabelText> 가격 </LabelText>

              <TitleBox>
                <Text> {detailItem.price} 원 </Text>
              </TitleBox>
            </View>

            <Text style={{ marginTop: 10 }}>
              {" "}
              글 작성 날짜 : {detailItem.date}{" "}
            </Text>
            <View style={{ marginTop: 10 }}>
              <LabelText> 내용 </LabelText>

              <ContentBox>
                <Text> {detailItem.content} </Text>
              </ContentBox>
            </View>
            <Text> 해당 글 작성자 : {detailItem.userId} </Text>
            {userId === currentId ? (
              <BtnContainer>
                <CustomBtn
                  btnText="수정"
                  detailItem={detailItem}
                  handler={setEdit}
                />
                <CustomBtn
                  btnText="삭제"
                  detailItem={detailItem}
                  handler={deleteBoard}
                />
              </BtnContainer>
            ) : (
              <BtnContainer></BtnContainer>
            )}
          </>
        ))}
    </DetailContainer>
  );
};

const DetailContainer = styled.View`
  flex: 1;
  /* padding: 5%; */
`;

const ImageContainer = styled.View`
  /* flex: 1; */
  height: 30%;
  width: 100%;

  border: 3px solid ${brandColor};

  justify-items: center;
  align-self: center;
`;

// 디테일 페이지 스타일

const TitleBox = styled.Text`
  border: 3px solid ${MANGO_COLOR};
  padding: 10px;
  justify-content: flex-start;
`;

const LabelText = styled.Text`
  font-family: korail;
  font-size: 24px;
  font-weight: 700;
`;
const TitelText = styled.Text`
  font-family: korail;
  font-size: 24px;
  font-weight: 700;
`;

const PriceText = styled.Text`
  font-size: 32px;
  font-weight: 800;
  font-family: korail;
`;

const InfoText = styled.Text`
  font-family: korail;
  font-size: 18px;
  font-weight: 700;
  color: #333;
`;
const DateText = styled.Text`
  font-family: korail;
  font-size: 16px;
  font-weight: 600;
  color: #d1d1d1;
`;

// 수정 스타일

const InputTitle = styled.TextInput`
  height: 40px;
  width: 100%;

  border: 3px solid ${brandColor};
  padding: 10px;
`;

const ContentBox = styled.Text`
  height: 150px;
  width: 100%;

  border: 3px solid ${brandColor};
  padding: 10px;
`;

const InputContent = styled.TextInput`
  height: 150px;
  width: 100%;
  padding-left: 0;
  padding-top: 0;

  border: 3px solid ${brandColor};
  padding: 10px;
`;

const BtnContainer = styled.View`
  flex-direction: row;
  align-self: flex-end;
`;

export default Detail;

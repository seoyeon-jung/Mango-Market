import { View, Text, ScrollView, Image } from "react-native";
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
import { APPLEMANGO_COLOR, GRAY_COLOR, MANGO_COLOR } from "../colors";
import EditDetail from "../components/EditDetail";
import Comments from "../components/Comments";

const brandColor = "#ffc800";

const Detail = (props) => {
  const [detailItem, setDetailItem] = useState(null);
  const [isFontReady, setIsFontReady] = useState(false);

  const { navigate } = useNavigation();
  const currentId = authService.currentUser.email;
  const itemId = props.route.params.postId;
  const userId = props.route.params.userId;
  // const userName = detailItem.userId.splite("@")[0];

  console.log("userID", detailItem);
  console.log("currentUser", typeof authService.currentUser.email);

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

  // 데이터 불러오기
  const getData = async () => {
    const docRef = doc(dbService, "posts", itemId);
    const docSnap = await getDoc(docRef);

    const newDetailItem = {
      id: docSnap.id,
      ...docSnap.data(),
    };
    // console.log(newDetailItem);
    setDetailItem(newDetailItem);
  };

  useEffect(() => {
    fontLoad();
    getData();
  }, []);

  const setEdit = async (detailItem) => {
    setDetailItem({ ...detailItem, isEdit: !detailItem.isEdit });
  };

  const deleteBoard = () => {
    Alert.alert("작성 글 삭제", "정말 삭제하시겠습니까?", [
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

  // 파이어베이스 -> 날짜 스트링 처리
  const dateString = (date) => {
    if (date) {
      return (
        date.toDate().toLocaleDateString() +
        " " +
        date.toDate().toLocaleTimeString()
      );
    }
  };

  const userIdSplit = (userId) => {
    if (userId) {
      return userId.split("@")[0];
    }
  };

  return (
    <DetailContainer>
      {isFontReady &&
        (detailItem?.isEdit ? (
          <EditDetail
            detailItem={detailItem}
            currentId={currentId}
            setEdit={setEdit}
            itemId={itemId}
            setDetailItem={setDetailItem}
            userIdSplit={userIdSplit}
            dateString={dateString}
            getData={getData}
          />
        ) : (
          <>
            <ImageContainer style={{ padding: 10 }}>
              <Image
                style={{ flex: 1 }}
                source={{
                  uri: String(detailItem?.img),
                }}
              />
            </ImageContainer>
            <MarginBox />
            <ScrollView>
              <InfoBox>
                <TitleBox>
                  <TitelText> {detailItem?.title} </TitelText>
                </TitleBox>
                <MarginBox />
                <TitleBox>
                  <PriceText> {detailItem?.price} 원 </PriceText>
                </TitleBox>
                <GroupBox>
                  <DateText>{dateString(detailItem?.date)}</DateText>
                  <UserText>{userIdSplit(detailItem?.userId)} </UserText>
                </GroupBox>
                <MarginBox />
              </InfoBox>
              <ContentBox>
                <ContentText> {detailItem?.content} </ContentText>
              </ContentBox>

              {userId === currentId ? (
                <BtnContainer>
                  <CustomBtn
                    btnText="수정"
                    detailItem={detailItem}
                    handler={setEdit}
                    color={MANGO_COLOR}
                  />
                  <CustomBtn
                    btnText="삭제"
                    detailItem={detailItem}
                    handler={deleteBoard}
                    color={APPLEMANGO_COLOR}
                  />
                </BtnContainer>
              ) : (
                <BtnContainer></BtnContainer>
              )}
            </ScrollView>
          </>
        ))}
    </DetailContainer>
  );
};

const MarginBox = styled.View`
  margin-top: 10px;
`;

const DetailContainer = styled.View`
  flex: 1;
  /* padding: 5%; */
`;

const ImageContainer = styled.View`
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

const TitleBox = styled.Text`
  justify-content: flex-start;
  margin-bottom: 15px;
  margin-right: 5px;
`;
const TitelText = styled.Text`
  font-family: korail;
  font-size: 40px;
  font-weight: 700;
`;

const PriceText = styled.Text`
  font-family: korail;
  font-size: 32px;
  font-weight: 800;
`;

const GroupBox = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
`;
const DateText = styled.Text`
  font-family: korail;
  font-size: 16px;
  font-weight: 600;
  margin-left: 7px;
  color: #d1d1d1;
`;

const UserText = styled.Text`
  font-family: korail;
  font-size: 16px;
  font-weight: 600;
  color: #d1d1d1;
`;

const ContentBox = styled.View`
  min-height: 250px;
  width: 93%;
  border: 1px solid #d1d1d15f;
  border-radius: 5px;
  padding: 15px;
  margin: 15px;
`;
const ContentText = styled.Text`
  font-family: korail;
  font-size: 18px;
  font-weight: 700;
  color: #333;
`;

const BtnContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export default Detail;

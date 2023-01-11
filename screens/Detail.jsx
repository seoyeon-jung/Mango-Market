import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styled from "@emotion/native";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { dbService } from "../firebase";
import { Alert } from "react-native";
import { authService } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import CustomBtn from "../components/CustomBtn";

const brandColor = "#ffc800";

const Detail = (props) => {
  const [detailItem, setDetailItem] = useState({});
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const detailItemId = props.route.params.postId;
  const currentId = authService.currentUser.email;
  const { navigate } = useNavigation();

  const newBoard = {
    userId: currentId,
    title,
    content,
    price,
    date: "today",
    isDone: false,
    isEdit: false,
    img,
  };

  console.log("newBoard",newBoard)
  
  useEffect(() => {
    const getData = async () => {
      const docRef = doc(dbService, "posts", detailItemId);
      const docSnap = await getDoc(docRef);

      const newDetailItem = {
        id: docSnap.id,
        ...docSnap.data(),
      };

      setDetailItem(newDetailItem);
    };
    getData();
  }, []);

  const updateBoard = async (detailItemId) => {
    if (title === "" || content === "" || price === "") {
      Alert.alert("제목, 가격, 내용 모두 입력하고 수정해주세요.");
      return;
    }

    await updateDoc(doc(dbService, "posts", detailItemId), {
      ...newBoard,
    });
    setDetailItem(newBoard);
    console.log("newBoard",detailItem)

    setTitle("");
    setContent("");
    setPrice("");
  };

  const deleteBoard = (detailItemId) => {
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
          await deleteDoc(doc(dbService, "posts", detailItemId));
          navigate("Home")
          },
      },
    ]);
  };

  const setEdit = async (detailItem) => {
    setDetailItem({ ...detailItem, isEdit: !detailItem.isEdit });
  };


  return (
    <DetailContainer>
      {detailItem.isEdit === false ? (
        <>
          <ImageContainer>
            <Image
              style={{ flex: 1 }}
              source={{
                uri: String(detailItem.img),
              }}
            />
          </ImageContainer>
          <Text> 해당 글 작성자 : {detailItem.userId} </Text>
        </>
      ) : (
        <View style={{ marginTop: 10 }}>
          <Text> 이미지 </Text>
          {detailItem.isEdit === true ? (
            <InputTitle
              value={img}
              onChangeText={setImg}
              placeholder="변경할 이미지를 입력하세요"
            />
          ) : (
            <TitleBox>
              <Text> {detailItem.title} </Text>
            </TitleBox>
          )}
        </View>
      )}
      <View style={{ marginTop: 10 }}></View>
      <View style={{ marginTop: 10 }}>
        <Text> 제목 </Text>
        {detailItem.isEdit === true ? (
          <InputTitle
            value={title}
            onChangeText={setTitle}
            placeholder="변경할 제목을 입력하세요"
          />
        ) : (
          <TitleBox>
            <Text> {detailItem.title} </Text>
          </TitleBox>
        )}
      </View>
      <View style={{ marginTop: 10 }}>
        <Text> 가격 </Text>
        {detailItem.isEdit === true ? (
          <InputTitle
            keyboardType="number-pad"
            value={price}
            onChangeText={setPrice}
            placeholder="변경할 가격을 입력하세요"
          />
        ) : (
          <TitleBox>
            <Text> {detailItem.price} 원 </Text>
          </TitleBox>
        )}
      </View>

      <Text style={{ marginTop: 10 }}> 글 작성 날짜 : {detailItem.date} </Text>

      <View style={{ marginTop: 10 }}>
        <Text> 내용 </Text>
        {detailItem.isEdit === true ? (
          <InputContent
            style={{ textAlignVertical: "top" }}
            multiline={true}
            onChangeText={setContent}
            value={content}
            placeholder="변경할 내용을 입력하세요"
          />
        ) : (
          <ContentBox>
            <Text> {detailItem.content} </Text>
          </ContentBox>
        )}
      </View>
      <BtnContainer>
        {detailItem.isEdit === true ? (
          <>
            <CustomBtn
              btnText="완료"
              detailItem={detailItem}
              handler={updateBoard}
            />
            <CustomBtn
              btnText="취소"
              detailItem={detailItem}
              handler={setEdit}
            />
          </>
        ) : (
          <>
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
          </>
        )}
      </BtnContainer>
    </DetailContainer>
  );
};

const DetailContainer = styled.View`
  flex: 1;
  padding: 5%;
`;

const ImageContainer = styled.View`
  /* flex: 1; */
  height: 30%;
  width: 100%;

  border: 3px solid ${brandColor};

  justify-items: center;
  align-self: center;
`;

const TitleBox = styled.Text`
  height: 40px;
  width: 100%;

  border: 3px solid ${brandColor};
  padding: 10px;
`;

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

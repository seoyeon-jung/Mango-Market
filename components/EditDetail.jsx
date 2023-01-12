import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import styled from "@emotion/native";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { dbService } from "../firebase";
import { Alert } from "react-native";
import { authService, storage } from "../firebase";
import * as ImagePicker from "expo-image-picker";
import { APPLEMANGO_COLOR, GRAY_COLOR, MANGO_COLOR } from "../colors";
import { useNavigation } from "@react-navigation/native";

import CustomBtn from "../components/CustomBtn";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const EditDetail = ({
  detailItem,
  currentId,
  setEdit,
  itemId,
  setDetailItem,
  userIdSplit,
  dateString,
  getData,
}) => {
  const [title, setTitle] = useState(detailItem.title);
  const [content, setContent] = useState(detailItem.content);
  const [price, setPrice] = useState(detailItem.price);
  const [image, setImage] = useState(null);
  const { navigate } = useNavigation();

  // 스타일링 state
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isPriceFocused, setIsPriceFocused] = useState(false);
  const [isContentFocused, setIsContentFocused] = useState(false);

  const uploadImage = async () => {
    const blobImage = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("네트워크 요청 실패"));
      };
      xhr.responseType = "blob";
      xhr.open("get", image, true);
      xhr.send(null);
    });
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: "image/jpeg",
    };

    const storageRef = ref(storage, "Categories/" + Date.now());
    const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;

          case "storage/unknown":
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage("null");
          const newBoard = createNewBoard(downloadURL);
          addBoard(newBoard);
        });
      }
    );
  };

  const createNewBoard = (img) => {
    return {
      userId: currentId,
      title,
      content,
      price,
      date: new Date(),
      isDone: false,
      isEdit: false,
      img,
    };
  };

  const addBoard = async (newBoard) => {
    await updateDoc(doc(dbService, "posts", detailItem.id), {
      ...newBoard,
    });
    setContent("");
    setPrice("");
    setTitle("");
    Alert.alert("수정 완료");
    navigate("Home");
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <>
      {image && (
        <ImgContainer
          source={{
            uri: image,
          }}
        />
      )}
      <Button title="사진 추가" onPress={pickImage} />
      <InfoBox>
        <TitleBox>
          <InputBox
            value={title}
            onChangeText={setTitle}
            placeholder="변경할 제목을 입력하세요"
            onBlur={() => {
              setIsTitleFocused(false);
            }}
            onFocus={() => {
              setIsTitleFocused(true);
            }}
            isTitleFocused={isTitleFocused}
          />
        </TitleBox>
        <MarginBox />
        <TitleBox>
          <InputBox
            keyboardType="number-pad"
            value={price}
            onChangeText={setPrice}
            placeholder="변경할 가격을 입력하세요"
            onBlur={() => {
              setIsPriceFocused(false);
            }}
            onFocus={() => {
              setIsPriceFocused(true);
            }}
            isPriceFocused={isPriceFocused}
          />
        </TitleBox>

        <GroupBox>
          <DateText>{dateString(detailItem?.date)}</DateText>
          <UserText>{userIdSplit(detailItem?.userId)} </UserText>
        </GroupBox>
        <MarginBox />
      </InfoBox>

      <ContentBox isContentFocused={isContentFocused}>
        <InputContent
          style={{ textAlignVertical: "top" }}
          multiline={true}
          onChangeText={setContent}
          value={content}
          placeholder="변경할 내용을 입력하세요"
          onBlur={() => {
            setIsContentFocused(false);
          }}
          onFocus={() => {
            setIsContentFocused(true);
          }}
        />
      </ContentBox>
      <BtnContainer>
        {detailItem.isEdit === true ? (
          <>
            <CustomBtn
              btnText="완료"
              detailItem={detailItem}
              handler={uploadImage}
              color={MANGO_COLOR}
            />
            <CustomBtn
              btnText="취소"
              detailItem={detailItem}
              handler={setEdit}
              color={APPLEMANGO_COLOR}
            />
          </>
        ) : (
          <>
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
          </>
        )}
      </BtnContainer>
    </>
  );
};

export default EditDetail;

const MarginBox = styled.View`
  margin-top: 10px;
`;

const ImgContainer = styled.Image`
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

const TitleBox = styled.View`
  justify-content: flex-start;
  margin-bottom: 15px;
  margin-right: 5px;
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

const LabelText = styled.Text`
  font-family: korail;
  font-size: 24px;
  font-weight: 700;
`;

const ContentBox = styled.View`
  min-height: 200px;
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
  justify-content: center;
`;

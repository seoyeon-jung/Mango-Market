import React from "react";
import { TouchableOpacity, Text, View, Image } from "react-native";
import styled from "@emotion/native";
import { SCREEN_WIDTH } from "../util";
import { EvilIcons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

const Post = ({ item }) => {
  const { navigate } = useNavigation();
  const moveToDetail = () => {
    navigate("Stacks", {
      screen: "Detail",
      params: { postId: item.id, userId: item.userId },
    });
  };
  // 날짜 계산
  const detailDate = (a) => {
    const milliSeconds = new Date() - a;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
  };

  const nowDate = detailDate(new Date(item.date.toDate()));

  return (
    <>
      <TouchableOpacity onPress={moveToDetail}>
        <PostView>
          <PostContainer>
            <PostImg
              source={{
                uri: item.img,
              }}
            ></PostImg>
            <PostDescContianer>
              <PostTitle>{item?.title}</PostTitle>
              <PostDate>{nowDate}</PostDate>
              <PostPrice>{item?.price}</PostPrice>
            </PostDescContianer>
          </PostContainer>
        </PostView>
      </TouchableOpacity>
      <Line></Line>
    </>
  );
};

export default Post;

const PostView = styled.View`
  position: relative;
  margin: 16px;
  padding: 16px;
  width: ${SCREEN_WIDTH};
  height: 150px;
  background-color: ${(props) => props.theme.backgroundColor};
  border-radius: 8px;
`;

const PostContainer = styled.View`
  flex-direction: row;
`;

const PostImg = styled.Image`
  height: 130px;
  width: ${SCREEN_WIDTH / 3 + "px"};
  border-radius: 10px;
`;
const PostDescContianer = styled.View`
  margin-left: 20px;
  margin-right: 16px;
`;

const PostTitle = styled.Text`
  font-size: 18px;
  margin-top: 10px;

  color: ${(props) => props.theme.title};
`;
const PostDate = styled.Text`
  margin-top: 10px;
  margin-bottom: 10px;
  color: #c0c0c0;
`;
const PostPrice = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.title};
`;

const CommentIconGroup = styled.View`
  position: absolute;
  flex-direction: row;
  justify-content: flex-end;
  bottom: 0;
  right: 0;
`;

const CommentCounterText = styled.Text`
  color: #c0c0c0;
`;
const Line = styled.View`
  border-width: 0.5px;
  margin-left: 16px;
  margin-right: 16px;
  border-color: #d1d1d125;
`;

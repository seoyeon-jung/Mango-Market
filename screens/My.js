import React, { useCallback } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import styled from "@emotion/native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../util";
import { GRAY_COLOR, MANGO_COLOR } from "../colors";

import Post from "../components/\bPost";
// import { useFocusEffect } from "@react-navigation/native";
import { authService } from "../firebase.js";

const DUMMY_DATA = [
  {
    id: Math.random().toString(),
    title: "망고",
    price: "130,000원",
    date: "22시간전",
    img: "../assets/mango.png",
    commentCounter: 3,
  },
  {
    id: Math.random().toString(),
    title: "사과",
    price: "630,000원",
    date: "24시간전",
    img: "../assets/mango.png",
    commentCounter: 1,
  },
  {
    id: Math.random().toString(),
    title: "테스트다",
    price: "130,000원",
    date: "2일전",
    img: "../assets/mango.png",
    commentCounter: 8,
  },
  {
    id: Math.random().toString(),
    title: "test2",
    price: "9999원",
    date: "7일전",
    img: "../assets/mango.png",
    commentCounter: 7,
  },
  {
    id: Math.random().toString(),
    title: "test2",
    price: "9999원",
    date: "7일전",
    img: "../assets/mango.png",
    commentCounter: 7,
  },
];
const My = () => {
  console.log(authService.currentUser);
  // useFocusEffect(
  //   useCallback(() => {
  //     if (!authService.currenUser) {

  //     }
  //   })
  // )
  return (
    <>
      <UserCardContainer>
        <UserCard>
          <UserIntroduce>안녕하세요 망고 님 </UserIntroduce>
        </UserCard>
      </UserCardContainer>
      <PostListLableContainer>
        <PostListLableText>내가 작성한 글</PostListLableText>
        <PostCounterLable>{DUMMY_DATA.length} 개</PostCounterLable>
      </PostListLableContainer>
      <FlatList
        data={DUMMY_DATA}
        renderItem={({ item }) => <Post item={item} />}
      />
    </>
  );
};

export default My;
// 최상단 유저카드
const UserCardContainer = styled.View`
  height: ${SCREEN_HEIGHT / 6 + "px"};
  justify-content: center;
  align-items: center;
  /* border-width: 1px; */
`;
const UserCard = styled.View`
  /* flex: 1; */
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 80%;
  padding: 16px;
  background-color: transparent;
`;

const UserIntroduce = styled.Text`
  font-size: 32px;
  font-weight: 800;
  color: #333;
  margin-top: 8px;
`;

// const LogoutButton = styled.View`
//   margin-top: 30px;
//   margin-bottom: 0px;
//   border-radius: 5px;
//   padding: 8px;

//   background-color: ${MANGO_COLOR};
// `;

// const LogoutText = styled.Text`
//   color: white;
// `;

// 포스트 텍스트 관련
const PostListLableContainer = styled.View`
  margin: 8px;
  padding: 8px;

  flex-direction: row;
  justify-content: space-between;
`;

const PostListLableText = styled.Text`
  font-size: 16px;
  font-weight: 900;
`;

const PostCounterLable = styled.Text`
  font-size: 16px;
  font-weight: 900;
`;

// 포스터 카드 관련

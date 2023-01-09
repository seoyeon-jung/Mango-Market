import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import styled from "@emotion/native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../util";
import { GRAY_COLOR, MANGO_COLOR } from "../colors";

import Post from "../components/\bPost";
import { useFocusEffect } from "@react-navigation/native";
import { authService, dbService } from "../firebase.js";
import { signOut } from "firebase/auth";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const My = ({ navigation: { navigate, setOptions, reset } }) => {
  const [posts, setPosts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 로그인 & 로그아웃 로직
  const logout = () => {
    signOut(authService)
      .then(() => {
        console.log("로그아웃 성공");
        navigate("Home");
      })
      .catch((error) => console.log(error));
  };
  // 서버데이터 가져오기
  const getPostDate = () => {
    const q = query(
      collection(dbService, "posts"),
      orderBy("date"),
      where("userId", "==", "4420")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(newPosts);
    });
    return unsubscribe;
  };

  // refresh
  const onRefresh = async () => {
    setIsRefreshing(true);
    await getPostDate();
    setIsRefreshing(false);
    console.log("새로고침");
  };

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

      // login O
      setOptions({
        headerRight: () => {
          return (
            <TouchableOpacity style={{ marginRight: 10 }} onPress={logout}>
              <Text>로그아웃</Text>
            </TouchableOpacity>
          );
        },
      });

      getPostDate();
    }, [])
  );

  return (
    <>
      <UserCardContainer>
        <UserCard>
          <UserIntroduce>
            안녕하세요 {authService.currentUser.uid.slice(0, 4)} 님{" "}
          </UserIntroduce>
        </UserCard>
      </UserCardContainer>
      <PostListLableContainer>
        <PostListLableText>내가 작성한 글</PostListLableText>
        <PostCounterLable>{posts.length} 개</PostCounterLable>
      </PostListLableContainer>
      <FlatList
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        data={posts}
        renderItem={({ item }) => <Post item={item} />}
        keyExtractor={(item) => item.id}
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

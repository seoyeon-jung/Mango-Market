import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styled from "@emotion/native";
import { SCREEN_WIDTH } from '../util';
import { EvilIcons } from "@expo/vector-icons";
import { GRAY_COLOR, MANGO_COLOR } from "../colors";

const Post = ({ item }) => {
  return (
    <TouchableOpacity>
      <PostView>
        <PostContainer>
          <PostImg
            // style={{ width: 60, height: 80 }}
            source={require("../assets/mango.png")}
          ></PostImg>
          <PostDescContianer>
            <PostTitle>{item.title}</PostTitle>
            <PostDate>{item.date}</PostDate>
            <PostPrice>{item.price}</PostPrice>
          </PostDescContianer>
          <CommentIconGroup>
            <EvilIcons name="comment" size={24} color="#c0c0c0" />
            <CommentCounterText>{item.commentCounter}</CommentCounterText>
          </CommentIconGroup>
        </PostContainer>
      </PostView>
    </TouchableOpacity>
  );
};

export default Post;

const PostView = styled.View`
  position: relative;
  margin: 16px;
  padding: 16px;
  width: ${SCREEN_WIDTH};
  height: 150px;
  background-color: white;

  border-radius: 8px;
`;
const PostContainer = styled.View`
  flex-direction: row;
`;

const PostImg = styled.Image`
  height: 118px;
  width: ${SCREEN_WIDTH / 3 + "px"};
  border-radius: 10px;
  /* width: 100%; */
`;
const PostDescContianer = styled.View`
  margin-left: 20px;
  margin-right: 16px;
`;

const PostTitle = styled.Text`
  font-size: 18px;
  margin-top: 10px;
  /* font-weight: 400; */
  color: #333;
`;
const PostDate = styled.Text`
  margin-top: 10px;
  margin-bottom: 10px;
  color: #c0c0c0;
`;
const PostPrice = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: #333;
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

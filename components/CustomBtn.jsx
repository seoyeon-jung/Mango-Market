import { Text, TouchableOpacity } from "react-native";
import * as Font from "expo-font";
import { MANGO_COLOR } from "../colors";
import styled from "@emotion/native";
import { SCREEN_WIDTH } from "../util";

const CustomBtn = ({ btnText, handler, detailItem, color }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        handler(detailItem);
      }}
      style={{ margin: 10 }}
    >
      <ButtonView color={color}>
        <BtnText>{btnText}</BtnText>
      </ButtonView>
    </TouchableOpacity>
  );
};

export default CustomBtn;

const ButtonView = styled.View`
  background-color: ${(props) => props.color};
  border-radius: 10px;
  padding: 13px;
  width: ${SCREEN_WIDTH / 3 + "px"};
`;

const BtnText = styled.Text`
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.btn};
`;

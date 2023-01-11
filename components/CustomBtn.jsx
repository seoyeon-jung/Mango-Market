import { Text, TouchableOpacity } from "react-native";

const CustomBtn = ({ btnText, handler, detailItem }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        handler(detailItem);
      }}
      style={{ margin: 10 }}
    >
      <Text> {btnText} </Text>
    </TouchableOpacity>
  );
};

export default CustomBtn;

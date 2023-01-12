import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { authService, dbService } from "../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

function Comments({ postId }) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const addComments = async () => {
    if (!text) {
      Alert.alert("댓글을 입력해주세요");
      return;
    }
    const newComments = {
      comment: text,
      date: Date.now(),
      isEdit: false,
      postId,
      userId: authService.currentUser.uid,
    };
    await addDoc(collection(dbService, "comments"), newComments);
    setText("");
    onRefresh();
  };
  const getComments = () => {
    const q = query(
      collection(dbService, "comments"),
      orderBy("date"),
      where("postId", "==", postId)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(newComments);
    });
    return unsubscribe;
  };
  const onRefresh = async () => {
    setIsRefreshing(true);
    await getComments();
    setIsRefreshing(false);
  };
  useEffect(() => {
    getComments();
  }, []);
  return (
    <>
      <View>
        <TextInput
          style={{ borderWidth: 1, marginTop: 20 }}
          value={text}
          onChangeText={setText}
        />
      </View>
      <TouchableOpacity onPress={addComments}>
        <Text>완료</Text>
      </TouchableOpacity>
      <View>
        {comments.map((item) => {
          return (
            <View
              key={item.id}
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>{item.comment}</Text>
              {authService.currentUser.uid === item.userId ? (
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity style={{ marginRight: 10 }}>
                    <Text>수정</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text>삭제</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          );
        })}
      </View>
    </>
  );
}
export default Comments;

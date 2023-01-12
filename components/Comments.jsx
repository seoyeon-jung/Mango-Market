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
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

function Comments({ postId }, props) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [editText, setEditText] = useState("");

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
      createdAt: Date.now(),
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

  const deleteComments = (id) => {
    Alert.alert("댓글 삭제", "정말 삭제하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "삭제",
        style: "destructive",
        onPress: async () => {
          await deleteDoc(doc(dbService, "comments", id));
        },
      },
    ]);
  };

  const setEdit = async (id) => {
    const idx = comments.findIndex((comment) => comment.id === id);
    await updateDoc(doc(dbService, "comments", id), {
      isEdit: !comments[idx].isEdit,
    });
  };

  const editComment = async (id) => {
    await updateDoc(doc(dbService, "comments", id), {
      comment: editText,
      isEdit: false,
    });
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
              {item.isEdit ? (
                <TextInput
                  style={{ backgroundColor: "white" }}
                  onChangeText={setEditText}
                  onSubmitEditing={() => editComment(item.id)}
                  defaultValue={item.comment}
                />
              ) : (
                <Text>{item.comment}</Text>
              )}
              {/* <Text>{item.comment}</Text> */}
              {authService.currentUser.uid === item.userId ? (
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity onPress={() => setEdit(item.id)}>
                    <Feather
                      style={{ marginLeft: 10 }}
                      name="edit"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteComments(item.id)}>
                    <AntDesign
                      style={{ marginLeft: 10 }}
                      name="delete"
                      size={24}
                      color="black"
                    />
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

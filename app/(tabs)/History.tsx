import { firestore } from "@/config/frebaseConfig";
import Colors from "@/shared/Colors";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { MessageCircle } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function History() {
  const { user } = useUser();
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    user && getChatHistory();
  }, [user]);

  const getChatHistory = async () => {
    const q = query(
      collection(firestore, "chats"),
      where("userEmail", "==", user?.primaryEmailAddress?.emailAddress)
    );

    const querySnapshot = await getDocs(q);
    setHistoryList([]);
    querySnapshot.forEach((doc) => {
      // @ts-ignore
      setHistoryList((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <View>
      <FlatList
        data={historyList}
        renderItem={({ item, index }) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              padding: 10,
              backgroundColor: Colors.WHITE,
              marginBottom: 10,
              borderRadius: 20,
            }}
          >
            <View
              style={{
                padding: 10,
                marginRight: 10,
                backgroundColor: Colors.LIGHT,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              {" "}
              <MessageCircle style={{ padding: 5, borderWidth: 7 }} />
            </View>
            <View
              style={{
                width: "80%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {"Agent Name"}
              </Text>
              <Text
                style={{
                  color: Colors.GRAY,
                }}
                numberOfLines={2}
              >
                {"You are a translation expert. Translate text while keeping"}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

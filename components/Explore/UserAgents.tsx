import { firestore } from "@/config/frebaseConfig";
import Colors from "@/shared/Colors";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ArrowRight } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

type Agent = {
  agentName: string;
  agentId: string;
  prompt: string;
  emoji: string;
};

export default function UserAgents() {
  const { user } = useUser();

  const [agentList, setAgentList] = useState<Agent[]>([]);

  useEffect(() => {
    user && getUserAgents();
  }, [user]);

  const getUserAgents = async () => {
    const q = query(
      collection(firestore, "agents"),
      where("userEmail", "==", user?.primaryEmailAddress?.emailAddress)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //@ts-ignore
      setAgentList((prev) => [
        ...prev,
        {
          ...doc.data(),
          agentId: doc.id,
        },
      ]);
    });
  };

  return (
    <View
      style={{
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        My Agents
      </Text>
      <FlatList
        data={agentList}
        renderItem={({ item, index }) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              padding: 15,
              borderWidth: 0.5,
              borderColor: Colors.GRAY,
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: Colors.WHITE,
              borderRadius: 15,
              marginTop: 10,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                }}
              >
                {item.emoji}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "semibold",
                }}
              >
                {item.agentName}
              </Text>
            </View>
            <ArrowRight />
          </View>
        )}
      />
    </View>
  );
}

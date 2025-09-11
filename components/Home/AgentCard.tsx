import Colors from "@/shared/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Props = {
  agent: Agent;
};

type Agent = {
  id: number;
  name: string;
  desc: string;
  image: string;
  initialText: string;
  prompt: string;
  featured?: boolean;
};

//@ts-ignore
export default function AgentCard({ agent }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        minHeight: 200,
        overflow: "hidden",
      }}
      onPress={() =>
        router.push({
          pathname: "/chat",
          params: {
            agentId: agent.id,
            agentName: agent.name,
            initialText: agent.initialText,
            agentPrompt: agent.prompt,
          },
        })
      }
    >
      <View
        style={{
          padding: 15,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {agent.name}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            color: Colors.GRAY,
            marginTop: 2,
          }}
        >
          {agent.desc}
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
        }}
      >
        <Image
          source={agent.image}
          style={{ width: 120, height: 120, resizeMode: "contain" }}
        />
      </View>
    </TouchableOpacity>
  );
}

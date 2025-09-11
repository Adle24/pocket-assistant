import Colors from "@/shared/Colors";
import React from "react";
import { Image, Text, View } from "react-native";

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

export default function NonFeaturedAgentCard({ agent }: Props) {
  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        minHeight: 180,
        overflow: "hidden",
        padding: 15,
      }}
    >
      <View style={{}}>
        <Image
          source={agent.image}
          style={{ width: 70, height: 70, resizeMode: "contain" }}
        />
      </View>
      <View style={{ marginTop: 10 }}>
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
    </View>
  );
}

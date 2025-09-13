import AgentBanner from "@/components/Home/AgentBanner";
import Agents from "@/components/Home/Agents";
import React from "react";
import { View } from "react-native";

export default function Explore() {
  return (
    <View
      style={{
        padding: 15,
      }}
    >
      <AgentBanner />
      <Agents isFeatured={true} />
    </View>
  );
}

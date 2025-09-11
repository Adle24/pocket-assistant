import { AgentsList } from "@/shared/AgentList";
import React from "react";
import { FlatList, View } from "react-native";
import AgentCard from "./AgentCard";
import NonFeaturedAgentCard from "./NonFeaturedAgentCard";

interface AgentsProps {
  isFeatured: boolean;
}

export default function Agents({ isFeatured }: AgentsProps) {
  return (
    <View>
      <FlatList
        data={AgentsList}
        numColumns={2}
        //@ts-ignore
        renderItem={({ item, index }) =>
          item.featured == isFeatured && (
            <View
              style={{
                flex: 1,
                padding: 5,
              }}
            >
              {item.featured ? (
                <AgentCard agent={item} key={index} />
              ) : (
                <NonFeaturedAgentCard agent={item} key={index} />
              )}
            </View>
          )
        }
      />
    </View>
  );
}

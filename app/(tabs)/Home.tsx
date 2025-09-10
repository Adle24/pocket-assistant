import Colors from "@/shared/Colors";
import { useNavigation } from "expo-router";
import { SettingsIcon } from "lucide-react-native";
import React, { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          AI Pocket Agent
        </Text>
      ),
      headerTitleAlign: "center",
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginLeft: 15,
            display: "flex",
            flexDirection: "row",
            gap: 6,
            backgroundColor: Colors.PRIMARY,
            padding: 5,
            paddingHorizontal: 10,
            borderRadius: 5,
          }}
        >
          <Image
            source={require("./../../assets/images/diamond.png")}
            style={{ height: 20, width: 20 }}
          />
          <Text style={{ color: Colors.WHITE, fontWeight: "bold" }}>Pro</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <SettingsIcon
          style={{
            marginRight: 15,
          }}
        />
      ),
    });
  }, []);
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}

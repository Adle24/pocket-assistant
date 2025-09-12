import Colors from "@/shared/Colors";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import EmojiSelector from "react-native-emoji-selector";

export default function CreateAgent() {
  const navigation = useNavigation();

  const [emoji, setEmoji] = useState("🤖");

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Create Agent",
    });
  }, []);

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 15,
            borderColor: Colors.LIGHT,
            backgroundColor: Colors.WHITE,
          }}
        >
          <Text style={{ fontSize: 30 }}>{emoji}</Text>
        </TouchableOpacity>
        <EmojiSelector onEmojiSelected={(emoji) => console.log(emoji)} />
      </View>
      <View>
        <Text>Agent Name</Text>
        <TextInput placeholder="Agent Name" style={styles.input} />
      </View>
      <View
        style={{
          paddingTop: 15,
        }}
      >
        <Text>Instruction</Text>
        <TextInput
          placeholder="Agent Instruction"
          style={[styles.input, { height: 200, textAlignVertical: "top" }]}
          multiline={true}
        />
      </View>
      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          marginTop: 20,
          borderRadius: 15,
        }}
      >
        <Text
          style={{
            color: Colors.WHITE,
            textAlign: "center",
            fontSize: 18,
          }}
        >
          Create Agent
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    marginTop: 2,
    paddingTop: 15,
    paddingBottom: 15,
  },
});

import Colors from "@/shared/Colors";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { CameraIcon, PlusIcon, SendIcon } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const initialMessages = [
  { role: "user", content: "Hi, how are you?" },
  { role: "assistant", content: "I am good" },
];

export default function ChatUI() {
  const navigation = useNavigation();
  const { agentName, agentPrompt, agentId, initialText } =
    useLocalSearchParams();

  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState<string>();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: agentName,
      headerRight: () => <PlusIcon />,
    });
  }, []);

  const onSendMessage = () => {
    if (!input?.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={80}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FlatList
        data={messages}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.messageContainer,
              item.role == "user"
                ? styles.userMessage
                : styles.assistantMessage,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                item.role == "user" ? styles.userText : styles.assistantText,
              ]}
            >
              {item.content}
            </Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.cameraIcon}>
          <CameraIcon size={30} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          onChangeText={(value) => setInput(value)}
          value={input}
        />
        <TouchableOpacity style={styles.button} onPress={onSendMessage}>
          <SendIcon color={Colors.WHITE} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  messageContainer: {
    maxWidth: "75%",
    marginVertical: 4,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  userMessage: {
    backgroundColor: Colors.PRIMARY,
    alignSelf: "flex-end",
    borderBottomRightRadius: 2,
  },
  assistantMessage: {
    backgroundColor: Colors.LIGHT,
    alignSelf: "flex-start",
    borderBottomLeftRadius: 2,
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    color: Colors.WHITE,
  },
  assistantText: {
    color: Colors.BLACK,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 12,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#CCC",
    backgroundColor: Colors.WHITE,
    marginRight: 8,
    paddingHorizontal: 15,
  },
  button: {
    padding: 7,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
  },
  cameraIcon: {
    marginRight: 10,
  },
});

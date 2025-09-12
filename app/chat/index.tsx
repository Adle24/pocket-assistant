import { firestore } from "@/config/frebaseConfig";
import Colors from "@/shared/Colors";
import { AIChatModel } from "@/shared/GlobalAPI";
import { useUser } from "@clerk/clerk-expo";
import * as Clipboard from "expo-clipboard";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import {
  CameraIcon,
  CopyIcon,
  PlusIcon,
  SendIcon,
  XIcon,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

type Message = {
  role: string;
  content: string;
};

export default function ChatUI() {
  const navigation = useNavigation();
  const { agentName, agentPrompt, agentId, initialText, chatId } =
    useLocalSearchParams();

  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>();
  const [file, setFile] = useState<string | null>();
  const [docId, setDocId] = useState<string | null>();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: agentName,
      headerRight: () => <PlusIcon />,
    });

    if (!chatId) {
      const id = Date.now().toString();
      setDocId(id);
    }
  }, []);

  useEffect(() => {
    // @ts-ignore
    setInput(initialText);
    if (agentPrompt) {
      setMessages((prev) => [
        ...prev,
        { role: "system", content: agentPrompt.toString() },
      ]);
    }
  }, [agentPrompt]);

  const onSendMessage = async () => {
    if (!input?.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    const loadingMessage = { role: "assistant", content: "__loading__" };
    setMessages((prev) => [...prev, loadingMessage]);

    const result = await AIChatModel([...messages, newMessage]);
    setMessages((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = result.aiResponse;
      return updated;
    });
  };

  const copyToClipboard = async (message: string) => {
    await Clipboard.setStringAsync(message);
    ToastAndroid.show("Copied to clipboard", ToastAndroid.CENTER);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 0.5,
    });

    if (!result.canceled) {
      setFile(result.assets[0].uri);
    }
  };

  useEffect(() => {
    const saveMessages = async () => {
      if (messages?.length > 0 && docId) {
        console.log("saved");

        await setDoc(
          doc(firestore, "chats", docId),
          {
            userEmail: user?.primaryEmailAddress?.emailAddress,
            messages: messages,
            docId: docId,
            agentName: agentName,
            agentPrompt: agentPrompt,
            agentId: agentId,
            initialText: initialText,
            chatId: chatId,
          },
          { merge: true }
        );
      }
    };
    saveMessages();
  }, [messages]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={80}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FlatList
        data={messages}
        //@ts-ignore
        renderItem={({ item, index }) =>
          item.role !== "system" && (
            <View
              style={[
                styles.messageContainer,
                item.role == "user"
                  ? styles.userMessage
                  : styles.assistantMessage,
              ]}
            >
              {item.content == "__loading__" ? (
                <ActivityIndicator size="small" color={Colors.BLACK} />
              ) : (
                <Text
                  style={[
                    styles.messageText,
                    item.role == "user"
                      ? styles.userText
                      : styles.assistantText,
                  ]}
                >
                  {item.content}
                </Text>
              )}
              {item.role == "assistant" && (
                <Pressable onPress={() => copyToClipboard(item.content)}>
                  <CopyIcon color={Colors.GRAY} style={{ marginTop: 3 }} />
                </Pressable>
              )}
            </View>
          )
        }
      />
      <View>
        {file && (
          <View
            style={{ marginBottom: 5, display: "flex", flexDirection: "row" }}
          >
            <Image
              source={{ uri: file }}
              style={{ width: 50, height: 50, borderRadius: 6 }}
            />
            <TouchableOpacity onPress={() => setFile(null)}>
              <XIcon />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.cameraIcon}>
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

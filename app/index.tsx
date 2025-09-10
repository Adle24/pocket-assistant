import Colors from "@/shared/Colors";
import {
  Dimensions,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        paddingTop: Platform.OS == "android" ? 30 : 40,
        justifyContent: "center",
      }}
    >
      <Image
        source={require("./../assets/images/logo.jpg")}
        style={{
          width: Dimensions.get("screen").width * 0.85,
          height: 200,
          resizeMode: "contain",
        }}
      />

      <View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 10,
            color: Colors.PRIMARY,
          }}
        >
          Welcome to AI Pocket Agent
        </Text>
        <Text
          style={{
            fontSize: 17,
            textAlign: "center",
            color: Colors.GRAY,
          }}
        >
          Your Ultimate AI Personal Agent to make life easier. Try it Today,
          Completely Free!
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: "100%",
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 12,
          marginTop: 50,
        }}
      >
        <Text
          style={{
            color: Colors.WHITE,
            textAlign: "center",
            fontSize: 16,
          }}
        >
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
}

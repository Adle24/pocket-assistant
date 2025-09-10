import Colors from "@/shared/Colors";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { firestore } from "@/config/frebaseConfig";
import { useAuth, useSSO, useUser } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { doc, setDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSignedIn) {
      // Redirect to home Screen
    }

    if (isSignedIn != undefined) {
      setLoading(false);
    }
  }, [isSignedIn]);

  useWarmUpBrowser();

  const { startSSOFlow } = useSSO();

  const onLoginPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_google",
          redirectUrl: AuthSession.makeRedirectUri(),
        });

      if (signUp) {
        await setDoc(doc(firestore, "users", signUp.emailAddress ?? ""), {
          email: signUp.emailAddress,
          name: signUp.firstName + " " + signUp.lastName,
          joinedDate: Date.now(),
          credits: 20,
        });
      }

      if (createdSessionId) {
        setActive!({
          session: createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask);
              return;
            }

            router.push("/");
          },
        });
      } else {
        console.log("Not created");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);

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
      {!loading && (
        <TouchableOpacity
          style={{
            width: "100%",
            padding: 15,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 12,
            marginTop: 50,
          }}
          onPress={onLoginPress}
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
      )}
      {loading == undefined && <ActivityIndicator size={"large"} />}
    </View>
  );
}

import { useClerk, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import {
  ClockIcon,
  CompassIcon,
  LogOut,
  PlusCircleIcon,
} from "lucide-react-native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const menuItems = [
  {
    title: "Create Agent",
    icon: <PlusCircleIcon size={24} color={"#4F8EF7"} />,
    path: "/create-agent",
  },
  {
    title: "Explore",
    icon: <CompassIcon size={24} color={"#4F8EF7"} />,
    path: "/(tabs)/Explore",
  },
  {
    title: "My History",
    icon: <ClockIcon size={24} color={"#4F8EF7"} />,
    path: "/(tabs)/History",
  },
  {
    title: "Logout",
    icon: <LogOut size={24} color={"#4F8EF7"} />,
    path: "logout",
  },
];

export default function Profile() {
  const { user } = useUser();
  const router = useRouter();
  const { signOut } = useClerk();

  const onMenuClick = async (menuItem: any) => {
    if (menuItem.path == "logout") {
      await signOut();
      router.replace("/");
    } else {
      router.push(menuItem.path);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image source={{ uri: user?.imageUrl }} style={styles.profileImage} />
        <Text style={styles.email}>
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>
      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => onMenuClick(item)}
          >
            {item.icon}
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 40,
  },
  logo: {
    width: 120,
    height: 50,
    marginBottom: 30,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: "#333",
  },
  menu: {
    width: "90%",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
    color: "#333",
  },
});

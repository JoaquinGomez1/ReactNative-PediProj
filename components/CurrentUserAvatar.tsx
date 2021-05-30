import React, { PropsWithoutRef } from "react";
import { Image, ImageStyle, StyleProp, StyleSheet } from "react-native";
import { DEFAULT_USER_IMAGE } from "../constants/MockData";
import { useCurrentUser } from "../context/User";
import Colors from "../constants/Colors";

type CurrentUserProps = {
  style?: StyleProp<ImageStyle>;
};

export default function CurrentUserAvatar(
  props: PropsWithoutRef<CurrentUserProps>
) {
  const { currentUser } = useCurrentUser();
  return (
    <Image
      source={{
        uri: currentUser?.photoURL || DEFAULT_USER_IMAGE,
      }}
      style={styles.userImage}
    />
  );
}

const styles = StyleSheet.create({
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.colors.red[400],
  },
});

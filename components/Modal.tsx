import React, { PropsWithChildren } from "react";
import { View, Modal, StyleSheet, StyleProp, ViewStyle } from "react-native";
import Layout from "../constants/Layout";
import TouchableIcon from "./TouchableIcon";

interface MyModalProps {
  onExitRequest: (value: boolean) => void;
  modalStyle?: StyleProp<ViewStyle>;
  modalContainerStyle?: StyleProp<ViewStyle>;
  modalVisible: boolean;
}

export default function MyModal({
  onExitRequest,
  modalStyle,
  modalContainerStyle,
  modalVisible,
  children,
}: PropsWithChildren<MyModalProps>) {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={[styles.modalContainer, modalContainerStyle]}>
        <View style={styles.modalBackground} />
        <View style={[styles.modal, modalStyle]}>
          <TouchableIcon
            style={styles.touchableIcon}
            onPress={() => onExitRequest(false)}
            iconName="times"
          />
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute" as "absolute",
    width: "100%",
    height: "100%",
    elevation: 4,
  },
  modalBackground: {
    position: "absolute" as "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    opacity: 0.8,
    zIndex: 1,
  },
  modal: {
    backgroundColor: "white",
    zIndex: 99,
    borderRadius: 8,
    width: "80%",
    top: 200,
    left: 40,
    opacity: 1,
    padding: Layout.spacing[2],
    elevation: 3,
  },
  touchableIcon: {
    alignSelf: "flex-end",
    fontSize: 32,
  },
});

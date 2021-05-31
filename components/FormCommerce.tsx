import React, { PropsWithRef, useState } from "react";
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  TextInput,
  ViewStyle,
} from "react-native";
import Colors from "../constants/Colors";
import { mockCommerce } from "../constants/MockData";
import MyButton from "./Button";
import { View } from "./Themed";
import { Commerce } from "../types";
import { LatLng } from "react-native-maps";

interface FormCommerceProps {
  buttonStyle?: StyleProp<ViewStyle>;
  onSubmit?: () => void;
}

interface InputTypes {
  name: keyof Commerce;
  textChangeHandler: (text: string) => void;
  placeholder: string;
  key?: keyof LatLng;
}

const handleNumericInputs = (numberString: string): number => {
  try {
    if (!numberString) return 0;
    return Number.parseInt(numberString);
  } catch (err) {
    console.log("Something went wrong ", err);
    return 0;
  }
};

const allInputs = (
  currentCommerceData: Commerce,
  setCurrentCommerceData: React.Dispatch<React.SetStateAction<Commerce>>
): InputTypes[] => [
  {
    name: "name",
    textChangeHandler: (text) =>
      setCurrentCommerceData({ ...currentCommerceData, name: text }),
    placeholder: "Nombre",
  },
  {
    name: "description",
    textChangeHandler: (text) =>
      setCurrentCommerceData({ ...currentCommerceData, description: text }),
    placeholder: "Descripción",
  },
  {
    name: "img",
    textChangeHandler: (text) =>
      setCurrentCommerceData({ ...currentCommerceData, img: text }),
    placeholder: "URL imagen",
  },
  {
    name: "location",
    textChangeHandler: (text) => {
      setCurrentCommerceData({
        ...currentCommerceData,
        location: {
          ...currentCommerceData["location"],
          longitude: handleNumericInputs(text),
        },
      });
    },
    placeholder: "Longitud",
    key: "longitude",
  },
  {
    name: "location",
    textChangeHandler: (text) => {
      setCurrentCommerceData({
        ...currentCommerceData,
        location: {
          ...currentCommerceData["location"],
          latitude: handleNumericInputs(text),
        },
      });
    },
    key: "latitude",
    placeholder: "Latitud",
  },
  {
    name: "category",
    textChangeHandler: (text) =>
      setCurrentCommerceData({
        ...currentCommerceData,
        category: handleNumericInputs(text),
      }),
    placeholder: "Id de categoría",
  },
];

export default function FormCommerce({
  buttonStyle,
  onSubmit,
}: PropsWithRef<FormCommerceProps>) {
  const [currentCommerceData, setCurrentCommerceData] =
    useState<Commerce>(mockCommerce);

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%", paddingHorizontal: 10 }}>
        {allInputs(currentCommerceData, setCurrentCommerceData).map(
          ({ placeholder, name, textChangeHandler, key }) => (
            <TextInput
              key={placeholder}
              style={styles.input}
              placeholder={placeholder}
              onChangeText={textChangeHandler}
              value={
                name === "location"
                  ? `${currentCommerceData[name][key!]}`
                  : `${currentCommerceData[name]}`
              }
            />
          )
        )}
      </ScrollView>
      <MyButton
        title="Agregar"
        onPress={() => onSubmit && onSubmit()}
        style={buttonStyle}
      />
      <MyButton
        title="Ver JSON Data"
        onPress={() => alert(JSON.stringify(currentCommerceData, null, 4))}
        altStyle
        style={buttonStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  contentContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  iconContainer: {
    width: 32,
    height: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  icon: {
    fontSize: 22,
    color: "white",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  input: {
    paddingHorizontal: 10,
    borderRadius: 8,
    width: "100%",
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.colors.gray[300],
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

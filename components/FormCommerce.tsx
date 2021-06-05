import React, { PropsWithRef, useState } from "react";
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  TextInput,
  ViewStyle,
} from "react-native";
import Colors from "../constants/Colors";
import MyButton from "./Button";
import { View } from "./Themed";
import { Commerce } from "../types";
import { LatLng } from "react-native-maps";

interface FormCommerceProps {
  buttonStyle?: StyleProp<ViewStyle>;
  onSubmit?: (commerce: Commerce) => void;
  commerceData?: Commerce;
  buttonDisabled?: boolean;
}

interface InputTypes {
  name: keyof Commerce;
  textChangeHandler: (text: string) => void;
  placeholder: string;
  key?: keyof LatLng;
  keyboard?: "numeric";
}

const handleNumericInputs = (numberString: string): number => {
  try {
    if (!numberString || isNaN(Number.parseInt(numberString))) return 0;
    return Number.parseFloat(numberString);
  } catch (err) {
    console.log("Something went wrong ", err);
    return 0;
  }
};

const blankCommerce: Commerce = {
  id: 0,
  name: "",
  description: "",
  img: "",
  longitude: undefined,
  latitude: undefined,
  category: "",
};

const allInputs = (
  currentCommerceData: Commerce,
  setCurrentCommerceData: React.Dispatch<React.SetStateAction<Commerce>>
): InputTypes[] => [
  // Check if currentCommerceData is not undefined on every handler
  {
    name: "name",
    textChangeHandler: (text) =>
      currentCommerceData &&
      setCurrentCommerceData({ ...currentCommerceData, name: text }),
    placeholder: "Nombre",
  },
  {
    name: "description",
    textChangeHandler: (text) =>
      currentCommerceData &&
      setCurrentCommerceData({ ...currentCommerceData, description: text }),
    placeholder: "Descripción",
  },
  {
    name: "img",
    textChangeHandler: (text) =>
      currentCommerceData &&
      setCurrentCommerceData({ ...currentCommerceData, img: text }),
    placeholder: "URL imagen",
  },
  {
    name: "longitude",
    textChangeHandler: (text) => {
      currentCommerceData &&
        setCurrentCommerceData({
          ...currentCommerceData,
          longitude: handleNumericInputs(text),
        });
    },
    placeholder: "Longitud",
    key: "longitude",
    keyboard: "numeric",
  },
  {
    name: "latitude",
    textChangeHandler: (text) => {
      currentCommerceData &&
        setCurrentCommerceData({
          ...currentCommerceData,
          latitude: handleNumericInputs(text),
        });
    },
    key: "latitude",
    placeholder: "Latitud",
    keyboard: "numeric",
  },
  {
    name: "category",
    textChangeHandler: (text) =>
      currentCommerceData &&
      setCurrentCommerceData({
        ...currentCommerceData,
        category: handleNumericInputs(text),
      }),
    placeholder: "Id de categoría",
    keyboard: "numeric",
  },
];

export default function FormCommerce({
  buttonStyle,
  onSubmit,
  commerceData,
  buttonDisabled = false,
}: PropsWithRef<FormCommerceProps>) {
  const [currentCommerceData, setCurrentCommerceData] = useState<Commerce>(
    commerceData || blankCommerce
  );

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%", paddingHorizontal: 10 }}>
        {allInputs(currentCommerceData, setCurrentCommerceData).map(
          ({ placeholder, name, textChangeHandler, key, keyboard }) => {
            const isDescription = name === "description";
            return (
              <TextInput
                key={placeholder}
                style={styles.input}
                numberOfLines={isDescription ? 4 : 1}
                placeholder={placeholder}
                onChangeText={textChangeHandler}
                multiline={isDescription}
                keyboardType={keyboard}
                value={`${
                  currentCommerceData[name] ? currentCommerceData[name] : ""
                }`}
              />
            );
          }
        )}
      </ScrollView>
      <MyButton
        disabled={buttonDisabled}
        title="Agregar"
        onPress={() => onSubmit && onSubmit(currentCommerceData!)}
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
    minHeight: 40,
    maxHeight: 40 * 3,
    width: "100%",
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

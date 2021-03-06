import React, { Dispatch, PropsWithRef, SetStateAction, useState } from "react";
import { StyleProp, StyleSheet, TextInput, ViewStyle } from "react-native";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import { Product } from "../types";
import MyButton from "./Button";
import { View } from "./Themed";

interface FormAddProductProps {
  buttonStyle?: StyleProp<ViewStyle>;
  onSubmit: (productData: Product) => void;
  productData?: Product;
  buttonDisabled?: boolean;
  buttonTitle: string;
}
interface InputTypes {
  name: keyof Product;
  textChangeHandler: (text: string) => void;
  placeholder: string;
  keyboardType?: "numeric" | undefined;
}

const blankCommerce: Product = {
  id: 0,
  title: "",
  description: "",
  img: "",
  units: undefined,
  price: undefined,
  commerce: "",
};

const allInputs = (
  currentProductData: Product,
  setCurrentProductData: Dispatch<SetStateAction<Product>>
): InputTypes[] => [
  {
    name: "title",
    textChangeHandler: (text) =>
      setCurrentProductData({ ...currentProductData, title: text }),
    placeholder: "Titulo",
  },
  {
    name: "description",
    textChangeHandler: (text) =>
      setCurrentProductData({ ...currentProductData, description: text }),
    placeholder: "Descripción",
  },
  {
    name: "img",
    textChangeHandler: (text) =>
      setCurrentProductData({ ...currentProductData, img: text }),
    placeholder: "URL imagen",
  },
  {
    name: "units",
    textChangeHandler: (text) => {
      setCurrentProductData({
        ...currentProductData,
        units: handleNumericInputs(text)!,
      });
    },
    placeholder: "Unidades",
    keyboardType: "numeric",
  },
  {
    name: "price",
    textChangeHandler: (text) => {
      setCurrentProductData({
        ...currentProductData,
        price: handleNumericInputs(text)!,
      });
    },
    placeholder: "Precio",
    keyboardType: "numeric",
  },
  {
    name: "commerce",
    textChangeHandler: (text) =>
      setCurrentProductData({
        ...currentProductData,
        commerce: text && handleNumericInputs(text),
      }),
    placeholder: "Id de commercio",
    keyboardType: "numeric",
  },
];

const handleNumericInputs = (numberString: string): number => {
  try {
    if (!numberString || isNaN(Number.parseInt(numberString))) return 0;
    return Number.parseFloat(numberString);
  } catch (err) {
    console.log("Something went wrong ", err);
    return 0;
  }
};

export default function FormAddProduct({
  buttonStyle,
  onSubmit,
  productData,
  buttonDisabled,
  buttonTitle,
}: PropsWithRef<FormAddProductProps>) {
  const [currentProductData, setCurrentProductData] = useState<Product>(
    productData || blankCommerce
  );

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        {allInputs(currentProductData, setCurrentProductData).map(
          ({ placeholder, name, textChangeHandler, keyboardType }) => (
            <TextInput
              key={name}
              style={styles.input}
              placeholder={placeholder}
              onChangeText={textChangeHandler}
              value={`${
                currentProductData[name] ? currentProductData[name] : ""
              }`}
              keyboardType={keyboardType}
            />
          )
        )}
      </View>
      <MyButton
        title={buttonTitle}
        disabled={buttonDisabled}
        onPress={() => onSubmit(currentProductData)}
        style={buttonStyle}
      />
      <MyButton
        title="Ver JSON Data"
        onPress={() => alert(JSON.stringify(currentProductData, null, 4))}
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
    marginVertical: Layout.spacing[1],
    borderWidth: 1,
    borderColor: Colors.colors.gray[300],
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

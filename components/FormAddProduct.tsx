import React, { PropsWithRef, useState } from "react";
import { StyleProp, StyleSheet, TextInput, ViewStyle } from "react-native";
import Colors from "../constants/Colors";
import { mockProduct } from "../constants/MockData";
import MyButton from "./Button";
import { View } from "./Themed";

interface FormAddProductProps {
  buttonStyle?: StyleProp<ViewStyle>;
  onSubmit?: () => void;
}

// TODO: Make an array to map TextInputs
export default function FormAddProduct({
  buttonStyle,
  onSubmit,
}: PropsWithRef<FormAddProductProps>) {
  // ! Keep this component as dumb as posible.
  // ! This is meant to be exlusively used as a UI Component
  const [currentProductData, setCurrentProductData] = useState(mockProduct);

  const handleNumericInputs = (numberString: string): number | undefined => {
    try {
      if (!numberString) return;
      return Number.parseInt(numberString);
    } catch (err) {
      console.log("Something went wrong ", err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", paddingHorizontal: 10 }}>
        <TextInput
          style={styles.input}
          placeholder="Titulo"
          onChangeText={(text) =>
            setCurrentProductData({ ...currentProductData, title: text })
          }
          value={currentProductData?.title}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripcion"
          onChangeText={(text) =>
            setCurrentProductData({
              ...currentProductData,
              description: text,
            })
          }
          value={currentProductData?.description}
        />
        <TextInput
          style={styles.input}
          placeholder="URL Imagen"
          onChangeText={(text) =>
            setCurrentProductData({ ...currentProductData, img: text })
          }
          value={currentProductData?.img}
        />
        <TextInput
          style={styles.input}
          placeholder="Unidades"
          keyboardType="numeric"
          onChangeText={(text) =>
            setCurrentProductData({
              ...currentProductData,
              units: handleNumericInputs(text)!,
            })
          }
          value={currentProductData?.units?.toString()} // ! parsing It to string it may or may not cause problems later
        />
        <TextInput
          style={styles.input}
          placeholder="Precio"
          keyboardType="numeric"
          onChangeText={(text) =>
            setCurrentProductData({
              ...currentProductData,
              price: handleNumericInputs(text)!,
            })
          }
          value={currentProductData?.price?.toString()}
        />
        <TextInput
          style={styles.input}
          placeholder="Comercio"
          keyboardType="numeric"
          onChangeText={(text) =>
            setCurrentProductData({
              ...currentProductData,
              commerce: handleNumericInputs(text)!,
            })
          }
          value={currentProductData?.commerce?.toString()}
        />
      </View>
      <MyButton title="Agregar" onPress={() => onSubmit} style={buttonStyle} />
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

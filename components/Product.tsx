import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { Product as ProdType } from "../types";
import ProductImage from "../components/ProductImage";
import cartContext from "../context/Cart";

interface IProduct {
  product: ProdType;
  navigation?: any;
  route?: any;
  style?: any;
  [x: string]: any;
}

type ProductProps = {
  product: ProdType;
  navigation?: any;
  route?: any;
  style?: any;
  [x: string]: any;
};

export default function Product(props: ProductProps) {
  const { product, navigation } = props;
  const { cartFunctions } = useContext(cartContext);
  const handleNavigation = () => {
    navigation.push("ProductDetail", {
      id: product.id || 111,
      product,
    });
  };

  return (
    <View {...props} style={styles.container}>
      <TouchableOpacity onPress={handleNavigation}>
        <ProductImage source={{ uri: product?.img }} />

        <View style={styles.titleContainer}>
          <TouchableOpacity>
            <Text style={styles.title}>{product?.title || "Product"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.description} numberOfLines={1}>
            {product?.description ||
              "lorem ipsum sit sadasdhaskdjashdk jashdjkashdakjs asjhdasjkdhaskjdhaks  "}
          </Text>
          <Text style={styles.price}>${product?.price || "$360.00"}.00</Text>
        </View>
      </TouchableOpacity>
      <View>{props.children}</View>
    </View>
  );
}

function convertToPrice(price: number): string {
  // Intl does not work on android using expo.
  // Using intl package instead
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(price);
}

const styles = StyleSheet.create({
  title: {
    color: Colors["light"].text,
    fontSize: 16,
    fontWeight: "bold",
  },
  titleContainer: {
    backgroundColor: "#f3f4f6",
    padding: 12,
    height: 60,
    width: "100%",
  },
  infoContainer: {
    padding: 10,
  },
  container: {
    width: "90%",
    height: 380,
    alignItems: "center",
    borderRadius: 6,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.colors.borders,
    marginVertical: 8,
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "contain",
  },
  description: {
    fontSize: 16,
    overflow: "hidden",
    color: Colors["light"].text,
  },
  price: {
    fontSize: 20,
    marginTop: 10,
    color: Colors["light"].text,
  },
});

import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { Product as ProdType } from "../types";
import ProductImage from "../components/ProductImage";
import Animated, { EasingNode } from "react-native-reanimated";
import GestureRecognizer from "react-native-swipe-gestures";

type ProductProps = {
  product: ProdType;
  navigation?: any;
  route?: any;
  style?: StyleProp<ViewStyle>;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  [x: string]: any;
};

export default function Product(props: ProductProps) {
  const { product, navigation } = props;

  const handleNavigation = () => {
    if (props.route.name !== "Home") {
      return navigation.navigate("Home", {
        screen: "ProductDetail",
        params: { id: product.id, product },
      });
    }
    return navigation.push("ProductDetail", { id: product.id, product });
  };

  const productAnimationValue = new Animated.Value(0);
  const height = new Animated.Value(380);

  const animateProductRight = () => {
    Animated.timing(productAnimationValue, {
      toValue: 400,
      duration: 280,
      easing: EasingNode.ease,
    }).start(() =>
      Animated.timing(productAnimationValue, {
        toValue: 0,
        duration: 180,
        easing: EasingNode.ease,
      }).start()
    );
  };

  const animateProductLeft = () => {
    Animated.timing(productAnimationValue, {
      toValue: -400,
      duration: 280,
      easing: EasingNode.ease,
    }).start(() =>
      Animated.timing(height, {
        toValue: 0,
        duration: 100,
        easing: EasingNode.ease,
      })
    );
  };

  const productAnimationDetails = {
    transform: [{ translateX: productAnimationValue }],
  };

  const handleSwipeRight = () => {
    if (props.onSwipeRight) {
      animateProductRight();
      props?.onSwipeRight();
    }
  };

  const handleSwipeLeft = () => {
    if (props.onSwipeLeft) {
      animateProductLeft();
      props?.onSwipeLeft();
    }
  };

  return (
    <Animated.View
      {...props}
      style={[styles.container, productAnimationDetails, props.style]}
    >
      <GestureRecognizer
        onSwipeRight={handleSwipeRight}
        onSwipeLeft={handleSwipeLeft}
      >
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
      </GestureRecognizer>
    </Animated.View>
  );
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
    height: 40,
    width: "100%",
  },
  infoContainer: {
    padding: 10,
  },
  container: {
    width: "100%",
    minHeight: 330,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.colors.borders,
    marginVertical: 8,
  },
  image: {
    width: "100%",
    height: 150,
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

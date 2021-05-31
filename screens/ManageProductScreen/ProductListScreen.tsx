import React from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import ListItem from "../../components/ListItem";
import { View } from "../../components/Themed";
import TouchableIcon from "../../components/TouchableIcon";
import { productList } from "../../constants/MockData";

export default function ProductListScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={productList}
        keyExtractor={(item) => `${item.id}`}
        contentContainerStyle={{ width: 350 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: { title, img, units, price, id } }) => (
          <ListItem item={{ title, id, img, subtitle: price, body: units }}>
            <TouchableIcon
              onPress={() => undefined}
              iconName="edit"
              style={{ color: Colors.colors.gray[400] }}
            />
            <TouchableIcon
              onPress={() => undefined}
              iconName="trash"
              style={{ color: Colors.colors.red[600] }}
            />
          </ListItem>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  actionsContainer: {},
});

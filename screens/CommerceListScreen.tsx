import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { FlatList, StyleSheet } from "react-native";

import Category from "../components/Category";
import SearchBar from "../components/SearchBar";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import { commerceList as mockData } from "../constants/MockData";
import { Commerce } from "../types";

type CategoriesNavigationProps = StackNavigationProp<any, any>;

interface CommerceDetailScreen {
  navigation: CategoriesNavigationProps;
}

export default function CommerceListScreen({
  navigation,
}: React.PropsWithRef<CommerceDetailScreen>) {
  const [commerceList, setCommerceList] = React.useState(mockData);

  const handleTextChanged = (text: string) => {
    const regex = new RegExp(text, "gi");
    const filteredList = mockData.filter((each) => regex.test(each.name));
    setCommerceList(filteredList);
  };

  const handleNavigation = (commerce: Commerce) => {
    navigation.push("CommerceDetailScreen", { commerce });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ver nuestros locales adheridos</Text>
        <SearchBar
          onChangeText={handleTextChanged}
          placeholder="Buscar un local"
        />
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View>
        <FlatList
          contentContainerStyle={styles.list}
          data={commerceList}
          keyExtractor={({ id }) => `${id}`}
          renderItem={({ item }) => (
            <Category
              handleNavigation={() => handleNavigation(item)}
              category={item}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingTop: 35,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.colors.red[400],
    marginBottom: 10,
    marginTop: 40,
  },
  separator: {
    marginTop: 30,
    height: 1,
    width: "100%",
  },
  list: {
    width: "100%",
    justifyContent: "center",
    paddingBottom: 40,
  },
});

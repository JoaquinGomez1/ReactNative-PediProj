import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Badge from "../components/Badge";

import Category from "../components/Category";
import SearchBar from "../components/SearchBar";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import { commerceList as initialData } from "../constants/MockData";
import useCategories from "../hooks/useCategories";
import { Commerce } from "../types";

type CategoriesNavigationProps = StackNavigationProp<any, any>;

interface CommerceDetailScreen {
  navigation: CategoriesNavigationProps;
  route: RouteProp<any, any>;
}

export default function CommerceListScreen({
  navigation,
  route,
}: React.PropsWithRef<CommerceDetailScreen>) {
  const [commerceList, setCommerceList] =
    React.useState<Commerce[] | []>(initialData);
  const [selectedCategory, setSelectedCategory] =
    React.useState<number | string | undefined>();
  const { categories } = useCategories();

  React.useEffect(() => {
    setCommerceList(initialData);
  }, [route]);

  React.useEffect(() => {}, [selectedCategory]);

  const handleTextChanged = (text: string) => {
    const regex = new RegExp(text, "gi");
    const filteredList = initialData.filter((each) => regex.test(each.name));

    const encontradoEnLocal = filteredList.length >= 1;
    if (encontradoEnLocal) setCommerceList(filteredList);
    else {
      const resultHttp: [] = [];
      setCommerceList(resultHttp);
    } // Buscar en base de datos
  };

  const handleNavigation = (commerce: Commerce | undefined) => {
    navigation.push("CommerceDetailScreen", { commerce });
  };

  const handleBadgePress = (id: string | number) => {
    if (id === selectedCategory) {
      setCommerceList(initialData);
      return;
    }
    const filteredCommerces = initialData.filter(
      (each) => each.category === id
    );
    setCommerceList(filteredCommerces);
    setSelectedCategory(id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ver nuestros locales adheridos</Text>
        <SearchBar
          onChangeText={handleTextChanged}
          placeholder="Buscar en locales"
        />

        <View style={{ height: 40, marginTop: 8 }}>
          <ScrollView horizontal>
            {categories.map((eachCategory) => (
              <Badge
                onPress={() => handleBadgePress(eachCategory.id)}
                style={styles.badge}
                key={eachCategory.id}
                text={eachCategory.name}
                iconName={eachCategory.icon}
              />
            ))}
          </ScrollView>
        </View>
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
    paddingVertical: 100,
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
    marginTop: 15,
    height: 1,
    width: "100%",
  },
  list: {
    width: "100%",
    justifyContent: "center",
    paddingBottom: 40,
  },
  badge: {
    marginHorizontal: 8,
  },
});

import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Badge from "../components/Badge";

import Category from "../components/Category";
import SearchBar from "../components/SearchBar";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import { commerceList as mockData } from "../constants/MockData";
import useCategories from "../hooks/useCategories";
import { Commerce } from "../types";

type CategoriesNavigationProps = StackNavigationProp<any, any>;

interface CommerceDetailScreen {
  navigation: CategoriesNavigationProps;
}

export default function CommerceListScreen({
  navigation,
}: React.PropsWithRef<CommerceDetailScreen>) {
  const [commerceList, setCommerceList] =
    React.useState<Commerce[] | []>(mockData);
  const { categories } = useCategories();

  React.useEffect(() => {
    setCommerceList(mockData);
  }, [navigation]);

  const handleTextChanged = (text: string) => {
    const regex = new RegExp(text, "gi");
    const filteredList = mockData.filter((each) => regex.test(each.name));

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
    //  TODO: Make this work with http requests aswell
    const filteredCommerces = commerceList.filter(
      (each) => each.category === id
    );
    setCommerceList(filteredCommerces);
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
          <ScrollView horizontal={true}>
            {categories.map((eachCategory) => (
              <Badge
                onPress={() => handleBadgePress(eachCategory.id)}
                style={{ marginHorizontal: 8 }}
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
});

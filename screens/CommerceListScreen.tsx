import { RouteProp, useFocusEffect } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState, useCallback, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Badge from "../components/Badge";

import Commerce from "../components/Commerce";
import SearchBar from "../components/SearchBar";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import { useCommercesProvider } from "../context/Commerces";
import useCategories from "../hooks/useCategories";
import useCommerces from "../hooks/useCommerce";
import { Category as CategoryType, Commerce as CommerceType } from "../types";

type CategoriesNavigationProps = StackNavigationProp<any, any>;

interface CommerceDetailScreen {
  navigation: CategoriesNavigationProps;
  route: RouteProp<any, any>;
}

export default function CommerceListScreen({
  navigation,
}: React.PropsWithRef<CommerceDetailScreen>) {
  const { commerceList: initialData } = useCommercesProvider();
  const [localCommercesList, setLocalCommercesList] =
    useState<CommerceType[] | []>(initialData);

  useEffect(() => {
    setLocalCommercesList(initialData);
  }, [initialData]);

  const [selectedCategory, setSelectedCategory] =
    useState<number | string | undefined>();

  const { categories } = useCategories();

  useFocusEffect(
    useCallback(() => {
      setLocalCommercesList(initialData);
      setSelectedCategory(undefined);
    }, [])
  );

  const handleTextChanged = (text: string) => {
    const regex = new RegExp(text, "gi");
    const filteredList = initialData.filter((each) =>
      selectedCategory
        ? regex.test(each.name) && each.category === selectedCategory
        : regex.test(each.name)
    );

    const foundOnLocalData = filteredList.length >= 1;
    if (foundOnLocalData) setLocalCommercesList(filteredList);
    else {
      // If the shop wasn't found on local data. make a request to the server
      const resultHttp: any[] = [];
      setLocalCommercesList(resultHttp);
    }
  };

  const handleNavigation = (commerce: CommerceType | undefined) => {
    navigation.push("CommerceDetailScreen", { commerce });
  };

  const handleBadgePress = (id: string | number) => {
    const isCategorySelected = id === selectedCategory;
    if (isCategorySelected) {
      setLocalCommercesList(initialData);
      setSelectedCategory(undefined);
      return;
    }
    const filteredCommerces = initialData.filter(
      (each) => each.category === id
    );
    setLocalCommercesList(filteredCommerces);
    setSelectedCategory(id);
  };

  const determineBadgeBackgroundColor = (eachCategory: CategoryType) => ({
    backgroundColor:
      eachCategory.id === selectedCategory
        ? Colors.colors.red[600]
        : Colors.colors.red[400],
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ver nuestros locales adheridos</Text>
        <SearchBar
          onChangeText={handleTextChanged}
          placeholder="Buscar en locales"
        />

        <View style={{ height: 40, marginTop: 8 }}>
          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((eachCategory) => (
              <Badge
                onPress={() => handleBadgePress(eachCategory.id)}
                style={[
                  styles.badge,
                  determineBadgeBackgroundColor(eachCategory),
                ]}
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
          data={localCommercesList}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={({ id }) => `${id}`}
          renderItem={({ item }) => (
            <Commerce
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
    paddingHorizontal: Layout.spacing[4],
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

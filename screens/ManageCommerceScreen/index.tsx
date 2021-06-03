import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import ListItem from "../../components/ListItem";
import { Text, View } from "../../components/Themed";
import TouchableIcon from "../../components/TouchableIcon";
import { Commerce } from "../../types";
import Layout from "../../constants/Layout";
import Icon from "../../components/DefaultIcon";
import FormCommerce from "../../components/FormCommerce";
import IconButton from "../../components/IconButton";
import { useCommercesProvider } from "../../context/Commerces";

export default function ManageCommerceScreen({ navigation }: any) {
  const { commerceList } = useCommercesProvider();
  const [selectedProductId, setSelectedProductId] =
    useState<number | string | undefined>();

  const [showAddButton, setShowAddButton] = useState(true);
  const [selectedCommerceData, setselectedCommerceData] =
    useState<Commerce | undefined>();

  useEffect(() => {
    const selected = commerceList.find((each) => each.id === selectedProductId);
    setselectedCommerceData(selected);
    if (selectedProductId) {
      setShowAddButton(false);
    } else {
      setShowAddButton(true);
    }
  }, [selectedProductId]);

  return (
    <View style={styles.container}>
      {!selectedCommerceData && (
        <FlatList
          data={commerceList}
          keyExtractor={(item) => `${item.id}`}
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: { name, img, id } }) => (
            <ListItem item={{ title: name, id, img }}>
              <TouchableIcon
                onPress={() => setSelectedProductId(id)}
                iconName="edit"
                style={{ color: Colors.colors.gray[400] }}
              />
              <TouchableIcon
                onPress={() => undefined}
                iconName="trash"
                style={{
                  color: Colors.colors.red[600],
                  marginTop: Layout.spacing[1],
                }}
              />
            </ListItem>
          )}
        />
      )}

      {selectedCommerceData && (
        <View style={{ width: "100%" }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: "row" }}>
              <TouchableIcon
                style={{ marginLeft: Layout.spacing[1] }}
                iconName="arrow-left"
                onPress={() => setSelectedProductId(undefined)}
              />
              <Text style={{ marginLeft: 50, fontSize: 16 }}>
                Editar: {selectedCommerceData?.name}
              </Text>
            </View>
            <FormCommerce
              onSubmit={() => undefined}
              commerceData={selectedCommerceData}
            />
          </ScrollView>
        </View>
      )}

      {showAddButton && (
        <IconButton
          style={styles.addButton}
          textStyle={styles.addButtonText}
          iconStyle={styles.iconStyle}
          iconName="plus"
          displayText="Agregar Comercio"
          onPress={() => navigation.push("AddCommerce")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Layout.spacing[4],
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  actionsContainer: {},
  addButton: {
    backgroundColor: Colors.colors.green[100],
    borderColor: Colors.colors.green[400],
  },
  addButtonText: {
    color: Colors.colors.green[600],
  },
  iconStyle: {
    color: Colors.colors.green[600],
  },
});

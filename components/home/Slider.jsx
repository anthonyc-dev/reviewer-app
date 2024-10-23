import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { Colors } from "../../constants/Colors";

const Slider = () => {
  const [sliderList, setSliderList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSliderList();
  }, []);

  const getSliderList = async () => {
    try {
      const q = query(collection(db, "slider"));
      const querySnapshot = await getDocs(q);

      const sliderData = [];
      querySnapshot.forEach((doc) => {
        sliderData.push(doc.data());
      });
      setSliderList(sliderData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching slider data: ", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View
        style={{
          width: 300,
          height: 150,
          borderRadius: 15,
          marginRight: 15,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
          paddingLeft: 20,
          paddingTop: 20,
          marginBottom: 5,
        }}
      >
        #Special for you
      </Text>

      <FlatList
        data={sliderList}
        horizontal={true}
        style={{ paddingLeft: 20 }}
        renderItem={({ item, index }) => (
          <Image
            source={{ uri: item.image }}
            style={{
              width: 300,
              height: 150,
              borderRadius: 15,
              marginRight: 15,
            }}
          />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({});

import {
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../../components/home/Header";
import Slider from "../../components/home/Slider";
import TopicList from "../../components/home/Topic";
import { Colors } from "../../constants/Colors";

const Home = () => {
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {/* Header */}
          <Header />
          {/* Slider */}
          <Slider />
          {/* Topics */}
          <TopicList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

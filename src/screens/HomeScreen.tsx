import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import Header from '../components/Header';
import Cards from '../components/Cards';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2C313F" />
      <Header />
      <Cards />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C313F', // Ensure background color matches the rest of your app
  },
});

export default HomeScreen;

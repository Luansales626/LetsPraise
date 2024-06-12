import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Importe o ícone FontAwesome ou outro ícone de sua escolha

const Header: React.FC = () => {
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const toggleSearch = () => {
    setSearchExpanded(!searchExpanded);
  };

  const toggleFilterModal = () => {
    setFilterModalVisible(!filterModalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Let's</Text>
          <Text style={[styles.logoText, { color: '#007bff' }]}>Praise</Text>
        </View>
        <View style={styles.rightContainer}>
          {/* <TouchableOpacity onPress={toggleSearch}>
            <FontAwesome name="search" size={24} color="white" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFilterModal}>
            <FontAwesome name="filter" size={24} color="white" style={styles.icon} />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => {}}>
            <FontAwesome name="user" size={24} color="white" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      {searchExpanded && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Buscar..."
            placeholderTextColor="#888"
          />
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={toggleFilterModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtro</Text>
            {/* Adicione as opções do filtro aqui */}
            <Button title="Fechar" onPress={toggleFilterModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c313f',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    backgroundColor: '#2c313f',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  searchBar: {
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  icon: {
    marginLeft: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Header;
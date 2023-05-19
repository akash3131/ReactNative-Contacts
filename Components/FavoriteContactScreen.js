import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteContactsScreen = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('contacts');
      if (value !== null) {
        setContacts(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleContactPress = (contact) => {
    navigation.navigate('ViewContact', { contact });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.contactItem} onPress={() => handleContactPress(item)}>
        {item.image && <Image source={{ uri: item.image }} style={styles.contactImage} />}
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.contactPhone}>{item.phone}</Text>
          <Text style={styles.contactEmail}>{item.email}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {contacts.length > 0 ? (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item?.id?.toString()}
          renderItem={renderItem}
          style={styles.contactList}
        />
      ) : (
        <Text style={styles.emptyText}>You have no favorite contacts</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  contactList: {
    flex: 1,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  contactPhone: {
    fontSize: 14,
    color: '#777',
  },
  contactEmail: {
    fontSize: 14,
    color: '#777',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
    marginTop: 50,
  },
});

export default FavoriteContactsScreen;

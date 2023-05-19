import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContactsScreen = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('contacts')
      .then((data) => {
        if (data !== null) {
          setContacts(JSON.parse(data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const toggleFavorite = (phone) => {
    const updatedContacts = contacts.map((contact) => {
      console.log('contact phone:', contact.phone, 'phone:', phone);
      if (contact.phone === phone) {
        console.log('matched');
        return {...contact, favorite: !contact.favorite};
      }
      return contact;
    });
    console.log('updated contacts:', updatedContacts);
    setContacts(updatedContacts);
    AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };
  
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('ViewContactScreen', { contact: item })}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text>{item.phone}</Text>
        <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
          <Text>{item.favorite ? '★' : '☆'}</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };


  const addContact = (contact) => {
    const newContacts = [...contacts, contact];
    setContacts(newContacts);
    AsyncStorage.setItem('contacts', JSON.stringify(newContacts));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.phone}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddContactScreen', { addContact })}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2196F3',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
});

export default ContactsScreen;

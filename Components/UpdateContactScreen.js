import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateContactScreen = ({ route, navigation }) => {
  const [contact, setContact] = useState({});

  useEffect(() => {
    AsyncStorage.getItem('contacts')
      .then((data) => {
        if (data !== null) {
          const contacts = JSON.parse(data);
          const foundContact = contacts.find((c) => c.id === route.params.id);
          setContact(foundContact);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateContact = async () => {
    try {
      const contacts = await AsyncStorage.getItem('contacts');
      const parsedContacts = JSON.parse(contacts);
      const updatedContacts = parsedContacts.map((c) => {
        if (c.id === contact.id) {
          return contact;
        }
        return c;
      });
      await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (name, value) => {
    setContact((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={contact.name}
        onChangeText={(text) => handleChange('name', text)}
      />
      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        value={contact.phone}
        onChangeText={(text) => handleChange('phone', text)}
      />
      <TouchableOpacity style={styles.button} onPress={updateContact}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  }});

  export default UpdateContactScreen;
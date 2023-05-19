import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const ViewContactScreen = ({route,navigation}) => {
    const {contact} = route.params;

    const handleDelete = async (phone) => {
        const updatedContacts = contact.filter((contact) => contact.phone !== phone);

  // Update the state
  setContacts(updatedContacts);

  // Save the updated contacts to AsyncStorage
  try {
    await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
  } catch (error) {
    console.log(error);
  }
      };

      const handleUpdate = (contact) => {
        navigation.navigate('UpdateContact', { contact });
      };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{contact.name}</Text>
      <Text style={styles.phone}>{contact.phone}</Text>
      <Text style={styles.email}>{contact.email}</Text>
      <TouchableOpacity style={styles.button} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  phone: {
    fontSize: 18,
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ViewContactScreen;

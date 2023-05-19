import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteContactsScreen = ({navigation}) => {
  const [favoriteContacts, setFavoriteContacts] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('contacts')
      .then((data) => {
        if (data !== null) {
          const allContacts = JSON.parse(data);
          const favorites = allContacts.filter((contact) => contact.favorite);
          setFavoriteContacts(favorites);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('View Contact', {contact: item})}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text>{item.phone}</Text>
        <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
          <Text>{item.favorite ? '★' : '☆'}</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteContacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
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
});

export default FavoriteContactsScreen;

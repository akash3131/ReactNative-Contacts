import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ContactsScreen from './Components/ContactScreen';
import FavoriteContactsScreen from './Components/FavoriteContactScreen';
import { createStackNavigator } from '@react-navigation/stack';
import AddContactScreen from './Components/AddContactScreen';
import ViewContactScreen from './Components/ViewContact';
import UpdateContactScreen from './Components/UpdateContactScreen'


const Drawer = createDrawerNavigator();
const Stack  = createStackNavigator();

function Slide() {
  return (
    <Drawer.Navigator initialRouteName="All Contacts">
        <Drawer.Screen name="ContactsScreen" component={ContactsScreen} />
        <Drawer.Screen name="Favorite Contacts" component={FavoriteContactsScreen} />
      </Drawer.Navigator>
  );
}



export default function App() {

  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Slide} options={{ headerShown: false }} />
        <Stack.Screen options={{title: 'AddContact'}} name="AddContactScreen" component={AddContactScreen} />
        <Stack.Screen options={{title: 'ViewContact'}} name="ViewContactScreen" component={ViewContactScreen} />
        <Stack.Screen options={{title: 'ViewContact'}} name="UpdateContact" component={UpdateContactScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>

    


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text:{
    fontSize:70
  }
});


function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', 
                   justifyContent: 'center' }}>
        <Text>Contacts</Text>
    </View>
  );
}

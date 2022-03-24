import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CategoryListing from './src/Screens/Category/list';
import CategoryDetails from './src/Screens/Category/details';
import AddCategoryForm from './src/Screens/Category/addForm';


const Stack = createStackNavigator();

export default function App(props) {
  return (
    <NavigationContainer>  
      
      <Stack.Navigator  
      initial={CategoryListing}
        initialRouteName= "Category listing">
        <Stack.Screen  name="Category listing" component={CategoryListing} />
        <Stack.Screen name="Category details" component={CategoryDetails} />
        <Stack.Screen name="Add category" component={AddCategoryForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    alignSelf: 'center',
    marginTop: 100
  },
});

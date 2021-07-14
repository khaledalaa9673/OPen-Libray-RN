import React from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Books from "../screens/Books"
import BookDetails from "../screens/BookDetails.js"


const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Books" component={Books} />
        <Stack.Screen
          name="BookDetails"
          component={BookDetails}
          options={({ route }) => ({
            title: route.params.name || "Book Details"
          })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator
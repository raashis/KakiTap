import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllEventsScreen from './events/AllEventsScreen';
import MainScreen from './mainScreen';


const Stack = createNativeStackNavigator();


export default function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
       <Stack.Screen name="Main" component={MainScreen} />
       <Stack.Screen name="AllEvents" component={AllEventsScreen} />
     </Stack.Navigator>
   </NavigationContainer>
 );
}

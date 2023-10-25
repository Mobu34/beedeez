import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './utils';
import { Screens } from './screens';
import { LoginScreen } from '../features/login/screens';
import { StationListScreen } from '../features/station/screens';
import { useAppSelector } from '../hooks';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const { _id } = useAppSelector(state => state.userReducer);

  const initialRoute = _id ? Screens.Login : Screens.Station;

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screens.Login} component={LoginScreen} />
      <Stack.Screen name={Screens.Station} component={StationListScreen} />
    </Stack.Navigator>
  );
};

const linking = {
  prefixes: [],
  config: {
    screens: {
      [Screens.Login]: 'login',
      [Screens.Station]: 'station',
    },
  },
};

type NavigationProps = Partial<
  React.ComponentProps<typeof NavigationContainer>
>;

export const AppNavigator = (props: NavigationProps) => {
  return (
    <NavigationContainer ref={navigationRef} linking={linking} {...props}>
      <AppStack />
    </NavigationContainer>
  );
};

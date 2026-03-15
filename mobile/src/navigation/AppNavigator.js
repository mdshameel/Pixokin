import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { AuthScreen } from '../screens/AuthScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { AlbumScreen } from '../screens/AlbumScreen';
import { UploadScreen } from '../screens/UploadScreen';
import { MemberManagementScreen } from '../screens/MemberManagementScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const tabs = {
  Home: { icon: 'home-outline', component: HomeScreen },
  Upload: { icon: 'cloud-upload-outline', component: UploadScreen },
  Members: { icon: 'people-outline', component: MemberManagementScreen },
  Profile: { icon: 'person-outline', component: ProfileScreen }
};

const MainTabs = () => (
  <Tab.Navigator screenOptions={({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ color, size }) => <Ionicons name={tabs[route.name].icon} color={color} size={size} />,
    tabBarActiveTintColor: '#3563FF',
    tabBarStyle: { borderTopLeftRadius: 18, borderTopRightRadius: 18, height: 64, paddingBottom: 8 }
  })}>
    {Object.entries(tabs).map(([name, config]) => (
      <Tab.Screen key={name} name={name} component={config.component} />
    ))}
  </Tab.Navigator>
);

export const AppNavigator = () => {
  const { token } = useAuth();

  return (
    <Stack.Navigator>
      {!token ? (
        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="Root" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Album" component={AlbumScreen} options={({ route }) => ({ title: route.params?.album?.name || 'Album' })} />
        </>
      )}
    </Stack.Navigator>
  );
};

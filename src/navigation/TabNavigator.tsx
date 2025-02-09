import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import ShortsScreen from '../screens/Shorts/ShortsScreen';
import RewardScreen from '../screens/Reward/RewardScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import TabBar from '../components/TabBar/TabBar';
import {RootStackParamList} from './types';

const Tab = createBottomTabNavigator<RootStackParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Shorts" component={ShortsScreen} />
      <Tab.Screen name="Reward" component={RewardScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

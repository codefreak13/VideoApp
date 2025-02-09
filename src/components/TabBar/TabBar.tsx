import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  HomeIcon,
  ShortsIcon,
  RewardIcon,
  ProfileIcon,
} from '../../assets/Icons';

const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  const getIcon = (routeName: string, isFocused: boolean) => {
    const color = isFocused ? '#ff0000' : '#666666';
    const size = 24;

    switch (routeName) {
      case 'Home':
        return <HomeIcon color={color} size={size} />;
      case 'Shorts':
        return <ShortsIcon color={color} size={size} />;
      case 'Reward':
        return <RewardIcon color={color} size={size} />;
      case 'Profile':
        return <ProfileIcon color={color} size={size} />;
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom}]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = options.tabBarLabel ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}
            activeOpacity={0.7}>
            <View style={styles.tabContent}>
              {getIcon(route.name, isFocused)}
              <Text
                style={[
                  styles.label,
                  {color: isFocused ? '#ff0000' : '#666666'},
                ]}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
});

export default TabBar;

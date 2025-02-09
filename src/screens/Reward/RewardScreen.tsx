import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Props} from './interface';

const RewardScreen: React.FC<Props> = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
});

export default RewardScreen;

import React from 'react';
import {Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {VideoCarouselProps} from './interface';

export const VideoCarousel: React.FC<VideoCarouselProps> = ({
  id,
  uri,
  title,
}) => {
  const onPress = () => {
    console.log(id);
  };
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={styles.thumbnailContainer}>
      <Image source={{uri}} style={styles.thumbnail} resizeMode="cover" />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginTop: 25,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  thumbnailContainer: {
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumbnail: {
    width: 146,
    height: 220,
    backgroundColor: '#1a1a1a',
  },
});

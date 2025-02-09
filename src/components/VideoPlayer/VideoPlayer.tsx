import React, {useCallback, useEffect, useState, useRef} from 'react';
import {StyleSheet, View, ActivityIndicator, Dimensions} from 'react-native';
import Video, {VideoRef} from 'react-native-video';
import {IVideoPlayerProps} from './interface';

const {height, width} = Dimensions.get('window');

export const VideoPlayer = React.memo(
  ({
    videoUrl,
    isCurrentVideo,
    isFocused,
    initialTimestamp = 0,
    isFirstVideo,
  }: IVideoPlayerProps) => {
    const [loading, setLoading] = useState(true);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const videoRef = useRef<VideoRef>(null);

    const onBuffer = useCallback(() => {
      setLoading(true);
    }, []);

    const onProgress = useCallback(() => {
      setLoading(false);
    }, []);

    const onLoad = useCallback(() => {
      setLoading(false);
      setIsVideoLoaded(true);
    }, []);

    useEffect(() => {
      if (initialTimestamp > 0 && isFirstVideo && !isVideoLoaded) {
        videoRef.current?.seek(initialTimestamp);
      }
      if (!isCurrentVideo) {
        videoRef.current?.pause();
      }
      setIsVideoLoaded(false);
    }, [initialTimestamp, isCurrentVideo, isFirstVideo, isVideoLoaded]);

    return (
      <View style={styles.videoContainer}>
        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
        <Video
          ref={videoRef}
          source={{uri: videoUrl, type: 'mp4'}}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          repeat
          paused={!isCurrentVideo || !isFocused}
          onBuffer={onBuffer}
          onLoad={onLoad}
          onProgress={onProgress}
          controls={false}
          ignoreSilentSwitch="ignore"
          playInBackground={true}
          playWhenInactive={true}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  videoContainer: {
    height: height,
    width: width,
    backgroundColor: '#000',
  },
  thumbnail: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VideoPlayer;

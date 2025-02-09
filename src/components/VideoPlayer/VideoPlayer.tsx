import React, {useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import Video, {VideoRef} from 'react-native-video';
import {IVideoPlayerProps} from './interface';

export const VideoPlayer = React.memo(
  ({
    videoUrl,
    isCurrentVideo,
    isFocused,
    initialTimestamp = 0,
    isFirstVideo,
    muted,
    onBuffer,
    onLoad,
    onLoadStart,
    onSeek,
    onProgress,
    isVideoLoaded,
    toggleVideoLoad,
  }: IVideoPlayerProps) => {
    const videoRef = useRef<VideoRef>(null);

    useEffect(() => {
      if (initialTimestamp > 0 && isFirstVideo && !isVideoLoaded) {
        videoRef.current?.seek(initialTimestamp);
      }
      if (!isCurrentVideo) {
        videoRef.current?.pause();
      }
      toggleVideoLoad(false);
    }, [
      initialTimestamp,
      isCurrentVideo,
      isFirstVideo,
      isVideoLoaded,
      toggleVideoLoad,
    ]);

    return (
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
        muted={muted}
        onSeek={onSeek}
        onLoadStart={onLoadStart}
      />
    );
  },
);

export default VideoPlayer;

import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  ListRenderItem,
  ViewToken,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {Props} from './interface';
import {IFeaturedVideo} from '../../components/FeaturedCarousel/interface';
import VideoOverlay from '../../components/VideoOverlay/VideoOverlay';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import {SearchNormal1} from 'iconsax-react-native';
import {getVideoData} from '../../services/getFireStoreData';

const {height, width} = Dimensions.get('window');

const ShortScreen: React.FC<Props> = ({route}) => {
  const CONTROLS_TIMEOUT = 3000;
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videos, setVideos] = useState<IFeaturedVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const isFocused = useIsFocused();
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();
  const initialVideo = route?.params?.video;
  const initialTimestamp = route?.params?.timestamp || 0;
  const [loading, setLoading] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const toggleVideoLoad = useCallback((status: boolean = true) => {
    setIsVideoLoaded(status);
  }, []);

  const onLoadStart = useCallback(() => {
    setLoading(true);
  }, []);

  const onBuffer = useCallback(
    (_: {isBuffering: boolean | ((prevState: boolean) => boolean)}) => {},
    [],
  );

  const onProgress = useCallback(() => {
    setLoading(false);
  }, []);

  const onLoad = useCallback(() => {
    setLoading(false);
    toggleVideoLoad();
  }, [toggleVideoLoad]);

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems.length > 0) {
        const newIndex = viewableItems[0]?.index ?? 0;
        setCurrentIndex(newIndex);
      }
    },
    [],
  );

  const viewabilityConfig = {itemVisiblePercentThreshold: 50};

  const viewabilityConfigCallbackPairs = useRef([
    {viewabilityConfig, onViewableItemsChanged},
  ]);

  const hideControlsWithDelay = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, CONTROLS_TIMEOUT);
  }, []);

  const onMuteToggle = useCallback(() => {
    setMuted(prev => !prev);
  }, []);

  const onScreenPress = useCallback(() => {
    setShowControls(true);
    hideControlsWithDelay();
    onMuteToggle;
  }, [hideControlsWithDelay, onMuteToggle]);

  const fetchVideos = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getVideoData();
      if (data) {
        setVideos(
          initialVideo
            ? [initialVideo, ...data.filter(v => v.id !== initialVideo.id)]
            : data,
        );
      }
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    } finally {
      setIsLoading(false);
    }
  }, [initialVideo]);

  useEffect(() => {
    if (isFocused) {
      fetchVideos();
    }
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [fetchVideos, isFocused]);

  const renderVideo: ListRenderItem<IFeaturedVideo> = useCallback(
    ({item, index}) => {
      const isCurrentVideo = index === currentIndex;
      return (
        <TouchableWithoutFeedback onPress={onScreenPress}>
          <View style={styles.videoContainer}>
            {loading && (
              <View style={styles.loader}>
                <ActivityIndicator size="large" color={'white'} />
              </View>
            )}
            <VideoPlayer
              videoUrl={item.videoUrl}
              thumbnail={item.thumbnail}
              isCurrentVideo={isCurrentVideo}
              isFocused={isFocused}
              initialTimestamp={initialTimestamp}
              isFirstVideo={index === 0}
              muted={muted}
              onBuffer={onBuffer}
              onLoad={onLoad}
              onProgress={onProgress}
              isVideoLoaded={isVideoLoaded}
              toggleVideoLoad={toggleVideoLoad}
              onLoadStart={onLoadStart}
            />
            <VideoOverlay
              title={item.title}
              tags={item.tags}
              showControls={showControls}
              muted={muted}
              stats={{
                likes: 11.5,
                comments: 312,
                shares: 20,
              }}
              onMuteToggle={onMuteToggle}
            />
            <SearchNormal1 color="white" style={styles.searchIcon} />
          </View>
        </TouchableWithoutFeedback>
      );
    },
    [
      currentIndex,
      onScreenPress,
      loading,
      isFocused,
      initialTimestamp,
      muted,
      onBuffer,
      onLoad,
      onProgress,
      isVideoLoaded,
      toggleVideoLoad,
      showControls,
      onMuteToggle,
      onLoadStart,
    ],
  );

  useEffect(() => {
    const resetScroll = () => {
      if (flatListRef.current && initialVideo && isFocused) {
        flatListRef.current.scrollToOffset({offset: 0, animated: false});
        setCurrentIndex(0);
      }
    };

    return () => {
      resetScroll();
    };
  }, [initialVideo, isFocused]);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={videos}
        renderItem={renderVideo}
        keyExtractor={item => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
        removeClippedSubviews
        maxToRenderPerBatch={3}
        windowSize={3}
        viewabilityConfig={viewabilityConfig}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        initialScrollIndex={0}
        getItemLayout={(_, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
        onScrollToIndexFailed={() => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            if (flatListRef.current) {
              flatListRef.current.scrollToOffset({offset: 0, animated: false});
            }
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
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
  video: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
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
  searchIcon: {
    position: 'absolute',
    left: 35,
    top: 50,
  },
});

export default ShortScreen;

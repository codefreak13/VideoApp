import React, {useRef, useState, useEffect, useCallback, useMemo} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Image,
  Animated,
} from 'react-native';
import Video from 'react-native-video';
import {SearchNormal1} from 'iconsax-react-native';
import {useIsFocused} from '@react-navigation/native';
import {IFeaturedVideo, IFeaturedCarouselProps} from './interface';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const ANIMATION_DURATION = 200;
const VIDEO_DELAY = 3000;

const Tag = React.memo(
  ({text, fadeAnim}: {text: string; fadeAnim: Animated.Value}) => (
    <Animated.View
      style={[
        styles.tagContainer,
        {
          transform: [
            {
              scale: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            },
          ],
        },
      ]}>
      <Text style={styles.tag}>{text}</Text>
    </Animated.View>
  ),
);

const VideoSlide = React.memo(
  ({
    video,
    showThumbnail,
    shouldPlay,
    handleProgress,
  }: {
    video: IFeaturedVideo;
    showThumbnail: boolean;
    shouldPlay: boolean;
    handleProgress: (data: any) => void;
  }) => (
    <Animated.View style={styles.slide}>
      {showThumbnail ? (
        <Image
          source={{uri: video.thumbnail}}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      ) : (
        <Video
          source={{uri: video.videoUrl, type: 'mp4'}}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          paused={!shouldPlay}
          repeat
          controls={false}
          ignoreSilentSwitch="ignore"
          playInBackground={true}
          playWhenInactive={true}
          onProgress={handleProgress}
          muted
        />
      )}
    </Animated.View>
  ),
);

const PaginationDot = React.memo(
  ({
    index,
    activeIndex,
    scrollX,
  }: {
    index: number;
    activeIndex: number;
    scrollX: Animated.Value;
  }) => {
    const dotWidth = scrollX.interpolate({
      inputRange: [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      outputRange: [6, 16, 6],
      extrapolate: 'clamp',
    });

    const dotOpacity = scrollX.interpolate({
      inputRange: [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[
          styles.paginationDot,
          {
            width: dotWidth,
            opacity: dotOpacity,
            backgroundColor: index === activeIndex ? 'red' : 'white',
          },
        ]}
      />
    );
  },
);

export const FeaturedCarousel: React.FC<IFeaturedCarouselProps> = React.memo(
  ({videos, onPlay, handleProgress}) => {
    const isFocused = useIsFocused();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [previousIndex, setPreviousIndex] = useState(0);
    const [shouldShowThumbnail, setShouldShowThumbnail] = useState(true);

    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef<ScrollView>(null);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const slideAnim = useRef(new Animated.Value(0)).current;
    const playButtonScale = useRef(new Animated.Value(1)).current;
    const videoTimer = useRef<NodeJS.Timeout>();

    const animationConfig = useMemo(
      () => ({
        timing: {
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        },
      }),
      [],
    );

    const startVideoSequence = useCallback(() => {
      setShouldShowThumbnail(true);
      setIsPlaying(false);

      if (videoTimer.current) {
        clearTimeout(videoTimer.current);
      }

      videoTimer.current = setTimeout(() => {
        setShouldShowThumbnail(false);
        setIsPlaying(true);
      }, VIDEO_DELAY);
    }, []);

    useEffect(() => {
      startVideoSequence();
      return () => {
        if (videoTimer.current) {
          clearTimeout(videoTimer.current);
        }
      };
    }, [startVideoSequence, activeIndex]);

    useEffect(() => {
      if (isFocused) {
        startVideoSequence();
      } else {
        setIsPlaying(false);
        setShouldShowThumbnail(true);
      }
    }, [isFocused, startVideoSequence]);

    const handleScroll = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        scrollX.setValue(offsetX);

        const slideIndex = Math.round(offsetX / SCREEN_WIDTH);
        if (slideIndex !== activeIndex) {
          setActiveIndex(slideIndex);
        }
      },
      [activeIndex, scrollX],
    );

    const handlePlayPress = useCallback(() => {
      onPlay(videos[activeIndex]);
    }, [activeIndex, onPlay, videos]);

    const animateTransition = useCallback(() => {
      const slideOut = Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          ...animationConfig.timing,
        }),
        Animated.timing(slideAnim, {
          toValue: 50,
          ...animationConfig.timing,
        }),
      ]);

      const slideIn = Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          ...animationConfig.timing,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          ...animationConfig.timing,
        }),
      ]);

      slideOut.start(() => {
        setPreviousIndex(activeIndex);
        slideAnim.setValue(-50);
        slideIn.start();
      });
    }, [activeIndex, fadeAnim, slideAnim, animationConfig.timing]);

    useEffect(() => {
      if (activeIndex !== previousIndex) {
        animateTransition();
      }
    }, [activeIndex, previousIndex, animateTransition]);

    const renderTags = useMemo(() => {
      return videos[activeIndex]?.tags?.map((tag, index) => (
        <Tag key={index} text={tag} fadeAnim={fadeAnim} />
      ));
    }, [activeIndex, videos, fadeAnim]);

    const renderPaginationDots = useMemo(() => {
      return videos.map((_, index) => (
        <PaginationDot
          key={index}
          index={index}
          activeIndex={activeIndex}
          scrollX={scrollX}
        />
      ));
    }, [activeIndex, scrollX, videos]);

    const videoSlides = useMemo(() => {
      return videos.map((video, index) => {
        const shouldPlay = isPlaying && activeIndex === index && isFocused;
        const showThumbnail = shouldShowThumbnail || !shouldPlay;

        return (
          <View key={video.id || index}>
            <VideoSlide
              video={video}
              showThumbnail={showThumbnail}
              shouldPlay={shouldPlay}
              handleProgress={handleProgress}
            />
          </View>
        );
      });
    }, [
      videos,
      isPlaying,
      activeIndex,
      isFocused,
      shouldShowThumbnail,
      handleProgress,
    ]);

    return (
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          decelerationRate="fast">
          {videoSlides}
        </ScrollView>
        <SearchNormal1 color="white" style={styles.searchIcon} />

        <Animated.View style={styles.overlay}>
          <Animated.View
            style={[
              styles.tags,
              {
                opacity: fadeAnim,
                transform: [{translateY: slideAnim}],
              },
            ]}>
            {renderTags}
          </Animated.View>

          <Animated.View
            style={[
              styles.playButtonContainer,
              {
                transform: [{scale: playButtonScale}],
              },
            ]}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={handlePlayPress}>
              <Text style={styles.playButtonText}>Play</Text>
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.pagination}>{renderPaginationDots}</View>
        </Animated.View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    height: SCREEN_WIDTH * 1.5,
  },
  slide: {
    width: SCREEN_WIDTH,
    height: '100%',
  },
  thumbnail: {
    width: SCREEN_WIDTH,
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
    alignSelf: 'center',
  },
  tagContainer: {
    overflow: 'hidden',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  tag: {
    color: 'rgba(255,255,255,0.6)',
    overflow: 'hidden',
  },
  playButtonContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 8,
  },
  playButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  paginationDot: {
    height: 6,
    borderRadius: 20,
    width: 6,
    backgroundColor: '#FFFFFF',
  },
  searchIcon: {
    position: 'absolute',
    left: 35,
    top: 50,
  },
});

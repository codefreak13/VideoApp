import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {
  StyleSheet,
  SectionList,
  Text,
  FlatList,
  ActivityIndicator,
  View,
} from 'react-native';
import {VideoCarousel} from '../../components/VideoCarousel/VideoCarousel';
import {FeaturedCarousel} from '../../components/FeaturedCarousel/FeatureCarousel';
import {IFeaturedVideo} from '../../components/FeaturedCarousel/interface';
import {ISection, IVideo, Props} from './interface';
import {getVideoData} from '../../services/getFireStoreData';

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [featuredVideos, setFeaturedVideos] = useState<IFeaturedVideo[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const shuffleArray = useCallback((array: IFeaturedVideo[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  }, []);

  const sections: ISection[] = useMemo(
    () => [
      {
        title: 'Continue Watching',
        data: [{key: 'continueWatching', videos: featuredVideos}],
      },
      {
        title: 'Romance',
        data: [{key: 'romance', videos: shuffleArray(featuredVideos)}],
      },
      {
        title: 'Documentary',
        data: [{key: 'documentary', videos: shuffleArray(featuredVideos)}],
      },
    ],
    [featuredVideos, shuffleArray],
  );

  const handleProgress = useCallback((progress: {currentTime: number}) => {
    setCurrentTime(progress.currentTime);
  }, []);

  const onPlay = useCallback(
    (video: IFeaturedVideo) => {
      navigation.navigate('Shorts', {
        video,
        timestamp: currentTime,
      });
    },
    [currentTime, navigation],
  );

  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      const data = await getVideoData();
      if (data) {
        setFeaturedVideos(data);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const renderVideo = useCallback(
    ({item: video}: {item: IVideo}) => (
      <VideoCarousel id={video.id} title={video.title} uri={video.thumbnail} />
    ),
    [],
  );

  const renderSection = useCallback(
    ({item}: {item: {key: string; videos: IVideo[]}}) => (
      <FlatList
        data={item.videos}
        horizontal
        contentContainerStyle={styles.itemContainer}
        keyExtractor={video => video.id}
        renderItem={renderVideo}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={true}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={5}
      />
    ),
    [renderVideo],
  );

  const renderSectionHeader = useCallback(
    ({section}: {section: ISection}) => (
      <Text style={styles.sectionHeader}>{section.title}</Text>
    ),
    [],
  );

  const ListHeader = useMemo(
    () => (
      <FeaturedCarousel
        handleProgress={handleProgress}
        videos={featuredVideos}
        onPlay={onPlay}
      />
    ),
    [featuredVideos, handleProgress, onPlay],
  );

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <SectionList
      ListHeaderComponent={ListHeader}
      sections={sections}
      keyExtractor={item => item.key}
      renderItem={renderSection}
      renderSectionHeader={renderSectionHeader}
      contentContainerStyle={styles.container}
      removeClippedSubviews={true}
      initialNumToRender={2}
      maxToRenderPerBatch={2}
      windowSize={3}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  sectionHeader: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 40,
    color: '#FFF',
    marginStart: 16,
  },
  itemContainer: {
    alignItems: 'center',
    marginBottom: 16,
    marginStart: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

export default React.memo(HomeScreen);

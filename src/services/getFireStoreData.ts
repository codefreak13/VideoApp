import firestore from '@react-native-firebase/firestore';
import {IFeaturedVideo} from '../components/FeaturedCarousel/interface';

export const getVideoData = async (): Promise<IFeaturedVideo[] | null> => {
  try {
    const featuredDoc = await firestore()
      .collection('videos')
      .doc('featured')
      .get();

    if (!featuredDoc.exists) {
      console.warn('No featured videos found.');
      return null;
    }
    const data = featuredDoc.data();
    return data?.data || null;
  } catch (error) {
    console.error('Error fetching featured data:', error);
    return null;
  }
};

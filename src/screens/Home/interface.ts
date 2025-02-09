import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';
import {IFeaturedVideo} from '../../components/FeaturedCarousel/interface';

export type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export interface IVideo {
  id: string;
  thumbnail: string;
  title: string;
}

export interface ISection {
  title: string;
  data: Array<{
    key: string;
    videos: IFeaturedVideo[];
  }>;
}

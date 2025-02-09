import {IFeaturedVideo} from '../components/FeaturedCarousel/interface';

export type RootStackParamList = {
  Home: undefined;
  Shorts: {video: IFeaturedVideo; timestamp: number};
  Reward: undefined;
  Profile: undefined;
};

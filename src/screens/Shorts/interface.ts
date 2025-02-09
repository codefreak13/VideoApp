import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';

export type Props = NativeStackScreenProps<RootStackParamList, 'Shorts'>;

export interface IVideoProgress {
  [key: string]: number;
}

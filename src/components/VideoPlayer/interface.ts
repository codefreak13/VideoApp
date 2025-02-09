import {
  OnBufferData,
  OnLoadData,
  OnLoadStartData,
  OnProgressData,
  OnSeekData,
} from 'react-native-video';

export interface IVideoPlayerProps {
  videoUrl: string;
  thumbnail: string;
  isCurrentVideo: boolean;
  isFocused: boolean;
  initialTimestamp?: number;
  isFirstVideo: boolean;
  muted: boolean;
  onLoad?: (e: OnLoadData) => void;
  onLoadStart?: (e: OnLoadStartData) => void;
  onSeek?: (e: OnSeekData) => void;
  onProgress?: (e: OnProgressData) => void;
  onBuffer?: (e: OnBufferData) => void;
  isVideoLoaded: boolean;
  toggleVideoLoad: (status: boolean) => void;
}

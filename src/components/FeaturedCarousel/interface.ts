export interface IFeaturedVideo {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  tags: string[];
}

export interface IFeaturedCarouselProps {
  videos: IFeaturedVideo[];
  onPlay: (video: IFeaturedVideo) => void;
  handleProgress: (progress: {currentTime: number}) => void;
}

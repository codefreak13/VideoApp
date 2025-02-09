export interface IVideoControlsProps {
  showControls: boolean;
  muted: boolean;
  onMuteToggle: () => void;
}

export interface IVideoTagsProps {
  tags: string[];
}

export interface IVideoActionsProps {
  likes?: number;
  comments?: number;
  shares?: number;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
}

export interface IVideoOverlayProps {
  title: string;
  tags: string[];
  showControls: boolean;
  muted: boolean;
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
  onMuteToggle: () => void;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
}

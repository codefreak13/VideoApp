import React from 'react';
import {IconProps} from './interfaces';
import HomeSVG from './svg/home.svg';
import ShortsSVG from './svg/shorts.svg';
import RewardSVG from './svg/reward.svg';
import ProfileSVG from './svg/profile.svg';
import TagSVG from './svg/tag.svg';
import ShareSVG from './svg/share.svg';

export const HomeIcon: React.FC<IconProps> = function HomeIcon({
  color,
  size,
  opacity,
}) {
  return (
    <HomeSVG
      stroke={color}
      width={size || 16}
      height={size || 16}
      opacity={opacity || 1}
    />
  );
};

export const ShortsIcon: React.FC<IconProps> = function ShortsIcon({
  color,
  size,
  opacity,
}) {
  return (
    <ShortsSVG
      stroke={color}
      width={size || 16}
      height={size || 16}
      opacity={opacity || 1}
    />
  );
};

export const RewardIcon: React.FC<IconProps> = function RewardIcon({
  color,
  size,
  opacity,
}) {
  return (
    <RewardSVG
      stroke={color}
      width={size || 16}
      height={size || 16}
      opacity={opacity || 1}
    />
  );
};

export const ProfileIcon: React.FC<IconProps> = function ProfileIcon({
  color,
  size,
  opacity,
}) {
  return (
    <ProfileSVG
      stroke={color}
      width={size || 16}
      height={size || 16}
      opacity={opacity || 1}
    />
  );
};

export const TagIcon: React.FC<IconProps> = function TagIcon({
  color,
  size,
  opacity,
}) {
  return (
    <TagSVG
      stroke={color}
      width={size || 16}
      height={size || 16}
      opacity={opacity || 1}
    />
  );
};

export const ShareIcon: React.FC<IconProps> = function ShareIcon({
  color,
  size,
  opacity,
}) {
  return (
    <ShareSVG
      stroke={color}
      width={size || 16}
      height={size || 16}
      opacity={opacity || 1}
    />
  );
};

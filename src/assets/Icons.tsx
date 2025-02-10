import React from 'react';
import {IconProps} from './interfaces';
import TagSVG from './svg/tag.svg';
import ShareSVG from './svg/share.svg';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

export const HomeIcon: React.FC<IconProps> = function HomeIcon({
  color = '#999999',
  size = 16,
  opacity = 1,
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 19 20"
      fill="none"
      style={{opacity}}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.52212 5.89949C1.03495 6.27841 0.75 6.86102 0.75 7.4782V17.5C0.75 18.0305 0.960714 18.5392 1.33579 18.9142C1.71086 19.2893 2.21957 19.5 2.75 19.5H6.75V12.5C6.75 11.9477 7.19772 11.5 7.75 11.5H11.75C12.3023 11.5 12.75 11.9477 12.75 12.5V19.5H16.75C17.2804 19.5 17.7891 19.2893 18.1642 18.9142C18.5393 18.5392 18.75 18.0305 18.75 17.5V7.4782C18.75 6.86102 18.4651 6.27841 17.9779 5.89949L10.9779 0.455049C10.2557 -0.106679 9.24434 -0.10668 8.52212 0.455047L1.52212 5.89949Z"
        fill={color}
      />
    </Svg>
  );
};

export const ShortsIcon: React.FC<IconProps> = function ShortsIcon({
  color = '#999999',
  size = 16,
  opacity = 1,
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill="none"
      style={{opacity}}>
      <G clipPath="url(#clip0_13_926)">
        <Rect
          x="5.375"
          y="2.5"
          width="14"
          height="20"
          rx="2"
          stroke={color}
          strokeWidth="2"
        />
        <Path
          d="M2.875 4.5V4.5C2.04657 4.5 1.375 5.17157 1.375 6V19C1.375 19.8284 2.04657 20.5 2.875 20.5V20.5"
          stroke={color}
          strokeWidth="2"
        />
        <Path
          d="M21.875 4.5V4.5C22.7034 4.5 23.375 5.17157 23.375 6V19C23.375 19.8284 22.7034 20.5 21.875 20.5V20.5"
          stroke={color}
          strokeWidth="2"
        />
        <Path
          d="M9.875 10.241C9.875 9.46925 10.7122 8.98838 11.3789 9.37726L14.3942 11.1362C15.0557 11.5221 15.0557 12.4779 14.3942 12.8638L11.3789 14.6227C10.7122 15.0116 9.875 14.5308 9.875 13.759V10.241Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_13_926">
          <Rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.375 0.5)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export const RewardIcon: React.FC<IconProps> = function RewardIcon({
  color = '#999999',
  size = 16,
  opacity = 1,
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill="none"
      style={{opacity}}>
      <Path
        d="M20.625 12.5V22.5H4.625V12.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22.625 7.5H2.625V12.5H22.625V7.5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.625 22.5V7.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.625 7.5H8.125C7.46196 7.5 6.82607 7.23661 6.35723 6.76777C5.88839 6.29893 5.625 5.66304 5.625 5C5.625 4.33696 5.88839 3.70107 6.35723 3.23223C6.82607 2.76339 7.46196 2.5 8.125 2.5C11.625 2.5 12.625 7.5 12.625 7.5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.625 7.5H17.125C17.788 7.5 18.4239 7.23661 18.8928 6.76777C19.3616 6.29893 19.625 5.66304 19.625 5C19.625 4.33696 19.3616 3.70107 18.8928 3.23223C18.4239 2.76339 17.788 2.5 17.125 2.5C13.625 2.5 12.625 7.5 12.625 7.5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const ProfileIcon: React.FC<IconProps> = function ProfileIcon({
  color = '#999999',
  size = 16,
  opacity = 1,
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill="none"
      style={{opacity}}>
      <Path
        d="M20.875 21.5V19.5C20.875 18.4391 20.4536 17.4217 19.7034 16.6716C18.9533 15.9214 17.9359 15.5 16.875 15.5H8.875C7.81413 15.5 6.79672 15.9214 6.04657 16.6716C5.29643 17.4217 4.875 18.4391 4.875 19.5V21.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.875 11.5C15.0841 11.5 16.875 9.70914 16.875 7.5C16.875 5.29086 15.0841 3.5 12.875 3.5C10.6659 3.5 8.875 5.29086 8.875 7.5C8.875 9.70914 10.6659 11.5 12.875 11.5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
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

import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {VolumeHigh, VolumeCross, Heart} from 'iconsax-react-native';
import {
  IVideoControlsProps,
  IVideoTagsProps,
  IVideoActionsProps,
  IVideoOverlayProps,
} from './interface';
import {ShareIcon, TagIcon} from '../../assets/Icons';

export const VideoControls = React.memo(
  ({showControls, muted, onMuteToggle}: IVideoControlsProps) => (
    <>
      {showControls && (
        <TouchableOpacity style={styles.muteButton} onPress={onMuteToggle}>
          {muted ? (
            <VolumeCross size={20} color="#fff" variant="Bold" />
          ) : (
            <VolumeHigh size={20} color="#fff" variant="Bold" />
          )}
        </TouchableOpacity>
      )}
    </>
  ),
);

export const VideoTags = React.memo(({tags}: IVideoTagsProps) => (
  <View style={styles.tagContainer}>
    {tags.map((tag, index) => (
      <Text key={index} style={styles.tag}>
        #{tag}
      </Text>
    ))}
  </View>
));

export const VideoActions = React.memo(
  ({
    likes = 0,
    comments = 0,
    shares = 0,
    onLike,
    onComment,
    onShare,
  }: IVideoActionsProps) => (
    <View style={styles.rightSection}>
      <TouchableOpacity style={styles.iconButton} onPress={onLike}>
        <Heart size={30} color="#fff" variant="Bold" />
        <Text style={styles.iconText}>{`${likes}K`}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconButton} onPress={onComment}>
        <TagIcon size={20} color="#fff" />
        <Text style={styles.iconText}>{comments}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconButton} onPress={onShare}>
        <ShareIcon size={20} color="#fff" />
        <Text style={styles.iconText}>{shares}</Text>
      </TouchableOpacity>
    </View>
  ),
);

const VideoOverlay = React.memo(
  ({
    title,
    tags,
    showControls,
    muted,
    stats,
    onMuteToggle,
    onLike,
    onComment,
    onShare,
  }: IVideoOverlayProps) => {
    return (
      <View style={styles.overlay}>
        <VideoControls
          showControls={showControls}
          muted={muted}
          onMuteToggle={onMuteToggle}
        />

        <View style={styles.bottomSection}>
          <View style={styles.bottomLeftSection}>
            <Text style={styles.title}>{title}</Text>
            <VideoTags tags={tags} />
          </View>

          <VideoActions
            likes={stats.likes}
            comments={stats.comments}
            shares={stats.shares}
            onLike={onLike}
            onComment={onComment}
            onShare={onShare}
          />
        </View>
        <View style={styles.bottomNav} />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
    marginBottom: 50,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  bottomLeftSection: {
    flex: 1,
    marginRight: 20,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 2,
  },
  tag: {
    color: '#fff',
    fontSize: 14,
    marginRight: 8,
    marginBottom: 4,
  },
  rightSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  muteButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -20}, {translateY: -20}],
    padding: 20,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 20,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
  },
});

export default VideoOverlay;

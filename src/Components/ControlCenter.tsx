import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import {playBackService} from '../../musicPlayerService';

const ControlCenter = () => {
  const playbackState = usePlaybackState();

  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  const togglePlayback = async (playback: State) => {
    const currentTrack = await TrackPlayer.getActiveTrack();

    if (currentTrack !== null) {
      if (playback === State.Paused || playback === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={skipToPrevious}>
        <Icon style={styles.icon} name="skip-previos" size={40} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => togglePlayback(playbackState)}>
        <Icon
          style={styles.icon}
          // name={playbackState === State.Playing ? 'pause' : 'play-arrow'}
          name="pause"
          size={75}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={skipToNext}>
        <Icon style={styles.icon} name="skip-next" size={40} />
      </TouchableOpacity>
    </View>
  );
};

export default ControlCenter;

const styles = StyleSheet.create({
  container: {
    marginBottom: 56,

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#FFFFFF',
  },
  playButton: {
    marginHorizontal: 24,
  },
});

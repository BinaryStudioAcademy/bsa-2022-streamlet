import Hls, { Level, LevelsUpdatedData, LevelSwitchedData } from 'hls.js';
import React, { FC, useEffect, useState } from 'react';
import { GenericSettingsModal } from '../generic-settings-modal/generic-settings-modal';
import { ModalItem } from '../modal-item/modal-item';
import { ReactComponent as BackArrow } from 'assets/img/back-arrow.svg';
import styles from '../header-styles.module.scss';

type Props = {
  className?: string;
  goBack: () => void;
  hlsClient: Hls | null;
  videoContainer: HTMLVideoElement;
  setLevelName: (level: string) => void;
};

type BasicLevel = {
  name: string | undefined;
  width: number;
  height: number;
  bitrate: number;
};

const levelToBasicLevel = (level: Level): BasicLevel => ({
  name: level.name,
  width: level.width,
  height: level.height,
  bitrate: level.bitrate,
});

type LevelRepresentation = { name: string; index: number | null };
const levelToString = (level: BasicLevel, otherLevelNames: LevelRepresentation[]): LevelRepresentation => {
  const name = level.name || `${level.height}p`;
  const lastDuplicate = otherLevelNames
    .slice()
    .reverse()
    .find((otherLevel) => otherLevel.name === name);
  if (lastDuplicate) {
    if (lastDuplicate.index === null) {
      lastDuplicate.index = 1;
    }
    return { name, index: lastDuplicate.index + 1 };
  }
  return { name, index: null };
};

// the thing on iOS, safari is the following:
// it doesn't support hls
// according to my research, you can't see available resolutions, nor have
// you any api to set one
// one way to bypass it, is to just replace url

const isResolutionAuto = (src: string): boolean => {
  return src.includes('master');
};

const getCurrentResolution = (src: string): string => {
  if (isResolutionAuto(src)) {
    return 'auto';
  }
  const firstIndex = src.lastIndexOf('-') + 1;
  const lastIndex = src.lastIndexOf('p') + 1;
  return src.slice(firstIndex, lastIndex);
};

type ManualLevel = {
  name: string;
  src: string;
};

// bonus point if later rewritten to ask this from back
const getResolutions = (): Record<string, ManualLevel> => {
  return {
    'auto': {
      name: 'Auto',
      src: 'master.m3u8',
    },
    '360p': {
      name: '360p',
      src: 'playlist-360p30.m3u8',
    },
    '480p': {
      name: '480p',
      src: 'playlist-480p30.m3u8',
    },
    '720p': {
      name: '720p',
      src: 'playlist-720p30.m3u8',
    },
  };
};

const QualitySelector: FC<Props> = ({ className, goBack, hlsClient, setLevelName, videoContainer }) => {
  //iOS
  const [baseSrc] = useState(videoContainer.src.substring(0, videoContainer.src.lastIndexOf('/')));
  const [isAuto, setIsAuto] = useState(hlsClient?.autoLevelEnabled ?? isResolutionAuto(videoContainer.src));
  const [currentLevel, setCurrentLevel] = useState<number | null>(hlsClient?.currentLevel ?? null);
  // iOS
  const [currentResolution, setCurrentResolution] = useState<string>(getCurrentResolution(videoContainer.src));
  const [levels, setLevels] = useState<BasicLevel[] | null>(hlsClient?.levels?.map(levelToBasicLevel) ?? null);
  // iOS
  const [manualLevels] = useState<Record<string, ManualLevel>>(getResolutions());

  useEffect(() => {
    if (!hlsClient) {
      return;
    }
    const handleCurrentLevelChange = (_: unknown, data: LevelSwitchedData): void => {
      setCurrentLevel(data.level);
    };

    const handleLevelsUpdated = (_: unknown, data: LevelsUpdatedData): void => {
      setLevels(data.levels.map(levelToBasicLevel));
    };

    hlsClient.on(Hls.Events.LEVEL_SWITCHING, handleCurrentLevelChange);
    hlsClient.on(Hls.Events.LEVELS_UPDATED, handleLevelsUpdated);

    return (): void => {
      hlsClient.off(Hls.Events.LEVEL_SWITCHING, handleCurrentLevelChange);
      hlsClient.off(Hls.Events.LEVELS_UPDATED, handleLevelsUpdated);
    };
  }, [hlsClient]);

  const allLevelRepresentations: LevelRepresentation[] | null = levels ? [] : null;
  if (levels) {
    levels.forEach((level) => {
      const levelRepr = levelToString(level, allLevelRepresentations as LevelRepresentation[]);
      (allLevelRepresentations as LevelRepresentation[]).push(levelRepr);
    });
  }

  useEffect(() => {
    if (isAuto) {
      setLevelName('Auto');
    } else if (levels && currentLevel !== null && levels[currentLevel] !== undefined) {
      setLevelName(levelToString(levels[currentLevel], []).name);
    } else {
      setLevelName(currentResolution);
    }
  }, [currentLevel, isAuto, levels, setLevelName, currentResolution]);

  const manuallySetLevel = (levelKey: string): void => {
    // dont forget to save time, as changing src resets it
    const currentVideoTime = videoContainer.currentTime;
    videoContainer.src = `${baseSrc}/${manualLevels[levelKey].src}`;
    videoContainer.currentTime = currentVideoTime;
  };

  return (
    <GenericSettingsModal className={className}>
      <ModalItem isHeader onClick={goBack} contentContainerClassName={styles['header']}>
        <BackArrow height={15} />
        <span className={styles['header-text']}> Select quality</span>
      </ModalItem>
      <ModalItem
        isSelectable
        isSelected={isAuto}
        onClick={(): void => {
          if (hlsClient) {
            hlsClient.currentLevel = -1;
          } else {
            setCurrentResolution('auto');
            manuallySetLevel('auto');
          }
          setIsAuto(true);
        }}
      >
        Auto
      </ModalItem>
      {levels &&
        allLevelRepresentations &&
        hlsClient &&
        levels.map((level, index) => {
          const levelName =
            allLevelRepresentations[index].name +
            (allLevelRepresentations[index].index === null ? '' : ` (${allLevelRepresentations[index].index})`);
          return (
            <ModalItem
              key={levelName}
              isSelectable
              isSelected={index === currentLevel && !isAuto}
              onClick={(): void => {
                hlsClient.currentLevel = index;
                setIsAuto(false);
              }}
            >
              {levelName}
            </ModalItem>
          );
        })}
      {!levels &&
        Object.entries(manualLevels).map(([key, level]) => {
          if (key === 'auto') {
            // already rendered above
            return null;
          }
          const levelName = level.name;
          return (
            <ModalItem
              key={levelName}
              isSelectable
              isSelected={currentResolution === key}
              onClick={(): void => {
                setCurrentResolution(key);
                setIsAuto(false);
                manuallySetLevel(key);
              }}
            >
              {levelName}
            </ModalItem>
          );
        })}
    </GenericSettingsModal>
  );
};

export { QualitySelector };

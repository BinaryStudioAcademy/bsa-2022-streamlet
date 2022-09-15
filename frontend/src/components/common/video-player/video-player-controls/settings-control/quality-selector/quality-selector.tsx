import Hls, { Level, LevelsUpdatedData, LevelSwitchedData } from 'hls.js';
import React, { FC, useEffect, useState } from 'react';
import { GenericSettingsModal } from '../generic-settings-modal/generic-settings-modal';
import { ModalItem } from '../modal-item/modal-item';
import { ReactComponent as BackArrow } from 'assets/img/back-arrow.svg';
import styles from '../header-styles.module.scss';

type Props = {
  className?: string;
  goBack: () => void;
  hlsClient: Hls;
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

const QualitySelector: FC<Props> = ({ className, goBack, hlsClient, setLevelName }) => {
  const [isAuto, setIsAuto] = useState(hlsClient.autoLevelEnabled);
  const [currentLevel, setCurrentLevel] = useState<number>(hlsClient.currentLevel);
  const [levels, setLevels] = useState<BasicLevel[]>(hlsClient.levels.map(levelToBasicLevel));

  useEffect(() => {
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

  const allLevelRepresentations: LevelRepresentation[] = [];
  levels.forEach((level) => {
    const levelRepr = levelToString(level, allLevelRepresentations);
    allLevelRepresentations.push(levelRepr);
  });

  useEffect(() => {
    if (isAuto || levels[currentLevel]) {
      setLevelName(isAuto ? 'Auto' : levelToString(levels[currentLevel], []).name);
    }
  }, [currentLevel, isAuto, levels, setLevelName]);

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
          hlsClient.currentLevel = -1;
          setIsAuto(true);
        }}
      >
        Auto
      </ModalItem>
      {levels.map((level, index) => {
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
    </GenericSettingsModal>
  );
};

export { QualitySelector };

import React, { FC, ReactNode, useRef, useState } from 'react';
import { Header } from './header/header';
import styles from './styles.module.scss';
import { ReactComponent as Left } from 'assets/img/arrow-circle-left.svg';
import { ReactComponent as Right } from 'assets/img/arrow-circle-right.svg';
import clsx from 'clsx';
import { DataStatus } from '../../../../../common/enums/app/data-status.enum';
import { generateBrowsePageSkeleton } from '../../../../browse-page/common/skeleton';

type Props = {
  children: ReactNode;
  title: string;
  dataStatus: DataStatus;
  isLightTheme: boolean;
};

const VIDEO_GAP = 20;

const SCROLL_TIMEOUT_MS = 50;
let lastEventFire = 0;

const VideosList: FC<Props> = ({ children, title, dataStatus, isLightTheme }) => {
  const videoListRef = useRef<HTMLDivElement | null>(null);
  const [hasScroll, setHasScroll] = useState(false);
  const [hasLeftScroll, setHasLeftScroll] = useState(true);
  const [hasRightScroll, setHasRightScroll] = useState(true);

  const calculateLastVideoVisibleInGrid = (): Element | null => {
    if (!videoListRef.current) {
      return null;
    }
    const containerRect = videoListRef.current.getBoundingClientRect();
    let prevElem: Element | null = null;
    for (const child of videoListRef.current.children) {
      const childRect = child.getBoundingClientRect();
      const childEnd = childRect.x + childRect.width;
      if (childEnd > containerRect.x + containerRect.width) {
        return prevElem;
      }
      prevElem = child;
    }
    return null;
  };

  const calculateFirstVideoVisibleInGrid = (): Element | null => {
    if (!videoListRef.current) {
      return null;
    }
    const containerRect = videoListRef.current.getBoundingClientRect();
    for (const child of videoListRef.current.children) {
      const childRect = child.getBoundingClientRect();
      if (childRect.x >= containerRect.x) {
        return child;
      }
    }
    return null;
  };

  return (
    <div className={styles['block-container']}>
      <div className={styles['header-container']}>
        <Header title={title} className={styles['header']} />
        {hasScroll && (
          <div className={styles['arrows-container']}>
            <Left
              height={25}
              width={25}
              className={clsx(styles['arrow'], hasLeftScroll || styles['arrow-disabled'])}
              color="var(--brand-green-color)"
              onClick={(): void => {
                const firstVisibleElemRect = calculateFirstVideoVisibleInGrid()?.getBoundingClientRect();
                const containerRect = videoListRef.current?.getBoundingClientRect();

                if (!firstVisibleElemRect || !containerRect || !videoListRef.current) {
                  return;
                }

                videoListRef.current?.scrollBy(
                  firstVisibleElemRect.x - containerRect.x - containerRect.width - VIDEO_GAP,
                  0,
                );
              }}
            />
            <Right
              height={25}
              width={25}
              className={clsx(styles['arrow'], hasRightScroll || styles['arrow-disabled'])}
              color="var(--brand-green-color)"
              onClick={(): void => {
                const lastVisibleElemRect = calculateLastVideoVisibleInGrid()?.getBoundingClientRect();
                const containerRect = videoListRef.current?.getBoundingClientRect();

                if (!lastVisibleElemRect || !containerRect || !videoListRef.current) {
                  return;
                }

                videoListRef.current?.scrollBy(
                  lastVisibleElemRect.x + lastVisibleElemRect.width - containerRect.x + VIDEO_GAP,
                  0,
                );
              }}
            />
          </div>
        )}
      </div>
      <div
        className={styles['videos-container']}
        ref={(elem): void => {
          videoListRef.current = elem;
          if (!videoListRef.current) {
            return;
          }

          setHasScroll(videoListRef.current.scrollWidth > videoListRef.current.clientWidth);
          setHasLeftScroll(videoListRef.current.scrollLeft > 0);
          setHasRightScroll(
            videoListRef.current.scrollLeft + videoListRef.current.clientWidth < videoListRef.current.scrollWidth,
          );
        }}
        onScroll={(e): void => {
          const currentTarget = e.currentTarget;
          if (Date.now() - lastEventFire >= SCROLL_TIMEOUT_MS) {
            lastEventFire = Date.now();
            setHasScroll(currentTarget.scrollWidth > currentTarget.clientWidth);
            setHasLeftScroll(currentTarget.scrollLeft > 0);
            setHasRightScroll(currentTarget.scrollLeft + currentTarget.clientWidth < currentTarget.scrollWidth);
          }
        }}
      >
        {dataStatus === DataStatus.PENDING ? generateBrowsePageSkeleton(isLightTheme) : children}
      </div>
    </div>
  );
};

export { VideosList };

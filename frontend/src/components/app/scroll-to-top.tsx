import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type Props = {
  elements?: HTMLElement[];
  querySelectors?: string[];
};

export const ScrollToTop: FC<Props> = ({ elements, querySelectors }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (elements) {
      elements.forEach((element) => {
        element.scrollTo(0, 0);
      });
    }
  }, [elements, pathname]);

  useEffect(() => {
    if (querySelectors) {
      querySelectors.forEach((querySelector) => {
        document.querySelectorAll(querySelector).forEach((item) => {
          item.scrollTo(0, 0);
        });
      });
    }
  }, [querySelectors, pathname]);

  return null;
};

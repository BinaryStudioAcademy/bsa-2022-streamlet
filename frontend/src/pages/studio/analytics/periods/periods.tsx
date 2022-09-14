import { FC } from 'common/types/types';
import { useState } from 'hooks/hooks';
import { ChangeEvent } from 'react';

import styles from './styles.module.scss';

type Props = {
  onChange: (value: string) => void;
};

export const Periods: FC<Props> = ({ onChange }) => {
  const options = [
    { label: 'Last 7 days', value: '7' },
    { label: 'Last 30 days', value: '30' },
    { label: 'Last 90 days', value: '90' },
    { label: 'Last 365 days', value: '365' },
  ];

  const [value, setValue] = useState('Last 7 days');

  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className={styles['blocks']}>
      <select className={styles['block']} value={value} onChange={handleChange}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

{
  /* <details class="custom-select">
  <summary class="radios">
    <input type="radio" name="item" id="default" title="Auswählen..." checked>
    <input type="radio" name="item" id="item1" title="Item 1">
    <input type="radio" name="item" id="item2" title="Item 2">
    <input type="radio" name="item" id="item3" title="Item 3">
    <input type="radio" name="item" id="item4" title="Item 4">
    <input type="radio" name="item" id="item5" title="Item 5">
  </summary>
  <ul class="list">
    <li>
      <label for="item1">
        Item 1
        <span></span>
      </label>
    </li>
    <li>
      <label for="item2">Item 2</label>
    </li>
    <li>
      <label for="item3">Item 3</label>
    </li>
    <li>
      <label for="item4">Item 4</label>
    </li>
    <li>
      <label for="item5">Item 5</label>
    </li>
  </ul>
</details>
https://www.sliderrevolution.com/resources/css-select-styles/
*/
}

import { FC, useState } from 'react';
import styles from './styles.module.scss';

interface ToggleSwitchProps {
  defaultValue: boolean;
  onToggle: (isOn: boolean) => void;
}

export const ToggleSwitch: FC<ToggleSwitchProps> = ({ onToggle, defaultValue }) => {
  const [checked, setChecked] = useState(defaultValue);
  const handleChange = (): void => {
    setChecked(!checked);

    onToggle(!checked);
  };

  return (
    <div onClick={handleChange}>
      <label className={styles[checked ? 'toggle-switch-label-checked' : 'toggle-switch-label']} htmlFor="toggleSwitch">
        <div className={styles[checked ? 'slider-checked' : 'slider']} />
      </label>
    </div>
  );
};

import { FC, useState } from 'react';
import styles from './styles.module.scss';

interface ToggleSwitchProps {
  defaultValue: boolean;
  onToggle: () => void;
}

export const ToggleSwitch: FC<ToggleSwitchProps> = ({ onToggle, defaultValue }) => {
  const [checked, setChecked] = useState(defaultValue);
  const handleChange = (): void => {
    setChecked(!checked);
    onToggle();
  };

  return (
    <div className={styles['toggle-switch']} onClick={handleChange}>
      <label className={styles['toggle-switch-label']} htmlFor="toggleSwitch">
        <div className={styles[checked ? 'slider-checked' : 'slider']} />
      </label>
    </div>
  );
};

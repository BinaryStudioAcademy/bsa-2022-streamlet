import { SelectOptions } from 'common/types/types';
import { StylesConfig } from 'react-select';

export const customSelectStyles: StylesConfig<SelectOptions, true> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'var(--stream-settings-modal-bg)',
    borderRadius: 0,
    boxShadow: state.isFocused ? '0 0 0 1px var(--brand-green-color)' : 'unset',
    borderColor: state.isFocused ? 'var(--brand-green-color)' : 'transparent',
  }),

  input: (provided) => ({
    ...provided,
    color: 'var(--white-text-color)',
  }),

  menu: (provided) => ({
    ...provided,
    backgroundColor: 'var(--stream-settings-modal-bg)',
    borderRadius: 0,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'var(--stream-select-item-hover-bg)' : 'unset',
    '&:hover': {
      backgroundColor: 'var(--stream-select-item-hover-bg)',
    },
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'var(--text-gray-color)',
  }),
};

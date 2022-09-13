import { SelectOptions } from 'common/types/types';
import { StylesConfig } from 'react-select';

export const customSelectStyles: StylesConfig<SelectOptions, true> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'var(--studio-input)',
    minHeight: '45px',
    boxShadow: state.isFocused ? '0 0 0 1px var(--brand-green-color)' : 'unset',
    borderColor: state.isFocused ? 'var(--brand-green-color)' : 'transparent',
    borderRadius: '2px',
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
    color: 'white',
    backgroundColor: state.isFocused ? 'var(--studio-input)' : 'unset',
    '&:hover': {
      backgroundColor: 'var(--stream-select-item-hover-bg)',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'white',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: 'var(--brand-green-color)',
    padding: '0 0 0 5px',
    marginRight: '5px',
  }),

  multiValueLabel: (provided) => ({
    ...provided,
    color: 'var(--white-text-color)',
    padding: '0 5px',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'var(--white-text-color)',
  }),
};

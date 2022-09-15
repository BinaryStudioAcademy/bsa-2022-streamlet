import { Input } from 'components/common/common';
import React, { FC, ReactElement, useId } from 'react';
import { StreamSettingsFormValues } from './stream-settings-form-values';
import Select from 'react-select';
import { FormControl, SelectOptions } from 'common/types/types';
import Creatable from 'react-select/creatable';
import { Controller, DeepRequired, FieldErrorsImpl, FieldValues } from 'react-hook-form';
import styles from '../styles.module.scss';
import clsx from 'clsx';
import { customSelectStyles } from '../custom-select-styles';
import { AreaInput } from 'components/common/input/area-input/area-input';

type Props = {
  categoryOptions: SelectOptions[];
  control: FormControl<StreamSettingsFormValues>;
  errors: FieldErrorsImpl<DeepRequired<FieldValues>>;
};

const StreamBasicInfoForm: FC<Props> = ({ categoryOptions, control, errors }) => {
  const catSelectId = useId();
  const tagSelectId = useId();

  return (
    <div className={clsx(styles['form'], styles['basic-info-wrapper'])}>
      <Input
        control={control}
        errors={errors}
        inputClassName={styles['input']}
        label="Title"
        name="name"
        labelClassName={styles['label']}
        placeholder="Give it a catchy name"
      />
      <AreaInput
        control={control}
        inputClassName={styles['area-input']}
        label="Description"
        name="description"
        labelClassName={styles['label']}
        placeholder="Tell what your stream is about"
      />
      <div className={clsx(styles['input-wrapper'])}>
        <label className={clsx(styles.label)} htmlFor="categories">
          <span>Select a category</span>
        </label>
        <Controller
          control={control}
          defaultValue={[]}
          name="categories"
          render={({ field: { ref, onChange, value } }): ReactElement => (
            <div>
              <Select
                isMulti
                ref={ref}
                options={categoryOptions}
                value={value}
                onChange={onChange}
                className={styles['select-input']}
                styles={customSelectStyles}
                inputId={catSelectId}
              />
            </div>
          )}
        />
      </div>

      <Controller
        control={control}
        defaultValue={[]}
        name="tags"
        render={({ field: { ref, onChange, value } }): ReactElement => (
          <div className={styles['input-wrapper']}>
            <label className={styles['label']} htmlFor={tagSelectId}>
              Add a couple of tags
            </label>
            <Creatable
              isMulti
              onChange={onChange}
              value={value}
              ref={ref}
              className={styles['select-input']}
              styles={customSelectStyles}
              inputId={tagSelectId}
            />
          </div>
        )}
      />
    </div>
  );
};

export { StreamBasicInfoForm };

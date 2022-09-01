import { Button, Input, Textarea } from 'components/common/common';
import { DatetimeInput } from 'components/common/input/datetime-input/datetime-input';
import { useAppForm } from 'hooks/hooks';
import React, { FC, ReactElement, useId, useState } from 'react';
import { StreamEditFormValues } from './stream-edit-form-values';
import Select from 'react-select';
import { SelectOptions } from 'pages/studio/stream/common/stream-settings-form-values';
import Creatable from 'react-select/creatable';
import { Controller } from 'react-hook-form';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { customSelectStyles } from './custom-select-styles';

type Props = {
  initialValues: StreamEditFormValues;
  onSubmit: (formData: StreamEditFormValues) => void;
  categoryOptions: SelectOptions<string>[];
};

const StreamEditForm: FC<Props> = ({ initialValues, onSubmit, categoryOptions }) => {
  const [isDescriptionInFocus, setIsDescriptionInFocus] = useState(false);
  const { handleSubmit, control, errors } = useAppForm<StreamEditFormValues>({ defaultValues: initialValues });

  const catSelectId = useId();
  const tagSelectId = useId();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
      <div className={styles['header']}>
        <h1 className={styles['heading']}>Stream settings</h1>
      </div>
      <Input
        control={control}
        errors={errors}
        inputClassName={styles['input']}
        label="Title"
        name="name"
        labelClassName={styles['label']}
        placeholder="Give it a catchy name"
      />
      <Textarea
        control={control}
        wrapperClassName={styles['desc-input-wrapper']}
        inputClassName={clsx(
          {
            [styles['desc-input-in-focus']]: isDescriptionInFocus,
          },
          styles['desc-input'],
        )}
        errors={errors}
        label="Description"
        labelClassName={styles['label']}
        name="description"
        placeholder={'Tell what your stream is about'}
        onFocus={(): void => {
          setIsDescriptionInFocus(true);
        }}
        onBlur={(): void => {
          setIsDescriptionInFocus(false);
        }}
      />
      <DatetimeInput
        control={control}
        name="scheduledStreamDate"
        label="Scheduled date"
        labelClassName={styles['label']}
        inputClassName={styles['input']}
      />
      <Controller
        control={control}
        defaultValue={[]}
        name="categories"
        render={({ field: { ref, onChange, value } }): ReactElement => (
          <div>
            <label className={styles['label']} htmlFor={catSelectId}>
              Select a category
            </label>
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
      <Controller
        control={control}
        defaultValue={[]}
        name="tags"
        render={({ field: { ref, onChange, value } }): ReactElement => (
          <div>
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
      <Button content="Save" type="submit" className={styles['submit-btn']} />
    </form>
  );
};

export { StreamEditForm };

import { Button, Input, Textarea } from 'components/common/common';
import { DatetimeInput } from 'components/common/input/datetime-input/datetime-input';
import { useAppForm } from 'hooks/hooks';
import React, { FC, ReactElement, useState } from 'react';
import { StreamEditFormValues } from './stream-edit-form-values';
import Select from 'react-select';
import { SelectOptions } from 'pages/studio/stream/common/stream-settings-form-values';
import Creatable from 'react-select/creatable';
import { Controller } from 'react-hook-form';
import styles from './styles.module.scss';
import clsx from 'clsx';

type Props = {
  initialValues: StreamEditFormValues;
  onSubmit: (formData: StreamEditFormValues) => void;
  categoryOptions: SelectOptions<string>[];
};

const StreamEditForm: FC<Props> = ({ initialValues, onSubmit, categoryOptions }) => {
  const [isDescriptionInFocus, setIsDescriptionInFocus] = useState(false);
  const { handleSubmit, control, errors } = useAppForm<StreamEditFormValues>({ defaultValues: initialValues });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input control={control} errors={errors} label="Title" name="name" />
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
        name="description"
        placeholder={'Describe what your is about stream'}
        onFocus={(): void => {
          setIsDescriptionInFocus(true);
        }}
        onBlur={(): void => {
          setIsDescriptionInFocus(false);
        }}
      />
      <Textarea control={control} errors={errors} label="Description" name="description" />
      <DatetimeInput control={control} name="scheduledStreamDate" label="Scheduled date" />
      <Controller
        control={control}
        defaultValue={[]}
        name="categories"
        render={({ field: { ref, onChange, value } }): ReactElement => (
          <Select isMulti ref={ref} options={categoryOptions} value={value} onChange={onChange} />
        )}
      />
      <Controller
        control={control}
        defaultValue={[]}
        name="tags"
        render={({ field: { ref, onChange, value } }): ReactElement => (
          <Creatable isMulti onChange={onChange} value={value} ref={ref} />
        )}
      />
      <Button content="Save" type="submit" />
    </form>
  );
};

export { StreamEditForm };

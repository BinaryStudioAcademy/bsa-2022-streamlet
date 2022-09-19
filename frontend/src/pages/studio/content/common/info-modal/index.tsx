import { Input, Modal } from 'components/common/common';
import { AreaInput } from 'components/common/input/area-input/area-input';
import { useAppForm } from 'hooks/hooks';
import { FC } from 'react';
import { videoUpdateValidationSchema } from 'validation-schemas/validation-schemas';
import style from './styles.module.scss';

type InfoModalProps = {
  id: string;
  title: string;
  description: string;
  onOk: (formValues: InfoFormValues) => void;
  onCancel: () => void;
  isOpen: boolean;
};

export interface InfoFormValues {
  title: string;
  description: string;
}

export const InfoModal: FC<InfoModalProps> = ({ title, description, onOk, onCancel, isOpen }) => {
  const { control, errors, getValues, isValid, reset } = useAppForm<InfoFormValues>({
    defaultValues: { title, description },
    validationSchema: videoUpdateValidationSchema,
    mode: 'onChange',
  });
  return (
    <Modal isOpen={isOpen} onClose={onCancel} contentContainerClassName={style['modal']} isNeedCloseButton={false}>
      <div className={style['content-container']}>
        <div className={style['form-container']}>
          <Input
            control={control}
            errors={errors}
            name="title"
            label="Name"
            inputClassName={style['input']}
            inputErrorClassName={style['input-error']}
            labelClassName={style['label']}
            errorBlockClassName={style['error']}
            wrapperClassName={style['form-input']}
            placeholder={'Enter video name...'}
          />
          <AreaInput
            control={control}
            name="description"
            label="Description"
            inputClassName={style['text-area']}
            labelClassName={style['label']}
            wrapperClassName={style['form-input']}
            placeholder={'What is your video about?...'}
          />
        </div>
        <div className={style['button-container']}>
          <button
            type="button"
            onClick={(): void => {
              reset();
              onCancel();
            }}
            className={style['button']}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={(): void => {
              if (isValid) {
                onOk(getValues());
              }
            }}
            className={style['button']}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

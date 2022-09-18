import { Input, Modal, Textarea } from 'components/common/common';
import { useAppForm } from 'hooks/hooks';
import { FC } from 'react';
import { channelUpdateValidationSchema } from 'validation-schemas/validation-schemas';
import style from './styles.module.scss';

type InfoModalProps = {
  id: string;
  name: string;
  description: string;
  onOk: (formValues: InfoFormValues) => void;
  onCancel: () => void;
  isOpen: boolean;
};

export interface InfoFormValues {
  name: string;
  description: string;
}

export const InfoModal: FC<InfoModalProps> = ({ name, description, onOk, onCancel, isOpen }) => {
  const { control, errors, getValues, isValid, reset } = useAppForm<InfoFormValues>({
    defaultValues: { name, description },
    validationSchema: channelUpdateValidationSchema,
    mode: 'onChange',
  });
  return (
    <Modal isOpen={isOpen} onClose={onCancel} isNeedCloseButton={false}>
      <div className={style['content-container']}>
        <div className={style['form-container']}>
          <Input
            control={control}
            errors={errors}
            name="name"
            label="Name"
            inputClassName={style['input']}
            inputErrorClassName={style['input-error']}
            labelClassName={style['label']}
            errorBlockClassName={style['error']}
            wrapperClassName={style['form-input']}
            placeholder={'Enter video name...'}
          />
          <Textarea
            control={control}
            errors={errors}
            name="description"
            label="Description"
            inputClassName={style['text-area']}
            inputErrorClassName={style['input-error']}
            labelClassName={style['label']}
            errorBlockClassName={style['error']}
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

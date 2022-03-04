import { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, TextField } from '@mui/material';
import { Button } from 'common/components';
import { ConnectFarmProps, DefaultValues } from './ConnectFarm.types';
import { ButtonVariant } from 'common/components/Button/Button.types';
import { ButtonColor } from 'common/components/Button/Button.types';
import styles from './ConnectFarm.styles';

const defaultValues: DefaultValues = {
  farmAddress: '',
};

const ConnectFarm: FC<ConnectFarmProps> = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <Box sx={styles.form} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="farmAddress"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            value={value}
            onChange={onChange}
            label="Enter farm address"
            variant="outlined"
          />
        )}
      />

      <Button
        title="New Farmer"
        color={ButtonColor.black}
        customVariant={ButtonVariant.contained}
        customStyles={styles.button}
      >
        Login
      </Button>
    </Box>
  );
};

export default ConnectFarm;

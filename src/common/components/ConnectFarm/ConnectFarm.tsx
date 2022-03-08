import { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, TextField } from '@mui/material';
import { Button } from 'common/components';
import { ConnectFarmProps, DefaultValues } from './ConnectFarm.types';
import { ButtonVariant } from 'common/components/Button/Button.types';
import { ButtonColor, ButtonType } from 'common/components/Button/Button.types';
import styles from './ConnectFarm.styles';

const defaultValues: DefaultValues = {
  farmAddress: '',
};

const ConnectFarm: FC<ConnectFarmProps> = ({ setfarmAddress, initFarmer }) => {
  const { control, handleSubmit } = useForm({
    defaultValues,
  });

  const onSubmit = (data: DefaultValues) => {
    setfarmAddress(data.farmAddress);
    initFarmer(data.farmAddress);
  };

  return (
    <Box sx={styles.form} onSubmit={handleSubmit(onSubmit)} component="form">
      <Controller
        name="farmAddress"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            InputProps={{
              style: styles.textField,
            }}
            InputLabelProps={{
              style: {
                fontSize: '14px',
                lineHeight: '24px',
                color: '#808080',
              },
            }}
            value={value}
            onChange={onChange}
            label="Enter farm address"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Button
        title="New Farmer"
        color={ButtonColor.black}
        buttonType={ButtonType.submit}
        customVariant={ButtonVariant.contained}
        customStyles={styles.button}
      />
    </Box>
  );
};

export default ConnectFarm;

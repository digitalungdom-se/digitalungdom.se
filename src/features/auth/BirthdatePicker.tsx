import { KeyboardDatePicker, KeyboardDatePickerProps } from '@material-ui/pickers';

import React from 'react';

interface BirthdatePickerProps {
  disabled: boolean;
}

function BirthdatePicker(props: KeyboardDatePickerProps): React.ReactElement {
  return (
    <KeyboardDatePicker
      {...props}
      format="yyyy-MM-dd"
      onChange={props.onChange}
      placeholder="yyyy-mm-dd"
      value={props.value}
    />
  );
}

export default BirthdatePicker;

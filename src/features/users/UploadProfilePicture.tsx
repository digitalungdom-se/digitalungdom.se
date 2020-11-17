import React, { useState } from 'react';

import Button from '@material-ui/core/Button';

export default function UploadProfilePicture() {
  const [file, setFile] = useState<File>();

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;

    if (target !== null && target.files !== null) {
      setFile(target.files[0]);
    }
  }

  return (
    <>
      <input
        accept="image/*"
        id="contained-button-file"
        multiple
        onChange={handleChange}
        style={{ display: 'none' }}
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button color="primary" component="span" disableElevation fullWidth variant="contained">
          Upload
        </Button>
      </label>
    </>
  );
}

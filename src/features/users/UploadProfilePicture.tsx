import 'react-image-crop/dist/ReactCrop.css';

import React, { PureComponent } from 'react';
import { Theme, withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import ReactCrop from 'react-image-crop';

interface UploadProfilePictureProps {
  onSubmit: (croppedImageUrl?: string) => Promise<void>;
}

interface UploadProfilePictureState {
  crop: ReactCrop.Crop;
  croppedImageUrl: string | undefined;
  src: any;
  submitting: boolean;
}

export default class UploadProfilePicture extends PureComponent<UploadProfilePictureProps, UploadProfilePictureState> {
  imageRef = React.createRef();
  fileUrl = '';

  constructor(props: UploadProfilePictureProps) {
    super(props);
    this.state = {
      crop: {
        aspect: 1,
        unit: '%',
      },
      croppedImageUrl: undefined,
      src: '',
      submitting: false,
    };
  }

  onSelectFile = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({
          src: reader.result,
        }),
      );
      reader.readAsDataURL(target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = (img: any): boolean => {
    this.imageRef = img;
    this.setState({
      crop: {
        unit: '%',
        [img.width > img.height ? 'height' : 'width']: 100,
        aspect: 1,
      },
    });
    return false;
  };

  onCropComplete = (crop: ReactCrop.Crop): void => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop: ReactCrop.Crop): void => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop: ReactCrop.Crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(this.imageRef, crop);
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image: any, crop: ReactCrop.Crop): Promise<string> | undefined {
    if (crop.x !== undefined && crop.y !== undefined && crop.width !== undefined && crop.height !== undefined) {
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext('2d');

      ctx?.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height,
      );

      return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Canvas is empty'));
            console.error('Canvas is empty');
            return;
          }
          // blob.name = fileName;
          window.URL.revokeObjectURL(this.fileUrl);
          this.fileUrl = window.URL.createObjectURL(blob);
          resolve(this.fileUrl);
        }, 'image/png');
      });
    }
  }

  render(): React.ReactElement {
    const { submitting, crop, croppedImageUrl, src } = this.state;

    return (
      <>
        <input
          accept="image/*"
          id="contained-button-file"
          multiple
          onChange={this.onSelectFile}
          style={{ display: 'none' }}
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button color="primary" component="span" disableElevation fullWidth variant="contained">
            Upload
          </Button>
        </label>
        <Dialog
          fullWidth
          maxWidth="sm"
          onClose={() => {
            this.setState({ src: '' });
          }}
          open={src !== ''}
        >
          <StyledPaper elevation={0}>
            {src && (
              <ReactCrop
                crop={crop}
                onChange={this.onCropChange}
                onComplete={this.onCropComplete}
                onImageLoaded={this.onImageLoaded}
                ruleOfThirds
                src={src}
              />
            )}
            <Button
              color="primary"
              disabled={submitting || crop.width === 0}
              disableElevation
              fullWidth
              onClick={(): void => {
                if (this.props.onSubmit) {
                  this.setState({ submitting: true });
                  this.props.onSubmit(croppedImageUrl).then(() => {
                    this.setState({ src: '' });
                    this.setState({ submitting: false });
                  });
                }
              }}
              variant="contained"
            >
              Submit
            </Button>
          </StyledPaper>
        </Dialog>
      </>
    );
  }
}

const StyledPaper = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(Paper);

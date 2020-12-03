import React from 'react';
import Typography from '@material-ui/core/Typography';

const programmingIs = [
  'roligt!',
  'krångligt (ibland)',
  'framtiden',
  'förvånansvärt enkelt',
  'välbetalt ;)',
  'spännande',
  'en flex att kunna B)',
  'viktigt',
];

class DynamicTitle extends React.Component {
  constructor(props) {
    super(props);
    const firstIndex = Math.floor(Math.random() * programmingIs.length);
    this.state = {
      titleWordIndex: Math.floor(firstIndex),
      titleWord: programmingIs[firstIndex],
      letters: '',
      letterIndex: 0,
      erasing: false,
    };
  }

  componentDidMount() {
    setInterval(() => {
      // If we are erasing and have zero letters, choose a new word.
      if (this.state.letterIndex <= 0 && this.state.erasing === true) {
        let newWordIndex = this.state.titleWordIndex + 1;
        if (newWordIndex > programmingIs.length - 1) {
          newWordIndex = 0;
        }
        this.setState({ titleWord: programmingIs[newWordIndex], titleWordIndex: newWordIndex });
      }

      const spliceAt = this.state.letterIndex < 0 ? 0 : this.state.letterIndex;
      const newLetters = this.state.titleWord.slice(0, spliceAt);

      let newIndex = 0;
      if (this.state.erasing === true) {
        newIndex = this.state.letterIndex - 1;
      } else {
        newIndex = this.state.letterIndex + 1;
      }
      this.setState({ letters: newLetters, letterIndex: newIndex });

      if (newIndex > this.state.titleWord.length + 5) {
        this.setState({ erasing: true });
      } else if (newIndex < -1) {
        this.setState({ erasing: false });
      }
    }, 100);
  }

  render() {
    return (
      <>
        <Typography
          style={{ fontSize: this.props.titleSize, marginBottom: 10, color: 'white', fontWeight: 'bold' }}
          variant="h2"
        >
          Programmering är...
        </Typography>
        <div
          style={{
            width: '100%',
            marginBottom: 24,
            background: 'rgba(255,255,255, 0.5)',
            padding: 3,
            borderRadius: 6,
            overflow: 'hidden',
          }}
        >
          <Typography
            style={{
              width: '150vw',
              fontSize: this.props.titleSize - 5,
              fontFamily: 'courier',
              color: 'white',
              paddingLeft: 12,
            }}
          >
            {'> ' + this.state.letters}
          </Typography>
        </div>
      </>
    );
  }
}

export default DynamicTitle;

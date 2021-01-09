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
  state = {
    erasing: false,
    letterIndex: 0,
    titleWordIndex: Math.floor(Math.floor(Math.random() * programmingIs.length)),
  };
  interval = null;

  componentDidMount() {
    this.interval = setInterval(() => {
      // if erasing
      if (this.state.erasing) {
        // if at -2 (meaning a little pause after 0)
        if (this.state.letterIndex === -2) {
          // choose new word, set erase to false and return
          this.setState({
            erasing: false,
            titleWordIndex: this.state.titleWordIndex + 1 === programmingIs.length ? 0 : this.state.titleWordIndex + 1,
          });
          return;
        }
        // else lower
        else {
          this.setState({ letterIndex: this.state.letterIndex - 1 });
        }
      } else {
        this.setState({
          // erasing is true if 5 characters longer than word, implying a little pause
          erasing: this.state.letterIndex === programmingIs[this.state.titleWordIndex].length + 5,
          letterIndex: this.state.letterIndex + 1,
        });
      }
    }, 100);
  }

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
  }

  render() {
    return (
      <>
        <Typography
          style={{
            color: 'white',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
          }}
          variant="h4"
        >
          Programmering är...
        </Typography>
        <div
          style={{
            background: 'rgba(255,255,255, 0.5)',
            borderRadius: '0.5rem',
            marginBottom: 24,
            overflow: 'hidden',
          }}
        >
          <Typography
            style={{
              color: 'white',
              fontFamily: 'monospace',
              lineHeight: 'inherit',
              overflowWrap: 'anywhere',
              paddingLeft: 12,
              width: '100%',
            }}
            variant="h4"
          >
            {'> ' + programmingIs[this.state.titleWordIndex].substring(0, this.state.letterIndex)}
            {/* {'> ' + this.state.letters} */}
          </Typography>
        </div>
      </>
    );
  }
}

export default DynamicTitle;

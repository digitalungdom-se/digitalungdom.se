import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';

const DynamicTitle = (props) => {
  const programmingIs = [
    'roligt!',
    'krångligt (ibland)',
    'framtiden',
    'förvånansvärt enkelt',
    'välbetalt ;)',
    'spännande',
    'en flex att kunna B)',
    'viktigt',
    '[Object object] 0.o',
  ];
  const [titleWordIndex, setTitleWordIndex] = useState(Math.floor(Math.random() * programmingIs.length));
  const [titleWord, setTitleWord] = useState(programmingIs[titleWordIndex]);
  const [letters, setLetters] = useState('');
  const [letterIndex, setLetterIndex] = useState(0);
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // If we are erasing and have zero letters, choose a new word.
      if (letterIndex <= 0 && erasing === true) {
        let newWordIndex = titleWordIndex + 1;
        if (newWordIndex > programmingIs.length - 1) {
          newWordIndex = 0;
        }
        setTitleWord(programmingIs[newWordIndex]);
        setTitleWordIndex(newWordIndex);
      }

      const spliceAt = letterIndex < 0 ? 0 : letterIndex;
      const newLetters = titleWord.slice(0, spliceAt);
      let newIndex = 0;
      if (erasing) {
        newIndex = letterIndex - 1;
      } else {
        newIndex = letterIndex + 1;
      }
      setLetters(newLetters);
      setLetterIndex(newIndex);
      if (newIndex > titleWord.length + 5) {
        setErasing(true);
      } else if (newIndex <= 0) {
        setErasing(false);
      }
    }, 80);
    return () => {
      clearInterval(interval);
    };
  }, [setLetterIndex, letterIndex]);

  return (
    <>
      <Typography
        style={{ fontSize: props.titleSize, marginBottom: 10, color: 'white', fontWeight: 'bold' }}
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
            fontSize: props.titleSize - 5,
            fontFamily: 'courier',
            color: 'white',
            paddingLeft: 12,
          }}
        >
          {'> ' + letters}
        </Typography>
      </div>
    </>
  );
};

export default DynamicTitle;

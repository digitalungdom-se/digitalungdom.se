import FadeOutText from './FadeOutText';
import { LoremIpsum } from 'lorem-ipsum';
import React from 'react';
import StoryMetadata from './StoryMetadata';

const story: StoryMetadata = {
  component: FadeOutText,
  decorators: [
    (storyFn): JSX.Element => (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'inline-block' }}>{storyFn()}</div>
      </div>
    ),
  ],
  title: 'FadeOutText',
};

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

export default story;

export const Basic = (): JSX.Element => (
  <div style={{ border: '1px solid', maxWidth: 400 }}>
    <FadeOutText>{lorem.generateSentences(20)}</FadeOutText>
  </div>
);

export const Short = (): JSX.Element => (
  <div style={{ border: '1px solid', maxWidth: 400 }}>
    <FadeOutText>{lorem.generateSentences(2)}</FadeOutText>
  </div>
);

export const Image = (): JSX.Element => (
  <div style={{ border: '1px solid', maxWidth: 400 }}>
    <FadeOutText>
      <img alt="katt" src="https://i.imgur.com/URGpIh5.jpg" />
    </FadeOutText>
  </div>
);

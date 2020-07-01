import { addDecorator } from '@storybook/react';

type DecoratorFunction = Parameters<typeof addDecorator>[0];

export default interface StoryMetadata {
  component: React.ReactNode;
  title: string;
  decorators?: DecoratorFunction[];
}

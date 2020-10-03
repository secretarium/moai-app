import { storiesOf } from '@storybook/react-native';
import { Welcome } from '@storybook/react/demo';

export default {
    title: 'Welcome'
};

export const toStorybook = (): typeof Welcome => Welcome;

toStorybook.story = {
    name: 'to Storybook'
};

// On-Device Register
storiesOf('Welcome', module).add(toStorybook.story.name, toStorybook);
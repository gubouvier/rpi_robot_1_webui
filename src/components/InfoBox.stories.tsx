import type { Meta, StoryObj } from '@storybook/react';

import InfoBox from './InfoBox';
import { resolve } from 'path';

const meta = {
  component: InfoBox,
} satisfies Meta<typeof InfoBox>;

export default meta;

const fake_get_function = (): Promise<string> => new Promise((resolve, reject) => {resolve("Test Result")});

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    info: "Test info",
    get_function: fake_get_function
  }
};
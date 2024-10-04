import type { Meta, StoryObj } from '@storybook/react';

import Keypad from './Keypad';

const meta = {
  component: Keypad,
} satisfies Meta<typeof Keypad>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    keys: ["w", "a s d"],
    pressedKeys: new Set<string>()
  }
};
import React from 'react';
import { render, screen } from '@testing-library/react';
import Keypad from '../../src/components/Keypad';

describe('Keypad wasd', () => {
  const keys = ['w', 'a s d'];
  const pressedKeys = new Set(['w']);

  it('renders the Keypad component', () => {
    render(<Keypad keys={keys} pressedKeys={pressedKeys} />);
    expect(screen.getByText('W')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('S')).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();
  });

  it('applies the correct classes to buttons based on pressed keys', () => {
    render(<Keypad keys={keys} pressedKeys={pressedKeys} />);
    expect(screen.getByText('W')).toHaveClass('bg-blue-500');
    expect(screen.getByText('A')).toHaveClass('bg-gray-200');
    expect(screen.getByText('S')).toHaveClass('bg-gray-200');
    expect(screen.getByText('D')).toHaveClass('bg-gray-200');
  });
});

describe('Keypad arrow', () => {
  const keys = ['ArrowUp', 'ArrowLeft ArrowDown ArrowRight'];
  const pressedKeys = new Set(['ArrowUp']);

  it('displays the correct symbols for arrow keys and uppercase letters for other keys', () => {
    render(<Keypad keys={keys} pressedKeys={pressedKeys} />);
    expect(screen.getByText('↑')).toBeInTheDocument();
    expect(screen.getByText('←')).toBeInTheDocument();
    expect(screen.getByText('↓')).toBeInTheDocument();
    expect(screen.getByText('→')).toBeInTheDocument();
  });

  it('applies the correct classes to buttons based on pressed keys (arrows)', () => {
    render(<Keypad keys={keys} pressedKeys={pressedKeys} />);
    expect(screen.getByText('↑')).toHaveClass('bg-blue-500');
    expect(screen.getByText('←')).toHaveClass('bg-gray-200');
    expect(screen.getByText('↓')).toHaveClass('bg-gray-200');
    expect(screen.getByText('→')).toHaveClass('bg-gray-200');
  });
});
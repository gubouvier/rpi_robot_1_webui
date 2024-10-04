import React from 'react';

interface KeypadProps {
  keys: string[];
  pressedKeys: Set<string>;
}

const keySymbols: { [key: string]: string } = {
  ArrowUp: '↑',
  ArrowLeft: '←',
  ArrowDown: '↓',
  ArrowRight: '→',
};

const Keypad: React.FC<KeypadProps> = ({ keys, pressedKeys }) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      {keys.map((keyRow, rowIndex) => (
        <div key={rowIndex} className="flex space-x-2">
          {keyRow.split(' ').map((key) => (
            <button
              key={key}
              className={`w-12 h-12 rounded-md flex items-center justify-center ${
                pressedKeys.has(key) ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            >
              {keySymbols[key] || key.toUpperCase()}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keypad;

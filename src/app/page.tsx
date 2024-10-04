"use client";

import { ROBOT_URL } from '../config/robot';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Keypad from '../components/Keypad';
import InfoBox from '../components/InfoBox';

const Home = () => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  const handleKey = async (key: string, method: string) => {
    try {
      const response = await fetch(`${ROBOT_URL}/key`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key }),
      });

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error sending key release:', error);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
    }
    const newPressedKeys = new Set(pressedKeys);
    if (!newPressedKeys.has(event.key)) {
      newPressedKeys.add(event.key);
      setPressedKeys(newPressedKeys);
      handleKey(event.key, 'POST');
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    const newPressedKeys = new Set(pressedKeys);
    if (newPressedKeys.has(event.key)) {
      newPressedKeys.delete(event.key);
      setPressedKeys(newPressedKeys);
      handleKey(event.key, 'DELETE');
    }
  };

  const getRemoteInfo = async (url: string, method: string = "GET") : Promise<string> => {
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data.value;
    } catch (error) {
      console.error('Error getting remote info:', error);
      return "Error"
    }
  };

  const getCpuTemp = async () : Promise<string> => {
    return getRemoteInfo(`${ROBOT_URL}/cpu_temp`)
  };

  const getRPIBatt = async () : Promise<string> => {
    return getRemoteInfo(`${ROBOT_URL}/rpi_batt`)
  }

  const getDateTime = async () : Promise<string> => {
    return Promise.resolve(format(Date(), 'yyyy-MM-dd HH:mm:ss'))
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [pressedKeys]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-40">
      <h1>RPI robot dashboard</h1>
      <div className="flex justify-center">
        <div className="rounded-lg shadow-lg bg-white justify-center">
          {/* <iframe src='http://rpiz2-2:5000/video_feed' className="w-[640px] h-[480px]"></iframe> */}
          <iframe src='/vercel.svg' className="w-[640px] h-[480px]"></iframe>
          <div className="p-6 flex space-x-10 justify-center">
            <Keypad keys={['ArrowUp', 'ArrowLeft ArrowDown ArrowRight']} pressedKeys={pressedKeys} />
            <Keypad keys={['w', 'a s d']} pressedKeys={pressedKeys} />
          </div>
          <div className='p-6 flex space-x-10 justify-center'>
            <InfoBox info="CPU Temp" get_function={getCpuTemp} />
            <InfoBox info="RPI Batt" get_function={getRPIBatt} />
            <InfoBox info="Date" get_function={getDateTime} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;

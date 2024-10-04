import React, { useState, useEffect} from "react";

interface InfoProps {
    info: string;
    get_function: () => Promise<string>;
}

const InfoBox: React.FC<InfoProps> = ({ info, get_function}) => {

    const [value, setValue] = useState<string>('');

    useEffect(() => {
        const fetchAndUpdateValue = async () => {
            const newValue = await get_function();
            setValue(newValue);
            console.log("Update value, new value" + value)
        }
        
        fetchAndUpdateValue();

        const intervalId = setInterval(fetchAndUpdateValue, 1000);

        return () => clearInterval(intervalId);
    }, [] );

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
            <div className="font-bold text-xl mb-2 text-center">{info}</div>
            <p className="text-gray-700 text-base text-center">{value}</p>
        </div>
    )
};

export default InfoBox;
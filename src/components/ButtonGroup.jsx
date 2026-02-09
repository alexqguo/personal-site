import React, { useState } from 'react';

const ButtonGroup = ({ options, onChange, initialValue }) => {
  const [selected, setSelected] = useState(initialValue);
  const onClick = (option) => {
    setSelected(option);
    onChange(option);
  }

  return (
    <div className="flex space-x-2">
      {options.map(option => (
        <button
          key={option}
          className={`px-4 py-2 text-sm font-medium border rounded-md ${
            selected === option ? 'bg-blue-500 text-white border-blue-500' : 'text-gray-700 border-gray-200'
          }`}
          onClick={() => onClick(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
import React from 'react';
const formatNumberInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const { type } = e.target;
  return (
    type === 'number' &&
    ['e', 'E', '+', '-', '.'].includes(e.key) &&
    e.preventDefault()
  );
};
export default formatNumberInput;

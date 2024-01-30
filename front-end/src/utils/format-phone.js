export const formatPhone = (phoneNumber) => {
    const numberString = phoneNumber.toString().split('');
    const newFormat = `(${numberString.slice(0, 3).join('')}) -${numberString
      .slice(3, 7)
      .join('')}-${numberString.slice(6).join('')}`;
    return newFormat;
  };
  
  export const unformatPhone = (phoneNumber) => {
    const numberString = phoneNumber.split('');
    const newFormat = numberString
      .filter((x) => x !== '(' && x !== ')' && x !== '-')
      .join('');
    return parseInt(newFormat);
  };
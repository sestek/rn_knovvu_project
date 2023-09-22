import {decode, encode} from 'base-64';

const Uint8ArrayFromBase64 = async (value: any) => {
  const binaryString = decode(value);
  //console.log('rif:', binaryString);
  const uint8Array = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }

  return uint8Array;
};

export default Uint8ArrayFromBase64;

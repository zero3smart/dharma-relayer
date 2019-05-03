export const HIDE_DISCLOSURE = 'HIDE_DISCLOSURE';

export function hideDisclosure (){
  console.warn('closed');
  return {
    type: HIDE_DISCLOSURE
  };
}
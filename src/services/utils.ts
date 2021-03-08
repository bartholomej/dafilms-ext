/**
 * @class Utils
 *
 * Class for utilities
 *
 * @namespace DafilmsExt
 * @author Bartholomej
 * @see https://github.com/bartholomej/dafilms-ext
 */

export const isProd = process.env.NODE_ENV === 'production';
export const isDev = process.env.NODE_ENV === 'development';

export const isCzech = (url: string): boolean => {
  return url.includes('.cz');
};

export const getCsfdId = (csfdLink: string): string => {
  const csfdParts = csfdLink.split('/');
  return csfdParts[csfdParts.length - 1];
};

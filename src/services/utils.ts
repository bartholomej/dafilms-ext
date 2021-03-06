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

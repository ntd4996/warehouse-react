import { notification } from 'antd';

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} errors      The URL we want to request
 */
export default function emailSearchError(errors) {

  const errortext = errors[0];
  notification.error({
    message: `Request error`,
    description: errors[0],
  });
}

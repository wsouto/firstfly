import { useEffect, useState } from 'react';

export const Status = () => {
  const [status, setStatus] = useState('loading...');

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setStatus(data as string))
      .catch(() => setStatus('Error fetching status'));
  }, []);

  return (
    <div>
      <h1>
        API Status:{' '}
        <span
          className={`blink p-1 text-gray-900 ${status === 'Healthy' ? 'bg-green-500' : 'bg-red-500'}`}
        >
          {status}
        </span>
      </h1>
    </div>
  );
};

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
        Server Status:{' '}
        <span
          className={`blink ${status === 'healthy' ? 'bg-red-500' : 'bg-green-500'} p-1 text-black`}
        >
          {status}
        </span>
      </h1>
    </div>
  );
};

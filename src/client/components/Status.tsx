import { useEffect, useState } from 'react';

export const Status = () => {
  const API = import.meta.env.PUBLIC_API_URL ?? '';
  const base = API || ''; // empty => relative path => same origin

  const [status, setStatus] = useState('loading...');
  // const API = 'http://localhost:8787';

  useEffect(() => {
    fetch(`${base}/api/health`)
      // fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setStatus(data as string))
      .catch(() => setStatus('Error fetching status'));
  }, []);

  return (
    <div>
      <h1>
        Server Status: <span className="bg-gray-300 p-1 text-black">{status}</span>
      </h1>
    </div>
  );
};

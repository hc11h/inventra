'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';

interface NotificationProps {
  message: string;
  duration?: number; // in milliseconds
}

export const Notification: React.FC<NotificationProps> = ({ message, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [message, duration]);

  return (
    <div
      className={clsx(
        'fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg transition-all duration-300',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6',
        'bg-blue-600 text-white font-medium'
      )}
    >
      {message}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { getSocket } from '../api/socket';

export const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const sock = getSocket();
    setSocket(sock);

    return () => {
      if (sock) {
        sock.off('connect');
        sock.off('disconnect');
      }
    };
  }, []);

  return socket;
};

export const useOnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on('user-online', (data) => {
      setOnlineUsers((prev) => {
        if (!prev.find((u) => u.userId === data.userId)) {
          return [...prev, data];
        }
        return prev;
      });
    });

    socket.on('user-offline', (data) => {
      setOnlineUsers((prev) => prev.filter((u) => u.userId !== data.userId));
    });

    return () => {
      socket.off('user-online');
      socket.off('user-offline');
    };
  }, [socket]);

  return onlineUsers;
};

export const useLiveFeed = () => {
  const [feed, setFeed] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on('live-feed-update', (data) => {
      setFeed((prev) => [data, ...prev.slice(0, 9)]);
    });

    return () => {
      socket.off('live-feed-update');
    };
  }, [socket]);

  return feed;
};

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on('notification', (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.off('notification');
    };
  }, [socket]);

  return notifications;
};

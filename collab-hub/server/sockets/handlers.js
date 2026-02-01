import Notification from '../models/Notification.js';

const onlineUsers = new Map();

export const handleConnection = (io, socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join-room', (userId) => {
    onlineUsers.set(userId, socket.id);
    socket.join(`user-${userId}`);
    
    // Broadcast user online status
    io.emit('user-online', {
      userId,
      status: 'online',
      timestamp: new Date()
    });
  });

  socket.on('design-uploaded', (data) => {
    io.emit('live-feed-update', {
      type: 'upload',
      user: data.user,
      design: data.design,
      timestamp: new Date()
    });
  });

  socket.on('design-liked', (data) => {
    // Send notification to design creator
    const creatorSocketId = onlineUsers.get(data.designCreatorId);
    if (creatorSocketId) {
      io.to(`user-${data.designCreatorId}`).emit('notification', {
        type: 'like',
        actor: data.user,
        design: data.design,
        message: `${data.user.name} liked your design "${data.design.title}"`,
        timestamp: new Date()
      });
    }

    // Broadcast like to all users viewing the design
    io.emit('design-like-update', {
      designId: data.designId,
      likeCount: data.likeCount
    });
  });

  socket.on('comment-posted', (data) => {
    // Send notification to design creator
    io.to(`user-${data.designCreatorId}`).emit('notification', {
      type: 'comment',
      actor: data.user,
      design: data.design,
      message: `${data.user.name} commented on your design`,
      timestamp: new Date()
    });

    // Broadcast comment update
    io.emit('design-comment-update', {
      designId: data.designId,
      comment: data.comment,
      commentCount: data.commentCount
    });
  });

  socket.on('purchase-completed', (data) => {
    // Send notification to design creator
    io.to(`user-${data.designCreatorId}`).emit('notification', {
      type: 'sale',
      actor: data.buyer,
      design: data.design,
      message: `${data.buyer.name} purchased your design "${data.design.title}"`,
      timestamp: new Date()
    });

    // Broadcast purchase activity
    io.emit('live-feed-update', {
      type: 'purchase',
      buyer: data.buyer,
      design: data.design,
      timestamp: new Date()
    });
  });

  socket.on('user-followed', (data) => {
    // Send notification to followed user
    io.to(`user-${data.followedUserId}`).emit('notification', {
      type: 'follow',
      actor: data.follower,
      message: `${data.follower.name} started following you`,
      timestamp: new Date()
    });
  });

  socket.on('typing', (data) => {
    io.emit('user-typing', {
      userId: data.userId,
      userName: data.userName,
      context: data.context
    });
  });

  socket.on('disconnect', () => {
    // Find and remove user
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        io.emit('user-offline', {
          userId,
          status: 'offline',
          timestamp: new Date()
        });
        break;
      }
    }
    console.log(`User disconnected: ${socket.id}`);
  });
};

export const getOnlineUsers = () => {
  return Array.from(onlineUsers.keys());
};

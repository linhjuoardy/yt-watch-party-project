import { Server, Socket } from "socket.io";
import { ConnectedUser } from "./types";
import { rooms } from "./state";
const users = new Map<string, ConnectedUser>();

export function registerRoomHandlers(io: Server,socket: Socket) {
  socket.on("join-room", ({ roomCode, username }) => {
   



let room = rooms.get(roomCode);

if (!room) {

    room = {
        roomCode,

        videoId: "dQw4w9WgXcQ",

        currentTime: 0,

        isPlaying: false,

        hostId: socket.id,

        participants: [],

        updatedAt: Date.now(),
        chat: [],
    };

    rooms.set(roomCode, room);

} const joinMessage = {
    id: Date.now().toString(),
    username: "System",
    message: `${username} joined the room`,
    timestamp: Date.now(),
    system: true,
};
room.chat.push(joinMessage);

io.to(roomCode).emit("new-message", joinMessage);

    socket.join(roomCode);

    room.participants.push({
    socketId: socket.id,

    userId: socket.id,

    username,

    role:
    room.hostId === socket.id
        ? "host"
        : "participant",
});
    io.to(roomCode).emit(
    "participants",
    room.participants
);



      users.set(socket.id, {
          socketId: socket.id,
          roomCode,
          username,
          userId: socket.id,
          role: "participant"
      });





socket.emit("room-state", {
    videoId: room.videoId,
    currentTime: room.currentTime,
    isPlaying: room.isPlaying,
});

socket.emit("chat-history", room.chat);

      console.log(rooms);
      console.log(`${username} joined ${roomCode}`);

  });

  socket.on("leave-room", () => {

const user = users.get(socket.id);

if (!user) return;

const room = rooms.get(user.roomCode);

if (room) {

    room.participants =
        room.participants.filter(
            p => p.socketId !== socket.id
        );

    io.to(user.roomCode).emit(
        "participants",
        room.participants
    );
    const leaveMessage = {
    id: Date.now().toString(),
    username: "System",
    message: `${user.username} left the room`,
    timestamp: Date.now(),
    system: true,
};

room.chat.push(leaveMessage);

io.to(user.roomCode).emit("new-message", leaveMessage);

    if (room.participants.length === 0) {

        rooms.delete(user.roomCode);

    }

}

socket.leave(user.roomCode);


users.delete(socket.id);
});


function canControlPlayback(
    room: any,
    socketId: string
)
 {
    const participant = room.participants.find(
        (p: any) => p.socketId === socketId
    );

    return (
        participant?.role === "host" ||
        participant?.role === "moderator"
    );
}


  socket.on("video-play", ({ roomCode, currentTime }) => {

    const room = rooms.get(roomCode);

    if (!room) return;

    if (!canControlPlayback(room, socket.id)) return;

    room.isPlaying = true;
    room.currentTime = currentTime;
    room.updatedAt = Date.now();

    socket.to(roomCode).emit("video-play", {
        currentTime,
    });

});

socket.on("video-pause", ({ roomCode, currentTime }) => {

    const room = rooms.get(roomCode);

    if (!room) return;

    if (!canControlPlayback(room, socket.id)) return;

    room.isPlaying = false;
    room.currentTime = currentTime;
    room.updatedAt = Date.now();

    socket.to(roomCode).emit("video-pause", {
        currentTime,
    });

});

socket.on("video-seek", ({ roomCode, currentTime }) => {

    const room = rooms.get(roomCode);

    if (!room) return;

    if (!canControlPlayback(room, socket.id)) return;

    room.currentTime = currentTime;
    room.updatedAt = Date.now();

    socket.to(roomCode).emit("video-seek", {
        currentTime,
    });

});

socket.on("change-video", ({ roomCode, videoId }) => {

    const room = rooms.get(roomCode);

    if (!room) return;

    if (!canControlPlayback(room, socket.id)) return;

    room.videoId = videoId;
    room.currentTime = 0;
    room.isPlaying = false;
    room.updatedAt = Date.now();

    io.to(roomCode).emit("video-changed", {
        videoId,
    });

});


socket.on(
    "change-role",
    ({ roomCode, targetSocketId, role }) => {
        const room = rooms.get(roomCode);

        if (!room) return;

        if (room.hostId !== socket.id) return;

        const participant =
            room.participants.find(
                p => p.socketId === targetSocketId
            );

        if (!participant) return;

        participant.role = role;

        io.to(roomCode).emit(
            "participants",
            room.participants
        );
    }
);


socket.on(
    "kick-user",
    ({ roomCode, targetSocketId }) => {
        const room = rooms.get(roomCode);

        if (!room) return;

        if (room.hostId !== socket.id) return;

        const kickedUser = users.get(targetSocketId);

        if (!kickedUser) return;

        room.participants = room.participants.filter(
            p => p.socketId !== targetSocketId
        );

        io.to(roomCode).emit(
            "participants",
            room.participants
        );

        io.to(targetSocketId).emit("kicked");

        const targetSocket =
            io.sockets.sockets.get(targetSocketId);

        targetSocket?.leave(roomCode);

        users.delete(targetSocketId);
    }
);

socket.on("send-message", ({ roomCode, username, message }) => {

    const room = rooms.get(roomCode);

    if (!room) return;

    const chatMessage = {
        id: Date.now().toString(),
        username,
        message,
        timestamp: Date.now(),
    };

    room.chat.push(chatMessage);

    io.to(roomCode).emit("new-message", chatMessage);

});
  socket.on("disconnect", () => {

const user = users.get(socket.id);

if (!user) return;

const room = rooms.get(user.roomCode);

if (room) {
    room.chat.push(leaveMessage);
    io.to(user.roomCode).emit("new-message", leaveMessage);


    room.participants =
        room.participants.filter(
            p => p.socketId !== socket.id
        );

    io.to(user.roomCode).emit(
        "participants",
        room.participants
    );

    if (room.participants.length === 0) {

        rooms.delete(user.roomCode);

    }

}

const leaveMessage = {
    id: Date.now().toString(),
    username: "System",
    message: `${user.username} left the room`,
    timestamp: Date.now(),
    system: true,
};

room.chat.push(leaveMessage);

io.to(user.roomCode).emit("new-message", leaveMessage);
users.delete(socket.id);

  });



}

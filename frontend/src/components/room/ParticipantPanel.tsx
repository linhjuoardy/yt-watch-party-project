import socket from "../../lib/socket";
import Button from "../ui/Button";

interface Participant {
    socketId: string;
    userId: string;
    username: string;
    role: "host" | "moderator" | "participant";
}

interface Props {
    participants: Participant[];
    roomCode: string;
    currentUserId: string;
}

export default function ParticipantPanel({
    participants,
    roomCode,
    currentUserId,
}: Props) {

    const me = participants.find(
        p => p.socketId === currentUserId
    );

    const isHost = me?.role === "host";

    const changeRole = (
        socketId: string,
        role: "participant" | "moderator"
    ) => {
        socket.emit("change-role", {
            roomCode,
            targetSocketId: socketId,
            role,
        });
    };

    const kickUser = (socketId: string) => {
        socket.emit("kick-user", {
            roomCode,
            targetSocketId: socketId,
        });
    };

    return (
        <div>
            <h3>Participants</h3>

            {participants.map((participant) => (
                <div
                    key={participant.socketId}
                    style={{
                        marginBottom: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <strong>
                        {participant.role === "host" && "👑 "}
                        {participant.role === "moderator" && "⭐ "}
                        {participant.role === "participant" && "👤 "}

                        {participant.username}
                    </strong>

                    {isHost &&
                        participant.role !== "host" && (
                            <div
                                style={{
                                    display: "flex",
                                    gap: "6px",
                                }}
                            >
                                {participant.role ===
                                "participant" ? (
                                    <Button
                                        onClick={() =>
                                            changeRole(
                                                participant.socketId,
                                                "moderator"
                                            )
                                        }
                                    >
                                        Promote
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() =>
                                            changeRole(
                                                participant.socketId,
                                                "participant"
                                            )
                                        }
                                    >
                                        Demote
                                    </Button>
                                )}

                                <Button
                                    onClick={() =>
                                        kickUser(
                                            participant.socketId
                                        )
                                    }
                                >
                                    Kick
                                </Button>
                            </div>
                        )}
                </div>
            ))}
        </div>
    );
}
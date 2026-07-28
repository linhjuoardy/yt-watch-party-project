export type ParticipantRole = "host" | "moderator" | "participant";

export interface Participant {
  id: string;
  name: string;
  role: ParticipantRole;
}

enum UserStatus {
  ACTIVE = "ACTIVE",
  DELETE = "DELETE",
}

enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface MembersMeResponse {
  memberId: number;
  role: UserRole;
  status: UserStatus;
  nickname: string;
  profileImageUrl: string | null;
}

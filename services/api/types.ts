export type ApiRole = 'STUDENT' | 'ADMIN' | 'ROOT';

export interface ApiUser {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  role: ApiRole;
  status: 'ACTIVE' | 'SUSPENDED';
  locale: string;
  avatarMediaId?: string | null;
  createdAt: string;
}

export interface AuthResponse {
  user: ApiUser;
  accessToken: string;
  refreshToken: string;
}

export interface EnrollmentItem {
  id: string;
  courseId: string;
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
  course?: { id: string; slug: string; legacyId?: number | null };
}

export interface CourseSummary {
  id: string;
  slug: string;
  legacyId?: number | null;
  priceCents: number;
  currency: string;
  title: string;
  subtitle?: string | null;
  coverUrl?: string | null;
  track?: { id: string; slug: string; title?: string } | null;
}

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createHmac, timingSafeEqual } from 'node:crypto';

export type UserRole = 'admin' | 'editor' | 'author';

export type SessionUser = {
  id: number;
  username: string;
  email: string;
  role: UserRole;
};

export type AuthSession = {
  user: SessionUser;
  exp: number;
};

const SESSION_COOKIE = 'shibghatallah_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getSecret() {
  const secret =
    process.env.AUTH_SECRET ||
    process.env.SESSION_SECRET ||
    process.env.DATABASE_URL;

  if (!secret) {
    throw new Error('AUTH_SECRET atau SESSION_SECRET belum diatur');
  }

  return secret;
}

function base64UrlEncode(value: string) {
  return Buffer.from(value).toString('base64url');
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function signPayload(payload: string) {
  return createHmac('sha256', getSecret()).update(payload).digest('base64url');
}

function createToken(session: AuthSession) {
  const payload = base64UrlEncode(JSON.stringify(session));
  const signature = signPayload(payload);

  return `${payload}.${signature}`;
}

function verifyToken(token: string): AuthSession | null {
  const [payload, signature] = token.split('.');

  if (!payload || !signature) return null;

  const expectedSignature = signPayload(payload);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedBuffer.length) return null;

  const isValid = timingSafeEqual(signatureBuffer, expectedBuffer);

  if (!isValid) return null;

  try {
    const session = JSON.parse(base64UrlDecode(payload)) as AuthSession;

    if (!session.user?.id || !session.user.email || !session.user.role) {
      return null;
    }

    if (session.exp * 1000 < Date.now()) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function createSession(user: SessionUser) {
  const cookieStore = await cookies();
  const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;

  cookieStore.set(SESSION_COOKIE, createToken({ user, exp }), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) return null;

  return verifyToken(token);
}

export async function clearSession() {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE);
}

export async function requireSession() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  return session;
}

export function canManageAllPosts(role: UserRole) {
  return role === 'admin' || role === 'editor';
}

export function canManagePost(user: SessionUser, postUserId: number | null) {
  return canManageAllPosts(user.role) || user.id === postUserId;
}

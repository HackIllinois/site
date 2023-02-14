import { WithId, MethodType, FileType, RegistrationType, PrizeType, MentorTimeslotType, EventType, RegistrationRole, ProfileType, RSVPType, DecisionType, ProfileResponseType, ZoomLinks } from '../util/types';

const API = 'https://api.hackillinois.org';

export class APIError extends Error {
  status: number;
  type: string;

  constructor({ message, status, type }: { message: string, status: number, type: string }) {
    super(message);
    this.status = status;
    this.type = type;
    this.name = 'APIError';
  }
}

async function request(method: MethodType, endpoint: string, body?: unknown) {
  const response = await fetch(API + endpoint, {
    method,
    // mode: 'cors',
    headers: {
      Authorization: sessionStorage.getItem('token') || '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (response.status !== 200) {
    throw new APIError(await response.json());
  }

  return response.json();
}

export const isAuthenticated = (): string|null => sessionStorage.getItem('token');

export function authenticate(to: string): void {
  if (process.env.REACT_APP_TOKEN) {
    sessionStorage.setItem('token', process.env.REACT_APP_TOKEN);
  } else {
    to = `${process.env.NEXT_PUBLIC_REACT_APP_URL}/auth/?to=${to}`;
    to = `${API}/auth/github/?redirect_uri=${to}`;
  }
  window.location.replace(to);
}

export function getToken(code: string): Promise<string> {
  return request('POST', '/auth/code/github/', { code }).then((res) => res.token);
}

export function getRoles(): Promise<string[]> {
  return request('GET', '/auth/roles/').then((res) => res.roles);
}

export function getRolesSync(): string[] {
  const token = sessionStorage.getItem('token');
  if (token) {
    try {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      return tokenData.roles;
    } catch (e) {
      // if the token is incorrectly formatted, we just ignore it and return the default []
    }
  }
  return [];
}

export function getRegistration(role: RegistrationRole): Promise<WithId<RegistrationType>> {
  return request('GET', `/registration/${role}/`);
}

// this function does not have a return type because different roles have different response types
export function register(isEditing: boolean, role: RegistrationRole, registration: RegistrationType): Promise<WithId<RegistrationType>> {
  const method = isEditing ? 'PUT' : 'POST';
  return request(method, `/registration/${role}/`, registration);
}

export function getDecision(): Promise<WithId<DecisionType>> {
  return request('GET', '/decision/');
}

export function getRSVP(): Promise<WithId<RSVPType>> {
  return request('GET', '/rsvp/');
}

export function rsvp(isEditing: boolean, rsvpData: RSVPType): Promise<WithId<RSVPType>> {
  const method = isEditing ? 'PUT' : 'POST';
  return request(method, '/rsvp/', rsvpData);
}

export function uploadFile(file: File, type: FileType): Promise<unknown> {
  return request('GET', `/upload/${type}/upload/`)
    .then((res) => fetch(res[type], {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file,
    }))
    .then((res) => {
      if (res.ok) {
        return res;
      }
      throw new Error('response did not have status 200');
    });
}

type GetQrResType = {
  id: string;
  qrInfo:string;
};

export function getQR():Promise<GetQrResType> {
  return request('GET', '/user/qr/');
}

export function getPrizes(): Promise<PrizeType[]> {
  return request('GET', '/upload/blobstore/prizes/').then((res) => res.data);
}

type RefreshTokenResType = {
  token: string;
};
export function refreshToken(): Promise<void> {
  return request('GET', '/auth/token/refresh/')
    .then((res:RefreshTokenResType) => sessionStorage.setItem('token', res.token));
}

export function getMentorTimeslots(): Promise<MentorTimeslotType[]> {
  return request('GET', '/upload/blobstore/mentor-timeslots/').then((res) => res.data);
}

export function setMentorTimeslots(data: MentorTimeslotType[]): Promise<MentorTimeslotType[]> {
  return request('PUT', '/upload/blobstore/', { id: 'mentor-timeslots', data })
    .then((res) => res.data);
}

export function getEvents(): Promise<EventType[]> {
  return request('GET', '/event/').then((res) => res.events);
}

export function getProfile(): Promise<ProfileResponseType> {
  return request('GET', '/profile/');
}

export function createProfile(isEditing: boolean, profile: ProfileType): Promise<ProfileResponseType> {
  const method = isEditing ? 'PUT' : 'POST';
  return request(method, '/profile/', profile);
}

export function getZoomLinks(): Promise<ZoomLinks> {
  return request('GET', '/upload/blobstore/zoomlinks/').then((res) => res.data);
}
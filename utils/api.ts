import { MethodType, RegistrationType, RegistrationRole, WithId, FileType, RefreshTokenResType } from "./types";

const API = "https://api.hackillinois.org";
const APIv2 = "https://adonix.hackillinois.org";

export class APIError extends Error {
    status: number;
    type: string;

    constructor({
        message,
        status,
        type
    }: {
        message: string;
        status: number;
        type: string;
    }) {
        super(message);
        this.status = status;
        this.type = type;
        this.name = "APIError";
    }
}

async function requestv2(method: MethodType, endpoint: string, body?: unknown) {
    const response = await fetch(APIv2 + endpoint, {
        method,
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            Origin: "www.hackillinois.org"
        },
        body: JSON.stringify(body)
    });

    if (response.status !== 200) {
        throw new APIError(await response.json());
    }

    return response.json();
}

export function subscribe(
    listName: string,
    subscriber: string
): Promise<string> {
    return requestv2("POST", "/newsletter/subscribe/", {
        listName: listName,
        emailAddress: subscriber
    });
}

async function request(method: MethodType, endpoint: string, body?: unknown) {
    const response = await fetch(APIv2 + endpoint, {
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
      to = `${APIv2}/auth/login/github/?device=web`;
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

  export function refreshToken(): Promise<void> {
    return request('GET', '/auth/token/refresh/')
      .then((res:RefreshTokenResType) => sessionStorage.setItem('token', res.token));
  }
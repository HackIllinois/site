const APIv2 = "https://adonix.hackillinois.org";

export const isAuthenticated = (): string | null =>
    sessionStorage.getItem("token");

export function authenticate(to: string): void {
    if (process.env.NEXT_PUBLIC_REACT_APP_TOKEN) {
        sessionStorage.setItem(
            "token",
            process.env.NEXT_PUBLIC_REACT_APP_TOKEN
        );
    } else {
        localStorage.setItem("to", to);
        to = `${APIv2}/auth/login/github/?device=dev`;
    }
    window.location.replace(to);
}

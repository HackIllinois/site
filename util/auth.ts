"use server";
import { signOut } from "@/auth";

export async function signoutHandler(redirectTo: string) {
    await signOut({ redirectTo });
}

"use client";
import Loading from "@/components/Loading/Loading";
import {
    isAuthenticated,
    authenticate,
    getRegistrationOrDefault,
    getRegistrationStatus
} from "@/util/api";
import Head from "next/head";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const pathname = usePathname()
    const [isAlive, setIsAlive] = useState(true)



    useEffect(() => {
        if (!isAuthenticated()) {
            authenticate(pathname)
            return
        }

        getRegistrationOrDefault()
            .then(registration => {
                if (registration.hasSubmitted) {
                    router.push("/profile")
                } else if (!isAlive) {
                    router.push("/closed")
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    useEffect(() => {
        const fetchRegistrationStatus = async () => {
          try {
            const response = await getRegistrationStatus()
            setIsAlive(response.alive)
          } catch (err) {
            console.error(err)
          }
        }
     
        fetchRegistrationStatus()
      }, [])

    return (
        <>
            <Head>
                <title>HackIllinois | Register</title>
            </Head>
            {isLoading && <Loading />}
            {children}
        </>
    );
};

export default Layout;

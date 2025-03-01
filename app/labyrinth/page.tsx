"use client";

import Loading from "@/components/Loading/Loading";
import { authenticate, getAuthRoles, isAuthenticated } from "@/util/api";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import stringHash from "string-hash";

const Labyrinth: React.FC = () => {
    const pathname = usePathname();

    useEffect(() => {
        if (!isAuthenticated()) {
            authenticate(pathname);
            return;
        }

        getAuthRoles().then(roles => {
            const hashedUserId = stringHash(roles.id);
            switch (hashedUserId % 3) {
                case 0:
                    window.location.href = "/labyrinth/heaven.pdf";
                    break;
                case 1:
                    window.location.href = "/labyrinth/underworld.pdf";
                    break;
                case 2:
                    window.location.href = "/labyrinth/earth.pdf";
                    break;
            }
        });
    }, []);

    return <Loading></Loading>;
};

export default Labyrinth;

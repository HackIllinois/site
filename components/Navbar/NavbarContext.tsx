"use client";

import { usePathname } from "next/navigation";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

interface NavbarContextInterface {
    isDark: boolean;
    handleSetDark: () => void;
    handleSetNotDark: () => void;
}

export const NavbarContext = createContext<NavbarContextInterface | null>(null);

const NavbarContextProvider: React.FC<PropsWithChildren<{}>> = props => {
    const [isDark, setIsDark] = useState<boolean>(false);
    const pathname = usePathname();

    const handleSetDark = () => {
        setIsDark(true);
    };

    const handleSetNotDark = () => {
        setIsDark(false);
    };

    useEffect(() => {
        setIsDark(false);
    }, [pathname]);

    return (
        <NavbarContext.Provider
            value={{
                isDark,
                handleSetDark,
                handleSetNotDark
            }}
        >
            {props.children}
        </NavbarContext.Provider>
    );
};

export default NavbarContextProvider;

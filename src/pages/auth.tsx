import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { getToken } from '../util/api';

const Auth = () => {
    const router = useRouter();

    type QueryTypes = {
        code?: string;
        isAndroid?: string;
        isiOS?: string;
        to?: string;
    };

    useEffect(() => {
        if (!router.isReady) return;

        const { code, isAndroid, isiOS, to }: QueryTypes = router.query;

        if (code) {
            if (isAndroid || isiOS) {
                const os = isAndroid ? 'android' : 'ios';
                const to = `hackillinois://org.hackillinois.${os}/auth?code=${code}`;
                router.replace(to);
            } else {
                getToken(code).then((token) => {
                    sessionStorage.setItem('token', token);
                    router.replace(to as string);
                });
            }
        } else {
            router.replace('/');
        }
    }, [router.isReady]);

    return <div>Loading...</div>;
};

export default Auth;

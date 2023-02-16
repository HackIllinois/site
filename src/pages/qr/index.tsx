import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import { getQR as getQRUrl, isAuthenticated, authenticate, getQR } from '../../util/api';

const QR = () => {
    const size = 400;
    const [url, setUrl] = useState<string | null>(null);
    const router = useRouter();

    const getQRCode = useCallback(async () => {
        const QRUrl = await getQRUrl();
        if (QRUrl.qrInfo) {
          const str = encodeURIComponent(QRUrl.qrInfo);
          setUrl(`https://chart.googleapis.com/chart?chs=${size}x${size}&cht=qr&chl=${str}&choe=UTF-8`);
        }
    }, [setUrl]);

  useEffect(() => {
    if (!isAuthenticated()) {
      authenticate(`${process.env.NEXT_PUBLIC_REACT_APP_URL}${router.pathname}`);
    }
  }, []);

    useEffect(() => {
        getQRCode();
        const interval = setInterval(getQRCode, 1000 * 15);

        return () => clearInterval(interval);
    }, [getQRCode]);

    return (
      <>
        <div style={{ height: '100vh', width: '100vw', backgroundColor: 'white' }}>
          {url ? <img id="qr-img" src={url} alt="QR" style={{ display: 'inline', textAlign: 'center' }} /> : null}
        </div>
      </>
    );
};

export default QR;

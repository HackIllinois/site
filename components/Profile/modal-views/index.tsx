import {
    ButtonHTMLAttributes,
    DetailedHTMLProps,
    ReactNode,
    SVGProps
} from "react";
import styles from "@/components/Profile/modal-views/modal-views.module.scss";
import MobileConfirmButton from "@/public/profile/mobile-confirm-button.svg";
import MobileDeclineButton from "@/public/profile/mobile-decline-button.svg";
import Image from "next/image";

{
    /* TODO: Move all of these to constants (links too) */
}

export const BoldFont = ({ children }: { children: ReactNode }) => {
    return <h2 className={styles.boldFont}>{children}</h2>;
};

export const ShinyFont = ({ children }: { children: ReactNode }) => {
    return <h1 className={styles.shinyFont}>{children}</h1>;
};

export const StandardFont = ({ children }: { children: ReactNode }) => {
    return <p className={styles.standardFont}>{children}</p>;
};

export const ConfirmButton = (
    props: DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >
) => {
    return (
        <button {...props} className={styles.hoverButton}>
            <svg
                width="171"
                height="43"
                viewBox="0 0 171 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    width="171"
                    height="42.6444"
                    rx="16.8889"
                    fill="#FFB23E"
                />
                <path
                    d="M69.718 1.89746H92.0545L49.5432 40.3197H25.7656L69.718 1.89746Z"
                    fill="#F5EA83"
                />
                <path
                    d="M104.765 1.89746H127.101L84.59 40.3197H60.8125L104.765 1.89746Z"
                    fill="#F5EA83"
                />
                <path
                    d="M52.8571 27.3017C52.0161 27.3017 51.2358 27.1699 50.5163 26.9065C49.807 26.6329 49.1889 26.2478 48.6619 25.7513C48.1451 25.2547 47.7398 24.6721 47.4459 24.0033C47.1521 23.3243 47.0051 22.5795 47.0051 21.7689C47.0051 20.9582 47.1521 20.2185 47.4459 19.5497C47.7398 18.8707 48.1451 18.283 48.6619 17.7865C49.1889 17.2899 49.807 16.9099 50.5163 16.6465C51.2358 16.3729 52.0161 16.2361 52.8571 16.2361C53.8401 16.2361 54.7166 16.4083 55.4867 16.7529C56.267 17.0974 56.9155 17.5939 57.4323 18.2425L55.5171 19.9753C55.1726 19.5699 54.7926 19.2609 54.3771 19.0481C53.9718 18.8353 53.5158 18.7289 53.0091 18.7289C52.5734 18.7289 52.1731 18.7998 51.8083 18.9417C51.4435 19.0835 51.1294 19.2913 50.8659 19.5649C50.6126 19.8283 50.4099 20.1475 50.2579 20.5225C50.1161 20.8974 50.0451 21.3129 50.0451 21.7689C50.0451 22.2249 50.1161 22.6403 50.2579 23.0153C50.4099 23.3902 50.6126 23.7145 50.8659 23.9881C51.1294 24.2515 51.4435 24.4542 51.8083 24.5961C52.1731 24.7379 52.5734 24.8089 53.0091 24.8089C53.5158 24.8089 53.9718 24.7025 54.3771 24.4897C54.7926 24.2769 55.1726 23.9678 55.5171 23.5625L57.4323 25.2953C56.9155 25.9337 56.267 26.4302 55.4867 26.7849C54.7166 27.1294 53.8401 27.3017 52.8571 27.3017ZM63.9171 27.3017C63.0659 27.3017 62.2806 27.1649 61.5611 26.8913C60.8417 26.6177 60.2134 26.2326 59.6763 25.7361C59.1494 25.2294 58.739 24.6417 58.4451 23.9729C58.1513 23.3041 58.0043 22.5694 58.0043 21.7689C58.0043 20.9683 58.1513 20.2337 58.4451 19.5649C58.739 18.8961 59.1494 18.3134 59.6763 17.8169C60.2134 17.3102 60.8417 16.9201 61.5611 16.6465C62.2806 16.3729 63.0659 16.2361 63.9171 16.2361C64.7785 16.2361 65.5638 16.3729 66.2731 16.6465C66.9926 16.9201 67.6158 17.3102 68.1427 17.8169C68.6697 18.3134 69.0801 18.8961 69.3739 19.5649C69.6779 20.2337 69.8299 20.9683 69.8299 21.7689C69.8299 22.5694 69.6779 23.3091 69.3739 23.9881C69.0801 24.6569 68.6697 25.2395 68.1427 25.7361C67.6158 26.2326 66.9926 26.6177 66.2731 26.8913C65.5638 27.1649 64.7785 27.3017 63.9171 27.3017ZM63.9171 24.8089C64.3225 24.8089 64.6974 24.7379 65.0419 24.5961C65.3966 24.4542 65.7006 24.2515 65.9539 23.9881C66.2174 23.7145 66.4201 23.3902 66.5619 23.0153C66.7139 22.6403 66.7899 22.2249 66.7899 21.7689C66.7899 21.3027 66.7139 20.8873 66.5619 20.5225C66.4201 20.1475 66.2174 19.8283 65.9539 19.5649C65.7006 19.2913 65.3966 19.0835 65.0419 18.9417C64.6974 18.7998 64.3225 18.7289 63.9171 18.7289C63.5118 18.7289 63.1318 18.7998 62.7771 18.9417C62.4326 19.0835 62.1286 19.2913 61.8651 19.5649C61.6118 19.8283 61.4091 20.1475 61.2571 20.5225C61.1153 20.8873 61.0443 21.3027 61.0443 21.7689C61.0443 22.2249 61.1153 22.6403 61.2571 23.0153C61.4091 23.3902 61.6118 23.7145 61.8651 23.9881C62.1286 24.2515 62.4326 24.4542 62.7771 24.5961C63.1318 24.7379 63.5118 24.8089 63.9171 24.8089ZM71.4062 27.0889V16.4489H73.8838L79.751 23.5321H78.5806V16.4489H81.5294V27.0889H79.0518L73.1846 20.0057H74.355V27.0889H71.4062ZM86.4491 21.1153H91.3587V23.4409H86.4491V21.1153ZM86.6619 27.0889H83.6523V16.4489H91.9971V18.7745H86.6619V27.0889ZM93.4047 27.0889V16.4489H96.4143V27.0889H93.4047ZM98.5554 27.0889V16.4489H103.419C104.392 16.4489 105.228 16.6059 105.927 16.9201C106.637 17.2342 107.184 17.6902 107.569 18.2881C107.954 18.8758 108.147 19.575 108.147 20.3857C108.147 21.1862 107.954 21.8803 107.569 22.4681C107.184 23.0457 106.637 23.4915 105.927 23.8057C105.228 24.1097 104.392 24.2617 103.419 24.2617H100.227L101.565 23.0001V27.0889H98.5554ZM105.137 27.0889L102.492 23.2129H105.699L108.359 27.0889H105.137ZM101.565 23.3193L100.227 21.9361H103.237C103.865 21.9361 104.331 21.7993 104.635 21.5257C104.95 21.2521 105.107 20.8721 105.107 20.3857C105.107 19.8891 104.95 19.5041 104.635 19.2305C104.331 18.9569 103.865 18.8201 103.237 18.8201H100.227L101.565 17.4369V23.3193ZM109.807 27.0889V16.4489H112.285L116.693 23.6841H115.385L119.672 16.4489H122.149L122.18 27.0889H119.413L119.383 20.6593H119.854L116.647 26.0401H115.309L112.011 20.6593H112.589V27.0889H109.807Z"
                    fill="#A61E00"
                />
            </svg>
            <div className={styles.unhoveredButton}>CONFIRM</div>
        </button>
    );
};

export const DeclineButton = (
    props: DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >
) => {
    return (
        <button {...props} className={styles.hoverButton}>
            <svg
                width="171"
                height="43"
                viewBox="0 0 171 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    width="171"
                    height="42.6444"
                    rx="16.8889"
                    fill="#FFB23E"
                />
                <path
                    d="M69.718 1.89746H92.0545L49.5432 40.3197H25.7656L69.718 1.89746Z"
                    fill="#F5EA83"
                />
                <path
                    d="M104.765 1.89746H127.101L84.59 40.3197H60.8125L104.765 1.89746Z"
                    fill="#F5EA83"
                />
                <path
                    d="M50.4914 27.0889V16.4489H55.5226C56.6981 16.4489 57.7317 16.6667 58.6234 17.1025C59.5151 17.5382 60.2093 18.1513 60.7058 18.9417C61.2125 19.7321 61.4658 20.6745 61.4658 21.7689C61.4658 22.8531 61.2125 23.7955 60.7058 24.5961C60.2093 25.3865 59.5151 25.9995 58.6234 26.4353C57.7317 26.871 56.6981 27.0889 55.5226 27.0889H50.4914ZM53.501 24.6873H55.401C56.009 24.6873 56.5359 24.5758 56.9818 24.3529C57.4378 24.1198 57.7925 23.7854 58.0458 23.3497C58.2991 22.9038 58.4258 22.3769 58.4258 21.7689C58.4258 21.1507 58.2991 20.6238 58.0458 20.1881C57.7925 19.7523 57.4378 19.423 56.9818 19.2001C56.5359 18.967 56.009 18.8505 55.401 18.8505H53.501V24.6873ZM65.8156 20.5681H70.7556V22.8177H65.8156V20.5681ZM66.0284 24.7633H71.5916V27.0889H63.0492V16.4489H71.394V18.7745H66.0284V24.7633ZM78.5665 27.3017C77.7254 27.3017 76.9452 27.1699 76.2257 26.9065C75.5164 26.6329 74.8982 26.2478 74.3713 25.7513C73.8545 25.2547 73.4492 24.6721 73.1553 24.0033C72.8614 23.3243 72.7145 22.5795 72.7145 21.7689C72.7145 20.9582 72.8614 20.2185 73.1553 19.5497C73.4492 18.8707 73.8545 18.283 74.3713 17.7865C74.8982 17.2899 75.5164 16.9099 76.2257 16.6465C76.9452 16.3729 77.7254 16.2361 78.5665 16.2361C79.5494 16.2361 80.426 16.4083 81.1961 16.7529C81.9764 17.0974 82.6249 17.5939 83.1417 18.2425L81.2265 19.9753C80.882 19.5699 80.502 19.2609 80.0865 19.0481C79.6812 18.8353 79.2252 18.7289 78.7185 18.7289C78.2828 18.7289 77.8825 18.7998 77.5177 18.9417C77.1529 19.0835 76.8388 19.2913 76.5753 19.5649C76.322 19.8283 76.1193 20.1475 75.9673 20.5225C75.8254 20.8974 75.7545 21.3129 75.7545 21.7689C75.7545 22.2249 75.8254 22.6403 75.9673 23.0153C76.1193 23.3902 76.322 23.7145 76.5753 23.9881C76.8388 24.2515 77.1529 24.4542 77.5177 24.5961C77.8825 24.7379 78.2828 24.8089 78.7185 24.8089C79.2252 24.8089 79.6812 24.7025 80.0865 24.4897C80.502 24.2769 80.882 23.9678 81.2265 23.5625L83.1417 25.2953C82.6249 25.9337 81.9764 26.4302 81.1961 26.7849C80.426 27.1294 79.5494 27.3017 78.5665 27.3017ZM84.4836 27.0889V16.4489H87.4932V24.7025H92.57V27.0889H84.4836ZM93.7609 27.0889V16.4489H96.7705V27.0889H93.7609ZM98.9117 27.0889V16.4489H101.389L107.256 23.5321H106.086V16.4489H109.035V27.0889H106.557L100.69 20.0057H101.86V27.0889H98.9117ZM113.924 20.5681H118.864V22.8177H113.924V20.5681ZM114.137 24.7633H119.7V27.0889H111.158V16.4489H119.503V18.7745H114.137V24.7633Z"
                    fill="#A61E00"
                />
            </svg>
            <div className={styles.unhoveredButton}>DECLINE</div>
        </button>
    );
};

export const SubmitButton = (
    props: DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >
) => {
    return (
        <button {...props} className={styles.hoverButton}>
            <svg
                width="208"
                height="52"
                viewBox="0 0 208 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    width="207.089"
                    height="51.6444"
                    rx="20.4532"
                    fill="#FFB23E"
                />
                <path
                    d="M84.4321 2.29785H111.483L59.9993 48.829H31.2036L84.4321 2.29785Z"
                    fill="#F5EA83"
                />
                <path
                    d="M126.875 2.29785H153.926L102.443 48.829H73.647L126.875 2.29785Z"
                    fill="#F5EA83"
                />
                <path
                    d="M70.5834 33.109C69.528 33.109 68.5095 32.9802 67.5277 32.7225C66.5582 32.4525 65.7667 32.1089 65.1531 31.6916L66.3496 29.0041C66.9264 29.3722 67.5891 29.679 68.3376 29.9245C69.0985 30.1576 69.8532 30.2742 70.6018 30.2742C71.105 30.2742 71.5099 30.2313 71.8167 30.1454C72.1235 30.0472 72.3444 29.9245 72.4794 29.7772C72.6267 29.6177 72.7003 29.4336 72.7003 29.225C72.7003 28.9304 72.5653 28.6973 72.2953 28.5255C72.0254 28.3537 71.6756 28.2125 71.2461 28.1021C70.8166 27.9916 70.338 27.8812 69.8103 27.7707C69.2949 27.6603 68.7733 27.5192 68.2456 27.3474C67.7302 27.1755 67.2577 26.9546 66.8282 26.6847C66.3987 26.4024 66.0489 26.0404 65.7789 25.5986C65.509 25.1445 65.374 24.5739 65.374 23.8867C65.374 23.1135 65.5826 22.414 65.9998 21.7882C66.4294 21.1623 67.0675 20.6591 67.9143 20.2787C68.761 19.8983 69.8164 19.7081 71.0804 19.7081C71.9272 19.7081 72.7555 19.8062 73.5655 20.0026C74.3877 20.1867 75.1179 20.4628 75.756 20.8309L74.6332 23.5369C74.0196 23.2056 73.4121 22.9601 72.8108 22.8006C72.2094 22.6288 71.6265 22.5429 71.062 22.5429C70.5589 22.5429 70.1539 22.5981 69.8471 22.7086C69.5403 22.8067 69.3194 22.9417 69.1844 23.1135C69.0494 23.2853 68.9819 23.4817 68.9819 23.7026C68.9819 23.9848 69.1108 24.2119 69.3685 24.3837C69.6385 24.5432 69.9882 24.6782 70.4177 24.7887C70.8595 24.8868 71.3381 24.9911 71.8536 25.1016C72.3813 25.212 72.9028 25.3532 73.4182 25.525C73.9459 25.6845 74.4245 25.9054 74.854 26.1877C75.2836 26.4576 75.6272 26.8197 75.8849 27.2737C76.1549 27.7155 76.2899 28.2739 76.2899 28.9488C76.2899 29.6974 76.0751 30.3908 75.6456 31.0289C75.2283 31.6548 74.5963 32.158 73.7496 32.5384C72.9151 32.9188 71.8597 33.109 70.5834 33.109ZM83.9192 33.109C82.0171 33.109 80.5322 32.5875 79.4645 31.5444C78.3969 30.5012 77.863 29.0225 77.863 27.108V19.9658H81.5078V26.9976C81.5078 28.1021 81.7226 28.8936 82.1521 29.3722C82.5939 29.8508 83.1952 30.0901 83.956 30.0901C84.7169 30.0901 85.3121 29.8508 85.7416 29.3722C86.1711 28.8936 86.3859 28.1021 86.3859 26.9976V19.9658H89.9754V27.108C89.9754 29.0225 89.4416 30.5012 88.3739 31.5444C87.3063 32.5875 85.8214 33.109 83.9192 33.109ZM92.4445 32.8513V19.9658H99.0346C100.728 19.9658 101.992 20.2787 102.827 20.9046C103.661 21.5182 104.078 22.3281 104.078 23.3344C104.078 23.9971 103.9 24.58 103.545 25.0832C103.201 25.5741 102.71 25.9668 102.072 26.2613C101.446 26.5435 100.697 26.6847 99.8261 26.6847L100.194 25.8011C101.102 25.8011 101.894 25.9422 102.569 26.2245C103.244 26.4945 103.765 26.8933 104.134 27.421C104.514 27.9364 104.704 28.5684 104.704 29.317C104.704 30.4337 104.25 31.3051 103.342 31.9309C102.446 32.5445 101.133 32.8513 99.4027 32.8513H92.4445ZM96.0525 30.219H99.1082C99.7341 30.219 100.207 30.1147 100.526 29.9061C100.857 29.6852 101.023 29.3538 101.023 28.912C101.023 28.4702 100.857 28.145 100.526 27.9364C100.207 27.7155 99.7341 27.6051 99.1082 27.6051H95.7948V25.0832H98.556C99.1696 25.0832 99.6298 24.9789 99.9366 24.7702C100.243 24.5616 100.397 24.2487 100.397 23.8314C100.397 23.4142 100.243 23.1074 99.9366 22.911C99.6298 22.7024 99.1696 22.5981 98.556 22.5981H96.0525V30.219ZM106.592 32.8513V19.9658H109.593L114.931 28.7279H113.348L118.539 19.9658H121.539L121.576 32.8513H118.226L118.189 25.0648H118.76L114.876 31.5812H113.256L109.261 25.0648H109.961V32.8513H106.592ZM124.155 32.8513V19.9658H127.8V32.8513H124.155ZM133.136 32.8513V22.8558H129.178V19.9658H140.72V22.8558H136.78V32.8513H133.136Z"
                    fill="#A61E00"
                />
            </svg>
            <div className={styles.unhoveredButton}>SUBMIT</div>
        </button>
    );
};

export const OkButton = (
    props: DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >
) => {
    return (
        <button {...props} className={styles.hoverButton}>
            <svg
                width="171"
                height="43"
                viewBox="0 0 171 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    width="171"
                    height="42.6444"
                    rx="16.8889"
                    fill="#FFB23E"
                />
                <path
                    d="M69.718 1.89746H92.0545L49.5432 40.3197H25.7656L69.718 1.89746Z"
                    fill="#F5EA83"
                />
                <path
                    d="M104.765 1.89746H127.101L84.59 40.3197H60.8125L104.765 1.89746Z"
                    fill="#F5EA83"
                />
                <path
                    d="M79.1543 27.3017C78.3031 27.3017 77.5177 27.1649 76.7983 26.8913C76.0788 26.6177 75.4505 26.2326 74.9135 25.7361C74.3865 25.2294 73.9761 24.6417 73.6823 23.9729C73.3884 23.3041 73.2415 22.5694 73.2415 21.7689C73.2415 20.9683 73.3884 20.2337 73.6823 19.5649C73.9761 18.8961 74.3865 18.3134 74.9135 17.8169C75.4505 17.3102 76.0788 16.9201 76.7983 16.6465C77.5177 16.3729 78.3031 16.2361 79.1543 16.2361C80.0156 16.2361 80.8009 16.3729 81.5102 16.6465C82.2297 16.9201 82.8529 17.3102 83.3798 17.8169C83.9068 18.3134 84.3172 18.8961 84.611 19.5649C84.915 20.2337 85.067 20.9683 85.067 21.7689C85.067 22.5694 84.915 23.3091 84.611 23.9881C84.3172 24.6569 83.9068 25.2395 83.3798 25.7361C82.8529 26.2326 82.2297 26.6177 81.5102 26.8913C80.8009 27.1649 80.0156 27.3017 79.1543 27.3017ZM79.1543 24.8089C79.5596 24.8089 79.9345 24.7379 80.279 24.5961C80.6337 24.4542 80.9377 24.2515 81.1911 23.9881C81.4545 23.7145 81.6572 23.3902 81.799 23.0153C81.951 22.6403 82.0271 22.2249 82.0271 21.7689C82.0271 21.3027 81.951 20.8873 81.799 20.5225C81.6572 20.1475 81.4545 19.8283 81.1911 19.5649C80.9377 19.2913 80.6337 19.0835 80.279 18.9417C79.9345 18.7998 79.5596 18.7289 79.1543 18.7289C78.7489 18.7289 78.3689 18.7998 78.0143 18.9417C77.6697 19.0835 77.3657 19.2913 77.1023 19.5649C76.8489 19.8283 76.6463 20.1475 76.4943 20.5225C76.3524 20.8873 76.2815 21.3027 76.2815 21.7689C76.2815 22.2249 76.3524 22.6403 76.4943 23.0153C76.6463 23.3902 76.8489 23.7145 77.1023 23.9881C77.3657 24.2515 77.6697 24.4542 78.0143 24.5961C78.3689 24.7379 78.7489 24.8089 79.1543 24.8089ZM89.3337 24.7329L89.1665 21.3585L93.7417 16.4489H97.0553L92.4953 21.3889L90.8233 23.1369L89.3337 24.7329ZM86.6433 27.0889V16.4489H89.6225V27.0889H86.6433ZM93.7873 27.0889L90.3217 22.6961L92.2825 20.5985L97.2833 27.0889H93.7873Z"
                    fill="#A61E00"
                />
            </svg>
            <div className={styles.unhoveredButton}>OK</div>
        </button>
    );
};

export const DiscordIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            width="133"
            height="67"
            viewBox="0 0 133 67"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M74.3847 5.56811C68.8168 2.97254 62.7884 1.08866 56.5088 0.000192567C56.4537 -0.00156825 56.3989 0.00876414 56.3483 0.0304634C56.2977 0.0521627 56.2524 0.084702 56.2157 0.125786C55.4622 1.5073 54.583 3.30745 53.9969 4.68896C47.3364 3.68423 40.5628 3.68423 33.9022 4.68896C33.3161 3.26559 32.4369 1.5073 31.6415 0.125786C31.5997 0.0420575 31.4741 0.000192567 31.3485 0.000192567C25.0689 1.08866 19.0823 2.97254 13.4725 5.56811C13.4307 5.56811 13.3888 5.60997 13.3469 5.65184C1.95992 22.6905 -1.17988 39.2687 0.369091 55.6794C0.369091 55.7631 0.410954 55.8468 0.494682 55.8887C8.03021 61.4147 15.2727 64.7639 22.4314 66.9827C22.557 67.0245 22.6826 66.9827 22.7245 66.8989C24.399 64.5964 25.9062 62.1683 27.2039 59.6146C27.2877 59.4471 27.2039 59.2797 27.0365 59.2378C24.6502 58.3168 22.3896 57.2283 20.1708 55.9724C20.0033 55.8887 20.0033 55.6375 20.1289 55.5119C20.5894 55.177 21.0499 54.8002 21.5104 54.4653C21.5942 54.3816 21.7197 54.3816 21.8035 54.4234C36.2047 60.9961 51.7363 60.9961 65.97 54.4234C66.0538 54.3816 66.1794 54.3816 66.2631 54.4653C66.7236 54.8421 67.1841 55.177 67.6446 55.5538C67.812 55.6794 67.812 55.9305 67.6027 56.0143C65.4258 57.3121 63.1233 58.3587 60.737 59.2797C60.5696 59.3215 60.5277 59.5309 60.5696 59.6565C61.9092 62.2102 63.4163 64.6383 65.049 66.9408C65.1746 66.9827 65.3002 67.0245 65.4258 66.9827C72.6264 64.7639 79.8689 61.4147 87.4044 55.8887C87.4881 55.8468 87.53 55.7631 87.53 55.6794C89.372 36.715 84.4739 20.2624 74.5522 5.65184C74.5103 5.60997 74.4684 5.56811 74.3847 5.56811ZM29.3809 45.6739C25.0689 45.6739 21.4686 41.6968 21.4686 36.7987C21.4686 31.9006 24.9851 27.9235 29.3809 27.9235C33.8185 27.9235 37.335 31.9425 37.2932 36.7987C37.2932 41.6968 33.7766 45.6739 29.3809 45.6739ZM58.5601 45.6739C54.2481 45.6739 50.6478 41.6968 50.6478 36.7987C50.6478 31.9006 54.1644 27.9235 58.5601 27.9235C62.9977 27.9235 66.5143 31.9425 66.4724 36.7987C66.4724 41.6968 62.9977 45.6739 58.5601 45.6739Z"
                fill="white"
            />
            <path
                d="M132.707 38.7071C133.098 38.3166 133.098 37.6834 132.707 37.2929L126.343 30.9289C125.953 30.5384 125.319 30.5384 124.929 30.9289C124.538 31.3195 124.538 31.9526 124.929 32.3431L130.586 38L124.929 43.6569C124.538 44.0474 124.538 44.6805 124.929 45.0711C125.319 45.4616 125.953 45.4616 126.343 45.0711L132.707 38.7071ZM103 39L132 39L132 37L103 37L103 39Z"
                fill="white"
            />
        </svg>
    );
};

export const HackKnightRejected = ({
    handleConfirm,
    handleDecline,
    reimburse
}: {
    handleConfirm: () => void;
    handleDecline: () => void;
    reimburse: number;
}) => {
    return (
        <>
            <BoldFont>
                {
                    "Unfortunately, we couldn't offer you a spot as a HackKnight, but you've been accepted as a"
                }
            </BoldFont>
            <ShinyFont>{"General Attendee"}</ShinyFont>
            <StandardFont>
                {
                    "If you would like to attend HackIllinois 2024, click Confirm to finish the RSVP process. If you won't be attending please click Decline. This cannot be reversed."
                }
            </StandardFont>
            {reimburse > 0 && <StandardFont>{`Additionally, you have been approved for a travel reimbursement of \$${reimburse}.`}</StandardFont>}

            <div className={styles.buttonGroup}>
                <ConfirmButton onClick={handleConfirm} />
                <DeclineButton onClick={handleDecline} />
            </div>
            <div className={styles.mobileButtonGroup}>
                <button onClick={handleConfirm}>
                    <Image
                        alt="confirm button"
                        src={MobileConfirmButton}
                        width={309}
                        height={54}
                    />
                </button>
                <button onClick={handleDecline}>
                    <Image
                        alt="decline button"
                        src={MobileDeclineButton}
                        width={309}
                        height={54}
                    />
                </button>
            </div>
        </>
    );
};

export const HackKnightAccepted = ({
    handleConfirm,
    handleDecline,
    reimburse
}: {
    handleConfirm: () => void;
    handleDecline: () => void;
    reimburse: number;
}) => {
    return (
        <>
            <div className={styles.textBlock}>
                <BoldFont>
                    {"Congratulations! You've been accepted as a"}
                </BoldFont>
                <ShinyFont>{"HackKnight"}</ShinyFont>
                <StandardFont>
                    {
                        "If you would like to attend HackIllinois 2024, click Confirm to finish the RSVP process. If you won't be attending please click Decline. This cannot be reversed."
                    }
                </StandardFont>
                {reimburse > 0 && <StandardFont>{`Additionally, you have been approved for a travel reimbursement of \$${reimburse}.`}</StandardFont>}
            </div>
            <div className={styles.buttonGroup}>
                <ConfirmButton onClick={handleConfirm} />
                <DeclineButton onClick={handleDecline} />
            </div>
            <div className={styles.mobileButtonGroup}>
                <button onClick={handleConfirm}>
                    <Image
                        alt="confirm button"
                        src={MobileConfirmButton}
                        width={309}
                        height={54}
                    />
                </button>
                <button onClick={handleDecline}>
                    <Image
                        alt="decline button"
                        src={MobileDeclineButton}
                        width={309}
                        height={54}
                    />
                </button>
            </div>
        </>
    );
};

export const GeneralAttendeeAccepted = ({
    handleConfirm,
    handleDecline,
    reimburse
}: {
    handleConfirm: () => void;
    handleDecline: () => void;
    reimburse: number;
}) => {
    return (
        <>
            <div className={styles.textBlock}>
                <BoldFont>
                    {"Congratulations! You've been accepted as a"}
                </BoldFont>
                <ShinyFont>{"General Attendee"}</ShinyFont>
                <StandardFont>
                    {
                        "If you would like to attend HackIllinois 2024, click Confirm to finish the RSVP process. If you won't be attending please click Decline. This cannot be reversed."
                    }
                </StandardFont>
                {reimburse > 0 && <StandardFont>{`Additionally, you have been approved for a travel reimbursement of \$${reimburse}.`}</StandardFont>}
            </div>
            <div className={styles.buttonGroup}>
                <ConfirmButton onClick={handleConfirm} />
                <DeclineButton onClick={handleDecline} />
            </div>
            <div className={styles.mobileButtonGroup}>
                <button onClick={handleConfirm}>
                    <Image
                        alt="confirm button"
                        src={MobileConfirmButton}
                        width={309}
                        height={54}
                    />
                </button>
                <button onClick={handleDecline}>
                    <Image
                        alt="decline button"
                        src={MobileDeclineButton}
                        width={309}
                        height={54}
                    />
                </button>
            </div>
        </>
    );
};

export const Rejected = ({ handleOk }: { handleOk: () => void }) => {
    return (
        <>
            <BoldFont>
                {
                    "Unfortunately, we were unable to offer you a spot at HackIllinois"
                }
            </BoldFont>
            <BoldFont>
                Email us at{" "}
                <a href="mailto:contact@hackillinois.org">
                    contact@hackillinois.org
                </a>{" "}
                if you have any questions!
            </BoldFont>
            <OkButton onClick={handleOk} />
        </>
    );
};

export const Waitlisted = ({ handleOk }: { handleOk: () => void }) => {
    return (
        <>
            <BoldFont>
                {
                    "Unfortunately, we are not able to offer you a spot at this time. We will reach out if anything changes!"
                }
            </BoldFont>
            <BoldFont>
                Email us at{" "}
                <a href="mailto:contact@hackillinois.org">
                    contact@hackillinois.org
                </a>{" "}
                if you have any questions!
            </BoldFont>
            <button onClick={handleOk} className={styles.okButton}>
                <OkButton />
            </button>
        </>
    );
};

export const TBD = ({ handleOk }: { handleOk: () => void }) => {
    return (
        <>
            <BoldFont>
                {
                    "Your application is in Review! We will reach out to you with a decision soon."
                }
            </BoldFont>
            <button onClick={handleOk} className={styles.okButton}>
                <OkButton />
            </button>
        </>
    );
};

export const RSVPConfirmed = () => {
    return (
        <>
            <BoldFont>
                You{"'"}re all set to{" "}
                <strong className={styles.boldFontYellow}>
                    {"Hack n' Slash"}
                </strong>
                !
            </BoldFont>
            <BoldFont>
                {"Before you grab your sword, make sure to join the Discord:"}
            </BoldFont>
            <DiscordIcon />
        </>
    );
};

export const Questions = ({ handleOk }: { handleOk: () => void }) => {
    return (
        <>
            <BoldFont>
                Email us at{" "}
                <a href="mailto:contact@hackillinois.org">
                    contact@hackillinois.org
                </a>{" "}
                if you have any questions!
            </BoldFont>
            <OkButton onClick={handleOk} />
        </>
    );
};

export const DeclineConfirmation = ({
    handleGoBack,
    handleDecline
}: {
    handleGoBack: () => void;
    handleDecline: () => void;
}) => {
    return (
        <>
            <BoldFont>Are you sure you want to decline?</BoldFont>
            <div className={styles.buttonGroup}>
                <button
                    onClick={handleGoBack}
                    className={styles.unhoveredButton}
                >
                    GO BACK
                </button>
                <DeclineButton onClick={handleDecline} />
            </div>
        </>
    );
};

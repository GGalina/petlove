import { useEffect, useState } from "react";
import styles from "./Loader.module.scss";

import mobileImg from "@/assets/images/loader-mob.jpg";
import tabletImg from "@/assets/images/loader-tablet.jpg";
import desktopImg from "@/assets/images/loader-desk.jpg";

const Loader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    const radius = 70;
    const circleLength = 2 * Math.PI * radius; 

    useEffect(() => {
        const interval = setInterval(() => {
        setProgress((prev) => {
            if (prev >= 100) {
            clearInterval(interval);
            onComplete?.(); // notify parent when loading finishes
            return 100;
            }
            return prev + 30;
        });
        }, 10);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div
            className={styles.loader}
            style={{
            "--bg-mobile": `url(${mobileImg})`,
            "--bg-tablet": `url(${tabletImg})`,
            "--bg-desktop": `url(${desktopImg})`,
            }}
        >
            <div className={styles.loader__progressWrapper}>
                <svg
                    className={styles.loader__ring}
                    viewBox="0 0 160 160"
                >
                    <circle
                        className={styles.loader__ringBg}
                        cx="80"
                        cy="80"
                        r="70"
                    />

                    <circle
                        className={styles.loader__ringProgress}
                        cx="80"
                        cy="80"
                        r="70"
                        style={{
                        strokeDashoffset:
                        circleLength - (circleLength * progress) / 100,
                        }}
                    />
                </svg>

                <span className={styles.loader__percent}>
                    {progress}%
                </span>
            </div>
        </div>
    );
};

export default Loader;
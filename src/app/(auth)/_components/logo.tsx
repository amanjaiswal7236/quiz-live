import Image from "next/image";
import { Poppins } from "next/font/google";

const font = Poppins({
    subsets: ["latin"],
    weight: ['400', '700'],
});

export const Logo = () => {
    const containerStyle = {
        background: 'linear-gradient(135deg, #6A0DAD, #9A32CD)',  // Purple gradient
        padding: '16px',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s ease',
        borderRadius: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '8px',
        marginTop: '32px',
    };

    const hoverStyle = {
        transform: 'translateY(-2px)',
    };

    return (
        <div 
            className="text-white mb-6"
            style={containerStyle as React.CSSProperties}
        >
            <Image
                src="/logo.svg"
                alt="Quiz-Live"
                width={48}
                height={48}
            />
            <span 
                className="font-sans text-lg font-bold"
                style={hoverStyle}
            >
                Quiz-Live
            </span>
        </div>
    );
};

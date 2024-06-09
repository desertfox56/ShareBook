import React, { createContext, useContext, useState, useEffect } from 'react';

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            const match = window.matchMedia("(max-width: 768px)").matches;
            setIsMobile(match);
        };

        window.addEventListener('resize', checkIfMobile);
        checkIfMobile(); // Проверяем при монтировании компонента

        return () => window.removeEventListener('resize', checkIfMobile); // Очищаем при размонтировании
    }, []);

    return (
        <DeviceContext.Provider value={{ isMobile }}>
            {children}
        </DeviceContext.Provider>
    );
};

export const useDeviceContext = () => useContext(DeviceContext);

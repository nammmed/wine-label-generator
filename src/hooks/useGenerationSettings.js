import { useState } from 'react';

export const useGenerationSettings = () => {
    const [settings, setSettings] = useState({
        steps: 40,
        cfg_scale: 9, // Увеличиваем влияние промпта
        denoising_strength: 0.7, // Уменьшаем шум
        sampler_name: "DPM++ 2M Karras",
        width: 512,
        height: 768
    });

    const handleSettingsChange = (setting, value) => {
        setSettings(prev => ({
            ...prev,
            [setting]: value
        }));
    };

    return { settings, handleSettingsChange };
};
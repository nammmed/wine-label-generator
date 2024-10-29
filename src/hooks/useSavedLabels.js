import { useState } from 'react';

const getSavedLabels = () => {
    const saved = localStorage.getItem('savedLabels');
    return saved ? JSON.parse(saved) : [];
};

export const useSavedLabels = () => {
    const [savedLabels, setSavedLabels] = useState(getSavedLabels());

    const saveLabel = (imageWithText, formData) => {
        const newLabel = {
            id: Date.now(),
            image: imageWithText,
            data: { ...formData },
            timestamp: new Date().toISOString()
        };

        const updatedLabels = [...savedLabels, newLabel];
        setSavedLabels(updatedLabels);
        localStorage.setItem('savedLabels', JSON.stringify(updatedLabels));
    };

    const saveLabelWithParams = (imageWithText, formData, generationParams) => {
        const newLabel = {
            id: Date.now(),
            image: imageWithText,
            data: { ...formData },
            generationParams: { ...generationParams }, // сохраняем параметры генерации
            timestamp: new Date().toISOString()
        };

        const updatedLabels = [...savedLabels, newLabel];
        setSavedLabels(updatedLabels);
        localStorage.setItem('savedLabels', JSON.stringify(updatedLabels));
    };

    const deleteLabel = (id) => {
        const updatedLabels = savedLabels.filter(label => label.id !== id);
        setSavedLabels(updatedLabels);
        localStorage.setItem('savedLabels', JSON.stringify(updatedLabels));
    };

    return { savedLabels, saveLabel, saveLabelWithParams, deleteLabel };
};
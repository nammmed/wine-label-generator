import {useState} from 'react';
import {generatePrompt} from '../utils/promptGenerator';

export const useImageGeneration = () => {
    const [loading, setLoading] = useState(false);
    const [generatedImage, setGeneratedImage] = useState(null);
    const [status, setStatus] = useState({message: '', severity: 'info'});

    const generateImage = async (formData, settings) => {
        setLoading(true);
        setStatus({message: 'Генерация изображения...', severity: 'info'});

        try {
            // Генерируем промпт с учетом всех характеристик вина
            const {prompt, negativePrompt} = await generatePrompt(formData.style, formData);

            console.log('Generated prompt:', prompt); // Для отладки

            const response = await fetch('http://127.0.0.1:7860/sdapi/v1/txt2img', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    prompt,
                    negative_prompt: negativePrompt,
                    ...settings
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setGeneratedImage('data:image/png;base64,' + result.images[0]);
            setStatus({
                message: 'Изображение успешно сгенерировано!',
                severity: 'success'
            });
        } catch (error) {
            console.error('Generation error:', error);
            setStatus({
                message: `Ошибка генерации: ${error.message}`,
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const generateSeries = async (basePrompt, variations) => {
        const results = [];
        setLoading(true);

        try {
            for (const variation of variations) {
                const response = await fetch('http://127.0.0.1:7860/sdapi/v1/txt2img', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...basePrompt,
                        ...variation,
                        model: variation.model || basePrompt.model
                    })
                });

                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const result = await response.json();
                results.push({
                    image: 'data:image/png;base64,' + result.images[0],
                    params: variation
                });
            }

            return results;
        } catch (error) {
            setStatus({ message: `Ошибка: ${error.message}`, severity: 'error' });
            return [];
        } finally {
            setLoading(false);
        }
    };

    return {loading, generatedImage, status, generateImage, generateSeries, setStatus};
};
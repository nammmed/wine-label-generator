import React, {useRef, useEffect} from 'react';
import {Box} from '@mui/material';

const TextOverlay = ({image, textData}) => {
    const canvasRef = useRef(null);

    const loadFonts = async () => {
        await Promise.all([
            new FontFace('Playfair', 'url(/fonts/PlayfairDisplay-Bold.ttf)').load(),
            new FontFace('PTSans', 'url(/fonts/PTSans-Regular.ttf)').load(),
        ]).then(fonts => {
            fonts.forEach(font => {
                document.fonts.add(font);
            });
        });
    };

    const formatGrapes = (grapes) => {
        const maxLineLength = 35;
        const words = grapes.split(' ');
        const lines = [];
        let currentLine = [];

        words.forEach(word => {
            if ((currentLine.join(' ') + ' ' + word).length > maxLineLength) {
                lines.push(currentLine.join(' '));
                currentLine = [word];
            } else {
                currentLine.push(word);
            }
        });

        if (currentLine.length > 0) {
            lines.push(currentLine.join(' '));
        }

        return lines;
    };

    const splitNameIntoLines = (text, ctx, maxWidth) => {
        const words = text.split(' ');
        const lines = ['', ''];
        let firstLineWords = Math.ceil(words.length / 2);

        while (firstLineWords > 0) {
            const line1 = words.slice(0, firstLineWords).join(' ');
            const line2 = words.slice(firstLineWords).join(' ');

            const width1 = ctx.measureText(line1).width;
            const width2 = ctx.measureText(line2).width;

            if (width1 <= maxWidth && width2 <= maxWidth) {
                return [line1, line2];
            }

            firstLineWords--;
        }

        return [words[0], words.slice(1).join(' ')];
    };

    const getBackgroundBrightness = (ctx, x, y, width, height) => {
        try {
            const imageData = ctx.getImageData(Math.floor(x), Math.floor(y), Math.floor(width), Math.floor(height));
            const data = imageData.data;
            let totalBrightness = 0;
            const pixels = data.length / 4;

            for (let i = 0; i < data.length; i += 4) {
                const brightness = (data[i] * 299 + data[i + 1] * 587 + data[i + 2] * 114) / 1000;
                totalBrightness += brightness;
            }

            return totalBrightness / pixels;
        } catch (error) {
            console.error('Error analyzing background:', error);
            return 255; // Возвращаем максимальную яркость в случае ошибки
        }
    };

    const drawTextWithBackground = (ctx, text, x, y, width, height) => {
        const brightness = getBackgroundBrightness(ctx, x - width / 2, y - height / 2, width, height);
        const isLight = brightness > 128;

        // Основной цвет текста
        ctx.fillStyle = isLight ? '#1a1a1a' : '#ffffff';

        // Добавляем тень или свечение для контраста
        if (isLight) {
            ctx.shadowColor = 'rgba(255, 255, 255, 0.7)';
            ctx.shadowBlur = 3;
        } else {
            ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
            ctx.shadowBlur = 3;
        }

        ctx.fillText(text, x, y);
        ctx.shadowBlur = 0;
    };

    const drawText = async () => {
        await loadFonts();
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const centerX = img.width / 2;
            const centerY = img.height / 2;
            const radius = img.width * 0.25;

            // Название вина
            ctx.textAlign = 'center';
            const nameSize = img.width * 0.08;
            ctx.font = `bold ${nameSize}px Playfair`;
            const lines = splitNameIntoLines(textData.name.toUpperCase(), ctx, img.width * 0.8);

            lines.forEach((line, index) => {
                const y = img.height * 0.15 + (index * nameSize * 1.2);
                const textWidth = ctx.measureText(line).width;
                drawTextWithBackground(
                    ctx,
                    line,
                    centerX,
                    y,
                    textWidth,
                    nameSize
                );
            });

            // Год
            ctx.font = `bold ${img.width * 0.06}px Playfair`;
            const yearY = centerY + radius + (img.height * 0.1);
            const yearWidth = ctx.measureText(textData.year).width;
            drawTextWithBackground(
                ctx,
                textData.year,
                centerX,
                yearY,
                yearWidth,
                img.width * 0.06
            );

            // Характеристики
            const characteristicsY = img.height * 0.88;
            ctx.font = `${img.width * 0.035}px PTSans`;

            // Алкоголь по центру
            drawTextWithBackground(
                ctx,
                `АЛКОГОЛЬ ${textData.alcohol}%`,
                centerX,
                characteristicsY,
                ctx.measureText(`АЛКОГОЛЬ ${textData.alcohol}%`).width,
                img.width * 0.035
            );

            // Сахар под алкоголем
            drawTextWithBackground(
                ctx,
                `САХАР ${textData.sugar} г/л`,
                centerX,
                characteristicsY + img.width * 0.045,
                ctx.measureText(`САХАР ${textData.sugar} г/л`).width,
                img.width * 0.035
            );

            // Сорта винограда - начинаем после характеристик
            const grapesStartY = characteristicsY + img.width * 0.09;
            const grapeLines = formatGrapes(textData.grapes);
            grapeLines.forEach((line, index) => {
                const y = grapesStartY + (index * img.width * 0.04);
                const textWidth = ctx.measureText(line).width;
                drawTextWithBackground(
                    ctx,
                    line,
                    centerX,
                    y,
                    textWidth,
                    img.width * 0.035
                );
            });


            // Добавление разделительной линии
            const drawSeparator = (y) => {
                ctx.beginPath();
                ctx.strokeStyle = ctx.fillStyle; // Использует тот же цвет, что и текст
                ctx.lineWidth = 1;
                const lineWidth = img.width * 0.2;
                ctx.moveTo(centerX - lineWidth/2, y);
                ctx.lineTo(centerX + lineWidth/2, y);
                ctx.stroke();
            };

            // Использование разделителя между характеристиками и сортовым составом
            drawSeparator(grapesStartY - img.width * 0.02);
        };

        img.src = image;
    };

    useEffect(() => {
        if (image) {
            drawText();
        }
    }, [image, textData]);

    return (
        <Box sx={{position: 'relative', width: '100%'}}>
            <canvas
                ref={canvasRef}
                style={{
                    maxWidth: '100%',
                    height: 'auto'
                }}
            />
        </Box>
    );
};

export default TextOverlay;
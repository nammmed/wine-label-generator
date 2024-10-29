import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Typography,
    Grid
} from '@mui/material';

const SeriesGenerator = ({ basePrompt, onGenerate }) => {
    const [seriesNames, setSeriesNames] = useState(['']);
    const [variations, setVariations] = useState(3); // количество вариаций для каждого имени

    const handleAddName = () => {
        setSeriesNames([...seriesNames, '']);
    };

    const handleNameChange = (index, value) => {
        const newNames = [...seriesNames];
        newNames[index] = value;
        setSeriesNames(newNames);
    };

    const handleGenerate = () => {
        // Генерируем серию для каждого имени
        seriesNames.forEach(name => {
            for (let i = 0; i < variations; i++) {
                onGenerate({
                    ...basePrompt,
                    seed: Math.floor(Math.random() * 1000000), // разные сиды для вариаций
                    name: name
                });
            }
        });
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Генерация серии этикеток
            </Typography>

            {seriesNames.map((name, index) => (
                <TextField
                    key={index}
                    fullWidth
                    label={`Название вина ${index + 1}`}
                    value={name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    margin="normal"
                />
            ))}

            <Button onClick={handleAddName}>
                Добавить название
            </Button>

            <TextField
                type="number"
                label="Количество вариаций"
                value={variations}
                onChange={(e) => setVariations(Number(e.target.value))}
                margin="normal"
            />

            <Button
                variant="contained"
                onClick={handleGenerate}
                fullWidth
                sx={{ mt: 2 }}
            >
                Сгенерировать серию
            </Button>
        </Box>
    );
};

export default SeriesGenerator;
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

const SeriesGenerator = ({ basePrompt, seed, onGenerate }) => {
    const [seriesNames, setSeriesNames] = useState(['']);

    const handleAddName = () => {
        setSeriesNames([...seriesNames, '']);
    };

    const handleNameChange = (index, value) => {
        const newNames = [...seriesNames];
        newNames[index] = value;
        setSeriesNames(newNames);
    };

    const handleGenerate = () => {
        // Генерируем этикетки с тем же seed'ом для сохранения стиля
        seriesNames.forEach(name => {
            onGenerate({
                ...basePrompt,
                seed: seed, // используем тот же seed
                name: name
            });
        });
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Создание серии в том же стиле
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
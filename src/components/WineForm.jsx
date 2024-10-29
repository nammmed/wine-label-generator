import React from "react";
import {FormControl, InputLabel, MenuItem, Select, TextField, Button} from "@mui/material";
import GenerationSettings from "./GenerationSettings";
import {styleOptions} from "../constants";

export const WineForm = ({formData, handleChange, generationSettings, handleSettingsChange, loading, onSubmit}) => (
    <form onSubmit={onSubmit}>
        <TextField
            fullWidth
            label="Название вина"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            margin="normal"
        />

        <TextField
            fullWidth
            label="Год"
            name="year"
            type="number"
            value={formData.year}
            onChange={handleChange}
            required
            margin="normal"
            InputProps={{ inputProps: { min: 1900, max: 2100 } }}
        />

        <FormControl fullWidth margin="normal">
            <InputLabel>Стиль этикетки</InputLabel>
            <Select
                name="style"
                value={formData.style}
                onChange={handleChange}
                label="Стиль этикетки"
            >
                {styleOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

        <TextField
            fullWidth
            label="Содержание сахара (г/л)"
            name="sugar"
            type="number"
            value={formData.sugar}
            onChange={handleChange}
            required
            margin="normal"
            InputProps={{ inputProps: { step: 0.1 } }}
        />

        <TextField
            fullWidth
            label="Крепость (%)"
            name="alcohol"
            type="number"
            value={formData.alcohol}
            onChange={handleChange}
            required
            margin="normal"
            InputProps={{ inputProps: { step: 0.1 } }}
        />

        <TextField
            fullWidth
            label="Сортовой состав"
            name="grapes"
            value={formData.grapes}
            onChange={handleChange}
            required
            margin="normal"
        />

        <GenerationSettings
            settings={generationSettings}
            onSettingsChange={handleSettingsChange}
        />

        <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
        >
            {loading ? 'Генерация...' : 'Сгенерировать этикетку'}
        </Button>
    </form>
);
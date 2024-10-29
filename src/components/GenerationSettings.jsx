// Новый компонент src/components/GenerationSettings.js
import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Slider,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const GenerationSettings = ({ settings, onSettingsChange }) => {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Настройки генерации</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <Typography gutterBottom>Количество шагов</Typography>
                    <Slider
                        value={settings.steps}
                        onChange={(e, value) => onSettingsChange('steps', value)}
                        min={20}
                        max={150}
                        valueLabelDisplay="auto"
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <Typography gutterBottom>CFG Scale</Typography>
                    <Slider
                        value={settings.cfg_scale}
                        onChange={(e, value) => onSettingsChange('cfg_scale', value)}
                        min={1}
                        max={20}
                        step={0.5}
                        valueLabelDisplay="auto"
                    />
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel>Сэмплер</InputLabel>
                    <Select
                        value={settings.sampler_name}
                        onChange={(e) => onSettingsChange('sampler_name', e.target.value)}
                        label="Сэмплер"
                    >
                        <MenuItem value="DPM++ 2M Karras">DPM++ 2M Karras</MenuItem>
                        <MenuItem value="Euler a">Euler a</MenuItem>
                        <MenuItem value="DDIM">DDIM</MenuItem>
                    </Select>
                </FormControl>
            </AccordionDetails>
        </Accordion>
    );
};

export default GenerationSettings;
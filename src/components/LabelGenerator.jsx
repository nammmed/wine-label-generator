import React  from 'react';
import {
    Container,
    Paper,
    Alert,
    Typography,
    Divider
} from '@mui/material';
import SavedLabels from './SavedLabels';
import {useWineForm} from "../hooks/useWineForm";
import {useGenerationSettings} from "../hooks/useGenerationSettings";
import {useImageGeneration} from "../hooks/useImageGeneration";
import {useSavedLabels} from "../hooks/useSavedLabels";
import {WineForm} from "./WineForm";
import GeneratedResult from "./GeneratedResult";

const LabelGenerator = () => {
    const { formData, handleChange } = useWineForm();
    const { settings, handleSettingsChange } = useGenerationSettings();
    const { loading, generatedImage, status, generateImage, setStatus, prompt } = useImageGeneration();
    const { savedLabels, saveLabel, deleteLabel } = useSavedLabels();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await generateImage(formData, settings);
    };

    const handleSaveLabel = () => {
        const canvas = document.querySelector('canvas');
        const imageWithText = canvas.toDataURL('image/png');
        saveLabel(imageWithText, formData);
        setStatus({ message: 'Этикетка сохранена!', severity: 'success' });
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Генератор винных этикеток
                </Typography>

                {status.message && (
                    <Alert severity={status.severity} sx={{ mb: 2 }}>
                        {status.message}
                    </Alert>
                )}

                <WineForm
                    formData={formData}
                    handleChange={handleChange}
                    generationSettings={settings}
                    handleSettingsChange={handleSettingsChange}
                    loading={loading}
                    onSubmit={handleSubmit}
                />

                {generatedImage && (
                    <GeneratedResult
                        image={generatedImage}
                        formData={formData}
                        onSave={handleSaveLabel}
                        prompt={prompt}
                    />
                )}

                <Divider sx={{ my: 4 }} />

                <SavedLabels
                    labels={savedLabels}
                    onDelete={deleteLabel}
                />
            </Paper>
        </Container>
    );
};

export default LabelGenerator;
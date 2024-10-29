import React, { useState } from 'react';
import {
    Box,
    Typography,
    Divider,
    Button,
    ButtonGroup,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ShareIcon from '@mui/icons-material/Share';
import TextOverlay from './TextOverlay';
import LabelPreview from './LabelPreview';

const GeneratedResult = ({ image, formData, onSave }) => {
    const [previewOpen, setPreviewOpen] = useState(false);

    const handleDownload = () => {
        const canvas = document.querySelector('canvas');
        const link = document.createElement('a');
        link.download = `wine-label-${formData.name}-${formData.year}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    const handleShare = async () => {
        try {
            const canvas = document.querySelector('canvas');
            const blob = await new Promise(resolve => canvas.toBlob(resolve));
            const file = new File([blob], 'wine-label.png', { type: 'image/png' });

            if (navigator.share) {
                await navigator.share({
                    files: [file],
                    title: `Винная этикетка ${formData.name}`,
                    text: 'Сгенерированная этикетка для вина'
                });
            }
        } catch (error) {
            console.error('Ошибка при попытке поделиться:', error);
        }
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2
            }}>
                <Typography variant="h6">
                    Результат генерации
                </Typography>

                <ButtonGroup size="small">
                    <Tooltip title="Скачать">
                        <IconButton onClick={handleDownload}>
                            <DownloadIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Увеличить">
                        <IconButton onClick={() => setPreviewOpen(true)}>
                            <ZoomInIcon />
                        </IconButton>
                    </Tooltip>
                    {navigator.share && (
                        <Tooltip title="Поделиться">
                            <IconButton onClick={handleShare}>
                                <ShareIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </ButtonGroup>
            </Box>

            <Box sx={{
                display: 'flex',
                gap: 2,
                flexDirection: { xs: 'column', md: 'row' }
            }}>
                <Box sx={{ flex: 1 }}>
                    <TextOverlay
                        image={image}
                        textData={formData}
                    />
                    <Button
                        variant="contained"
                        onClick={onSave}
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Сохранить этикетку
                    </Button>
                </Box>

                <Box sx={{ flex: 1 }}>
                    <LabelPreview data={formData} />
                </Box>
            </Box>

            {/* Диалог для увеличенного предпросмотра */}
            <Dialog
                open={previewOpen}
                onClose={() => setPreviewOpen(false)}
                maxWidth="lg"
                fullWidth
            >
                <DialogTitle>
                    Предпросмотр этикетки
                </DialogTitle>
                <DialogContent>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        p: 2
                    }}>
                        <TextOverlay
                            image={image}
                            textData={formData}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDownload} startIcon={<DownloadIcon />}>
                        Скачать
                    </Button>
                    <Button onClick={() => setPreviewOpen(false)}>
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default GeneratedResult;
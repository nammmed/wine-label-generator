import React from 'react';
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

const SavedLabels = ({ labels, onDelete }) => {
    const [selectedLabel, setSelectedLabel] = React.useState(null);

    const handleDownload = (imageData) => {
        const link = document.createElement('a');
        link.href = imageData;
        link.download = `wine-label-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                Сохраненные этикетки ({labels.length})
            </Typography>
            <Grid container spacing={2}>
                {labels.map((label) => (
                    <Grid item xs={12} sm={6} md={4} key={label.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                image={label.image}
                                alt="Wine Label"
                                sx={{
                                    height: 200,
                                    cursor: 'pointer',
                                    objectFit: 'contain'
                                }}
                                onClick={() => setSelectedLabel(label)}
                            />
                            <CardContent>
                                <Typography variant="body2">
                                    {label.data.name} ({label.data.year})
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    startIcon={<DownloadIcon />}
                                    onClick={() => handleDownload(label.image)}
                                >
                                    Скачать
                                </Button>
                                <Button
                                    size="small"
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => onDelete(label.id)}
                                >
                                    Удалить
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog
                open={!!selectedLabel}
                onClose={() => setSelectedLabel(null)}
                maxWidth="md"
                fullWidth
            >
                {selectedLabel && (
                    <>
                        <DialogTitle>
                            {selectedLabel.data.name} ({selectedLabel.data.year})
                        </DialogTitle>
                        <DialogContent>
                            <img
                                src={selectedLabel.image}
                                alt="Wine Label"
                                style={{ width: '100%', height: 'auto' }}
                            />
                            <Typography variant="body1" sx={{ mt: 2 }}>
                                Сорта: {selectedLabel.data.grapes}
                            </Typography>
                            <Typography variant="body2">
                                Сахар: {selectedLabel.data.sugar} г/л
                            </Typography>
                            <Typography variant="body2">
                                Алкоголь: {selectedLabel.data.alcohol}%
                            </Typography>
                        </DialogContent>
                    </>
                )}
            </Dialog>
        </>
    );
};

export default SavedLabels;
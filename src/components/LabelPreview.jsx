import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const LabelPreview = ({ data }) => {
    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                mt: 2,
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.9)'
            }}
        >
            <Typography variant="h5">{data.name}</Typography>
            <Typography variant="h6">{data.year}</Typography>
            <Box sx={{ mt: 1 }}>
                <Typography>Сахар: {data.sugar} г/л</Typography>
                <Typography>Алкоголь: {data.alcohol}%</Typography>
                <Typography>Сорта: {data.grapes}</Typography>
            </Box>
        </Paper>
    );
};

export default LabelPreview;
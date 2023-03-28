import express from 'express';

import { PdfService } from './pdf.service';

export const pdfController = express.Router();

pdfController.post('/', async (req, res) => {
    const { body } = req;

    // if body is empty, thorw error
    if (!body) {
        res.status(400).send({
            message: 'content can not be empty',
        });
    }

    const { html } = body;

    // if html is empty, thorw error
    if (!html) {
        res.status(400).send({
            message: 'html can not be empty',
        });
    }

    try {
        const base64pdf = await PdfService.generatePdfFromHtml({ html });

        return res.status(200).send({
            base64pdf,
        });
    } catch (error: any) {
        res.status(500).send({
            message: error.message || 'Some error occurred while generating PDF.',
        });
    }
});
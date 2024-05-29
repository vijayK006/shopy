import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const generatePDF = () => {
    const billContent = document.getElementById('billContent').innerHTML;
    const pdfContent = htmlToPdfmake(billContent);
    const documentDefinition = { content: pdfContent };
    pdfMake.createPdf(documentDefinition).download('bill.pdf');
};

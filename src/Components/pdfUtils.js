// import htmlToPdfmake from 'html-to-pdfmake';
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// export const generatePDF = () => {
//     const billContent = document.getElementById('billContent').innerHTML;
//     const pdfContent = htmlToPdfmake(billContent);
//     const documentDefinition = { content: pdfContent };
//     pdfMake.createPdf(documentDefinition).download('bill.pdf');
// };

// // pdfUtils.js
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// export const generatePDF = () => {
//     const input = document.getElementById('billContent');
//     html2canvas(input, { scale: 2 }).then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF('p', 'mm', 'a4');
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const imgWidth = canvas.width;
//         const imgHeight = canvas.height;
        
//         const ratio = imgHeight / imgWidth;
//         const pdfHeight = pdfWidth * ratio;

//         pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//         pdf.save('bill.pdf');
//     });
// };


// pdfUtils.js
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePDF = () => {
    const input = document.getElementById('billContent');

    // Ensure all styles are applied before capturing
    window.scrollTo(0, 0);
    input.style.display = 'block';
    
    html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        
        const ratio = imgHeight / imgWidth;
        const pdfHeight = pdfWidth * ratio;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('bill.pdf');
    });
};

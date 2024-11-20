import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useEffect, useState } from 'react';
import { useForm } from '../../context/FormContext';
import { PDFDocument } from 'pdf-lib';

async function compressPDF(pdfBlob: Blob): Promise<Blob> {
  // Convert Blob to ArrayBuffer
  const arrayBuffer = await pdfBlob.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);

  // Load the PDF document
  const pdfDoc = await PDFDocument.load(uint8Array);

  // Compress the PDF (optional setting like useObjectStreams: false reduces file size)
  const compressedPdf = await pdfDoc.save({ useObjectStreams: false });

  // Return as a new Blob
  return new Blob([compressedPdf], { type: 'application/pdf' });
}

export const useDownloadAsPDF = () => {
  const { formData, divRef, spanRef } = useForm();

  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [chartHeight, setChartHeight] = useState(0);

  const { domain, phase, projectDetails, clientDetails } = formData;

  useEffect(() => {
    if (spanRef?.current?.offsetHeight)
      setChartHeight(spanRef?.current?.offsetHeight + 50);
  }, [spanRef.current]);

  const downloadAsPDF = async () => {
    if (!divRef.current || !spanRef.current) return;

    const element: HTMLElement | null = document.querySelector(
      '#gantt-chart-container'
    );

    const spanElement: HTMLElement | null = document.querySelector(
      '#gantt-chart-content-wrapper'
    );

    if (element !== null && spanElement !== null) {
      setLoading(true);
      const originalOverflow = element.style.overflow;
      const originalOverflowSpan = spanElement.style.overflow;
      element.style.overflow = 'visible';
      spanElement.style.overflow = 'visible';
      await html2canvas(element, {
        scale: 2, // Increase scale for better quality
        width: element.scrollWidth, // Ensure you're capturing the full width
        height: element.scrollHeight // Capture full height of the content
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [element.scrollWidth, element.scrollHeight] // Adjust height as needed
        });

        pdf.addImage(
          imgData,
          'PNG',
          0,
          0,
          element.scrollWidth,
          element.scrollHeight
        ); // Match the width and height
        const fileName =
          projectDetails?.projectName &&
          domain?.projectDomain &&
          phase?.projectStage
            ? projectDetails?.projectName +
              '-' +
              domain?.projectDomain +
              '-' +
              phase?.projectStage
            : 'gantt-chart';
        pdf.save(`${fileName.toLowerCase()}.pdf`);
        element.style.overflow = originalOverflow;
        spanElement.style.overflow = originalOverflowSpan;
        setLoading(false);
      });
    }
  };

  const sendEmailWithAttachment = async () => {
    if (isEmailSent) return;
    if (!divRef.current || !spanRef.current) return;

    const element = document.querySelector<HTMLElement>(
      '#gantt-chart-container'
    );
    const spanElement = document.querySelector<HTMLElement>(
      '#gantt-chart-content-wrapper'
    );

    if (element && spanElement) {
      setLoading(true);
      const originalOverflow = element.style.overflow;
      const originalOverflowSpan = spanElement.style.overflow;

      // Temporarily set overflow to 'visible' for full capture
      element.style.overflow = 'visible';
      spanElement.style.overflow = 'visible';

      // Capture with full dimensions
      const canvas = await html2canvas(element, {
        scale: 1, // Increase for higher resolution
        width: element.scrollWidth,
        height: element.scrollHeight
      });

      const imgData = canvas.toDataURL('image/png', 0.5);

      // Calculate the appropriate page size
      const pageWidth = canvas.width / 3.5; // Adjust scale for width
      const pageHeight = canvas.height / 3.5; // Adjust scale for height
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [pageWidth, pageHeight] // Custom page dimensions
      });

      pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
      const pdfBlob = pdf.output('blob');

      // Revert overflow settings after capture
      element.style.overflow = originalOverflow;
      spanElement.style.overflow = originalOverflowSpan;
      setLoading(false);

      const fileName =
        projectDetails?.projectName &&
        domain?.projectDomain &&
        phase?.projectStage
          ? projectDetails?.projectName +
            '-' +
            domain?.projectDomain +
            '-' +
            phase?.projectStage
          : 'gantt-chart';

      // Send the PDF to the server
      const formData = new FormData();
      const compressedPDFBlob = await compressPDF(pdfBlob);
      formData.append(
        'attachment',
        compressedPDFBlob,
        `${fileName.toLowerCase()}.pdf`
      );
      formData.append('email', clientDetails?.clientEmail || '');
      formData.append('name', clientDetails?.clientName || '');

      const htmlMessage = `
        <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">
          <p>Namaste! ${clientDetails?.clientName || 'Client'},</p>
          <p>Your roadmap for your <strong>${
            projectDetails?.projectName
          }</strong> is attached with this email.</p>
          <p>Thank you for reaching out! We are excited to collaborate with your <strong>${
            projectDetails?.projectName
          }.</strong></p>
          <p>Kindly book your free consultation call with our Design Team for more inputs.</p>
          <p><strong>Apptware Design Team</strong></p>
        </div>
      `;

      formData.append('message', htmlMessage);

      await fetch('http://localhost:3001/send-email', {
        method: 'POST',
        body: formData
      }).then((response) => {
        if (response.ok) {
          console.info('Email sent successfully');
          setIsEmailSent(true);
        } else {
          console.error('Failed to send email');
        }
      });
    }
  };

  return {
    downloadAsPDF,
    loading,
    divRef,
    spanRef,
    sendEmailWithAttachment,
    chartHeight
  };
};

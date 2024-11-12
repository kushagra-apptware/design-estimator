import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef, useState } from 'react';
import { useForm } from '../../context/FormContext';

export const useDownloadAsPDF = () => {
  const { formData } = useForm();

  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const divRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLDivElement>(null);

  const { domain, phase, projectDetails, clientDetails } = formData;

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
    if(isEmailSent) return;
    if (!divRef.current || !spanRef.current) return;
    const canvas = await html2canvas(divRef.current);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('landscape');
    (pdf as any).addImage(imgData, 'PNG', 0, 0);
    const pdfBlob = pdf.output('blob');

    // Send PDF to server
    const formData = new FormData();
    formData.append('attachment', pdfBlob, 'gantt-chart.pdf');
    formData.append('email', clientDetails?.clientEmail || ''); // Add email address
    formData.append('name', clientDetails?.clientName || ''); // Add email address
    formData.append('message', 'Hello from Design Estimator'); // Add email address

    await fetch('http://localhost:3001/send-email', {
      method: 'POST',
      body: formData
    }).then((response) => {
      if (response.ok) {
        console.info('Email sent successfully')
        setIsEmailSent(true);
      } else {
        console.error('Failed to send email');
      }
    });
  };

  return {
    downloadAsPDF,
    loading,
    divRef,
    spanRef,
    sendEmailWithAttachment
  };
};

'use client';
import React, { useRef, useEffect, useState } from 'react';
import FloatingButton from "@/app/components/floatingButton";

const PdfShower = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showPdf, setShowPdf] = useState(false);

  useEffect(() => {
    const loadPdf = async () => {
      if (showPdf && containerRef.current) {
        console.log('🔄 Cargando PSPDFKit...');
        const module = await import('pspdfkit');
        const PSPDFKit = module.default;

        if (PSPDFKit) {
          await PSPDFKit.load({
            container: containerRef.current,
            document: '/documents/letter.pdf',
            baseUrl: `${window.location.protocol}//${window.location.host}/`,
          }).catch(error => console.error('Error loading PSPDFKit:', error));
        }
      }
    };

    loadPdf();

    return () => {
      if (containerRef.current) {
        console.log('♻️ Descargando PSPDFKit...');
        import('pspdfkit').then((module) => {
          const PSPDFKit = module.default;
          PSPDFKit.unload(containerRef.current);
        });
      }
    };
  }, [showPdf]); // Se ejecuta cada vez que showPdf cambia

  return (
    <div>
      <FloatingButton onClick={() => setShowPdf(!showPdf)} />
      {showPdf && <div ref={containerRef} style={{ height: '100vh' }} className="z-30" />}
    </div>
  );
};

export default PdfShower;

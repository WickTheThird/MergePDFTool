import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";

const App = () => {
  const [files, setFiles] = useState([]);
  const [mergedFile, setMergedFile] = useState(null);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleMerge = async () => {
    if (files.length === 0) {
      alert("Please upload PDF files to merge.");
      return;
    }

    try {
      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const donorPdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await pdfDoc.copyPages(
          donorPdf,
          donorPdf.getPageIndices()
        );
        copiedPages.forEach((page) => pdfDoc.addPage(page));
      }

      const mergedPdfBytes = await pdfDoc.save();
      const mergedBlob = new Blob([mergedPdfBytes], {
        type: "application/pdf",
      });
      const mergedUrl = URL.createObjectURL(mergedBlob);

      setMergedFile(mergedUrl);
    } catch (error) {
      console.error("Error merging PDFs:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Merge PDFs</h1>
      <input
        type="file"
        multiple
        accept="application/pdf"
        onChange={handleFileChange}
      />
      <button onClick={handleMerge} disabled={files.length === 0}>
        Merge PDFs
      </button>
      {mergedFile && (
        <div>
          <h3>Merged PDF</h3>
          <a href={mergedFile} download="merged_output.pdf">
            Download Merged PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default App;

import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

export async function exportResumeAsPDF(
  node: HTMLElement | null,
  filename = "cv"
) {
  if (!node) return;

  const canvas = await html2canvas(node, {
    scale: 2,
    useCORS: true,
    height: node.scrollHeight,
    windowHeight: node.scrollHeight,
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const margin = 15; // padding on all pages
  const usablePageHeight = pageHeight - margin * 2;
  const imgWidth = pageWidth - margin * 2;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  if (imgHeight <= usablePageHeight) {
    // Fits on one page
    pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);
  } else {
    // Multi-page handling
    let pageNumber = 0;
    let sourceY = 0;
    const pageCanvas = document.createElement("canvas");
    const pageCtx = pageCanvas.getContext("2d");

    // Height of slice in source canvas pixels
    const sliceHeightPx = (usablePageHeight / imgHeight) * canvas.height;

    while (sourceY < canvas.height) {
      const remainingHeight = canvas.height - sourceY;
      const currentSliceHeight = Math.min(sliceHeightPx, remainingHeight);

      pageCanvas.width = canvas.width;
      pageCanvas.height = currentSliceHeight;

      if (pageCtx) {
        pageCtx.clearRect(0, 0, pageCanvas.width, pageCanvas.height);
        pageCtx.drawImage(
          canvas,
          0,
          sourceY,
          canvas.width,
          currentSliceHeight,
          0,
          0,
          canvas.width,
          currentSliceHeight
        );
      }

      const pageImgData = pageCanvas.toDataURL("image/png");

      if (pageNumber > 0) pdf.addPage();
      pdf.addImage(
        pageImgData,
        "PNG",
        margin,
        margin,
        imgWidth,
        (currentSliceHeight / canvas.width) * imgWidth
      );

      sourceY += currentSliceHeight;
      pageNumber++;
    }
  }

  pdf.save(`${filename}.pdf`);
}

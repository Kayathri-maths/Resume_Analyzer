import pdfToText from "react-pdftotext";

export const extractTextFromPdf = async (file) => {
  try {
    return await pdfToText(file);
  } catch (err) {
    throw new Error("Failed to read PDF");
  }
};

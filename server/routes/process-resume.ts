import { RequestHandler } from "express";
import { ProcessResumeResponse } from "@shared/api";


function extractEmail(text: string): string {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const match = text.match(emailRegex);
  return match ? match[0] : "";
}

export const handleProcessResume: RequestHandler = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const buffer = req.file.buffer;

    // Extract text from PDF
    let extractedText = "";
    try {
      // Simple approach: convert buffer to string and search for email
      extractedText = buffer.toString("utf-8", 0, Math.min(buffer.length, 100000));
    } catch {
      // If UTF-8 extraction fails, try latin1
      extractedText = buffer.toString("latin1", 0, Math.min(buffer.length, 100000));
    }

    // Extract email from text
    const email = extractEmail(extractedText);

    if (!email) {
      res.status(400).json({ error: "Could not extract email from resume" });
      return;
    }

    const response: ProcessResumeResponse = {
      email,
      fileName: req.file.originalname,
    };

    res.json(response);
  } catch (error) {
    console.error("Error processing resume:", error);
    res.status(500).json({ error: "Failed to process resume" });
  }
};

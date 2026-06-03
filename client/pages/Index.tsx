import { useState, useRef } from "react";
import { Upload, FileText, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { ProcessResumeResponse } from "@shared/api";

export default function Index() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProcessResumeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setError(null);
      } else {
        setError("Please upload a PDF file");
        setFile(null);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
        setError(null);
      } else {
        setError("Please upload a PDF file");
        setFile(null);
      }
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch("/api/process-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process resume");
      }

      const data: ProcessResumeResponse = await response.json();
      setResult(data);
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred processing your resume"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Resume Agent
            </h1>
            <p className="text-xl text-gray-600 max-w-xl mx-auto">
              Upload your resume and we'll automatically extract your email, then send you the job description and assessment materials.
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            {result ? (
              // Success State
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-green-100 rounded-full">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Resume Processed Successfully!
                </h2>
                <p className="text-gray-600 mb-6">
                  We've extracted your email from "{result.fileName}"
                </p>
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 mb-8">
                  <p className="text-sm text-gray-600 mb-2">Extracted Email</p>
                  <p className="text-lg font-semibold text-purple-600 break-all">
                    {result.email}
                  </p>
                </div>
                <p className="text-gray-600 mb-8">
                  We're now sending you the job description (PDF) and assessment materials (Excel) to this email address.
                </p>
                <button
                  onClick={() => {
                    setResult(null);
                    setFile(null);
                  }}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200"
                >
                  Process Another Resume
                </button>
              </div>
            ) : (
              <>
                {/* Upload Area */}
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-gray-300 hover:border-purple-400 rounded-xl p-8 md:p-12 text-center transition-colors duration-200 cursor-pointer bg-gray-50 hover:bg-purple-50"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-purple-100 rounded-full">
                      <Upload className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Upload Your Resume
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Drag and drop your PDF resume here, or click to browse
                  </p>
                  <p className="text-sm text-gray-500">
                    {file ? file.name : "PDF format only"}
                  </p>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-red-800">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="mt-8">
                  <button
                    onClick={handleSubmit}
                    disabled={!file || loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin">
                          <FileText className="w-5 h-5" />
                        </div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5" />
                        Process Resume & Send Materials
                      </>
                    )}
                  </button>
                </div>

                {/* Info Section */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="inline-block p-2 bg-purple-100 rounded-lg mb-3">
                      <FileText className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Extract Email</h4>
                    <p className="text-sm text-gray-600">
                      We automatically find your email from the resume
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="inline-block p-2 bg-blue-100 rounded-lg mb-3">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Send Materials</h4>
                    <p className="text-sm text-gray-600">
                      Receive job description PDF and assessment Excel
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="inline-block p-2 bg-purple-100 rounded-lg mb-3">
                      <CheckCircle2 className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Instant Delivery</h4>
                    <p className="text-sm text-gray-600">
                      Get everything within minutes
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

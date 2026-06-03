import { useState, useRef } from "react";
import { Upload, File as FileIcon, Eye, ChevronDown } from "lucide-react";

interface FormData {
  resume: File | null;
  jdFile: File | null;
  assessmentFile: File | null;
  subject: string;
  emailBody: string;
  smtpHost: string;
  smtpPort: string;
  smtpUser: string;
  smtpPassword: string;
  toEmail: string;
}

export default function Index() {
  const [formData, setFormData] = useState<FormData>({
    resume: null,
    jdFile: null,
    assessmentFile: null,
    subject: "Exciting Opportunity — JD & Assessment Enclosed",
    emailBody: `Hi,

Thank you for your interest in the role. Please find attached:
1. Job Description — overview of responsibilities and requirements
2. Assessment — please complete and return within 3 business days

Looking forward to hearing from you.

Best regards,
The Hiring Team`,
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUser: "your@gmail.com",
    smtpPassword: "",
    toEmail: "your@email.com",
  });

  const resumeInputRef = useRef<HTMLInputElement>(null);
  const jdInputRef = useRef<HTMLInputElement>(null);
  const assessmentInputRef = useRef<HTMLInputElement>(null);

  const handleFileInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "resume" | "jdFile" | "assessmentFile"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [type]: file,
      }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (
    e: React.DragEvent,
    type: "resume" | "jdFile" | "assessmentFile"
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [type]: file,
      }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    // API call would go here
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-xs text-lime-400 font-mono mb-2">
            v0.1 • python • repos • 100% local
          </div>
          <h1 className="text-4xl font-bold text-white mb-1">
            Resume <span className="text-lime-400">Email</span> Agent
          </h1>
          <p className="text-sm text-gray-400">
            python + repos + email - fully independent
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. Upload Resume */}
          <div className="border border-gray-700 rounded-lg p-6 bg-slate-800/50">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center text-xs text-gray-400">
                1
              </span>
              <h2 className="text-lg font-semibold text-white uppercase tracking-wide text-sm">
                Upload Resume
              </h2>
            </div>

            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "resume")}
              onClick={() => resumeInputRef.current?.click()}
              className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-gray-600 transition-colors bg-slate-900/50"
            >
              <FileIcon className="w-8 h-8 text-gray-500 mx-auto mb-3" />
              <p className="text-gray-400 mb-1">
                Drop PDF or DOCX here
              </p>
              <p className="text-xs text-gray-600">click to browse - pdf, docx supported</p>
              {formData.resume && (
                <p className="mt-3 text-lime-400 text-sm">{formData.resume.name}</p>
              )}
              <input
                ref={resumeInputRef}
                type="file"
                onChange={(e) => handleFileInput(e, "resume")}
                className="hidden"
                accept=".pdf,.docx,.doc"
              />
            </div>
          </div>

          {/* 2. Attachments */}
          <div className="border border-gray-700 rounded-lg p-6 bg-slate-800/50">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center text-xs text-gray-400">
                2
              </span>
              <h2 className="text-lg font-semibold text-white uppercase tracking-wide text-sm">
                Attachments
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* JD File */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase tracking-wide">
                  JD Description
                </label>
                <div
                  onClick={() => jdInputRef.current?.click()}
                  className="border border-gray-700 rounded p-4 text-center cursor-pointer hover:border-gray-600 transition-colors bg-slate-900/50"
                >
                  <p className="text-sm text-gray-400">
                    + attach jd <span className="text-gray-600">no file</span>
                  </p>
                  {formData.jdFile && (
                    <p className="mt-2 text-lime-400 text-xs">{formData.jdFile.name}</p>
                  )}
                  <input
                    ref={jdInputRef}
                    type="file"
                    onChange={(e) => handleFileInput(e, "jdFile")}
                    className="hidden"
                    accept=".pdf"
                  />
                </div>
              </div>

              {/* Assessment File */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase tracking-wide">
                  Assessment File
                </label>
                <div
                  onClick={() => assessmentInputRef.current?.click()}
                  className="border border-gray-700 rounded p-4 text-center cursor-pointer hover:border-gray-600 transition-colors bg-slate-900/50"
                >
                  <p className="text-sm text-gray-400">
                    + attach assessment <span className="text-gray-600">no file</span>
                  </p>
                  {formData.assessmentFile && (
                    <p className="mt-2 text-lime-400 text-xs">{formData.assessmentFile.name}</p>
                  )}
                  <input
                    ref={assessmentInputRef}
                    type="file"
                    onChange={(e) => handleFileInput(e, "assessmentFile")}
                    className="hidden"
                    accept=".xlsx,.xls,.csv"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Email Content */}
          <div className="border border-gray-700 rounded-lg p-6 bg-slate-800/50">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center text-xs text-gray-400">
                3
              </span>
              <h2 className="text-lg font-semibold text-white uppercase tracking-wide text-sm">
                Email Content
              </h2>
            </div>

            <div className="space-y-4">
              {/* Subject Line */}
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wide block mb-2">
                  Subject Line
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-gray-600"
                />
              </div>

              {/* Email Body */}
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wide block mb-2">
                  Email Body
                </label>
                <textarea
                  name="emailBody"
                  value={formData.emailBody}
                  onChange={handleInputChange}
                  rows={8}
                  className="w-full bg-slate-900 border border-lime-500 rounded px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-lime-400 resize-none"
                />
              </div>
            </div>
          </div>

          {/* 4. Gmail SMTP Config */}
          <div className="border border-gray-700 rounded-lg p-6 bg-slate-800/50">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center text-xs text-gray-400">
                4
              </span>
              <h2 className="text-lg font-semibold text-white uppercase tracking-wide text-sm">
                Gmail SMTP Config
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* SMTP Host */}
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wide block mb-2">
                  SMTP Host
                </label>
                <input
                  type="text"
                  name="smtpHost"
                  value={formData.smtpHost}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-gray-600"
                />
              </div>

              {/* SMTP Port */}
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wide block mb-2">
                  SMTP Port
                </label>
                <input
                  type="text"
                  name="smtpPort"
                  value={formData.smtpPort}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-gray-600"
                />
              </div>

              {/* SMTP User */}
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wide block mb-2">
                  Your Email Address
                </label>
                <input
                  type="email"
                  name="smtpUser"
                  value={formData.smtpUser}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-gray-600"
                />
              </div>

              {/* SMTP Password */}
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wide block mb-2">
                  App Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="smtpPassword"
                    value={formData.smtpPassword}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-gray-600"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <a href="#" className="text-xs text-lime-400 hover:text-lime-300 mt-1 inline-block">
                    Generate App Password
                  </a>
                </div>
              </div>

              {/* To Email */}
              <div className="col-span-2">
                <label className="text-xs text-gray-400 uppercase tracking-wide block mb-2">
                  Their Email Address
                </label>
                <input
                  type="email"
                  name="toEmail"
                  value={formData.toEmail}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-gray-600"
                />
              </div>
            </div>
          </div>

          {/* 5. Send Button */}
          <div className="flex items-center gap-2 px-6 py-4">
            <span className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center text-xs text-gray-400">
              5
            </span>
            <h2 className="text-lg font-semibold text-white uppercase tracking-wide text-sm">
              Send
            </h2>
          </div>

          <button
            type="submit"
            className="w-full bg-lime-500 hover:bg-lime-600 text-slate-900 font-semibold py-3 rounded-lg transition-colors uppercase tracking-wide"
          >
            • Extract Email & Send
          </button>
        </form>

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-gray-600">
          <p>made with ❤️ by Zeno Cyber</p>
        </div>
      </div>
    </div>
  );
}

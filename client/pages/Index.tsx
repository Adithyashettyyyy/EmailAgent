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
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-900 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-48 md:h-64 bg-white transform -skew-y-2"></div>
      <div className="relative py-6 md:py-8 px-4 md:px-6 z-10">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="text-xs text-white font-mono mb-2 opacity-90">
            v0.1 • python • repos • 100% local
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
            Resume <span className="text-white">Email</span> Agent
          </h1>
          <p className="text-xs md:text-sm text-white opacity-90">
            python + repos + email - fully independent
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* 1. Upload Resume */}
          <div className="border border-white/20 rounded-lg p-4 md:p-6 bg-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center text-xs text-white flex-shrink-0">
                1
              </span>
              <h2 className="text-base md:text-lg font-semibold text-white uppercase tracking-wide">
                Upload Resume
              </h2>
            </div>

            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "resume")}
              onClick={() => resumeInputRef.current?.click()}
              className="border-2 border-dashed border-white/20 rounded-lg p-6 md:p-8 text-center cursor-pointer hover:border-white/40 transition-colors bg-white/5"
            >
              <FileIcon className="w-6 md:w-8 h-6 md:h-8 text-white/50 mx-auto mb-2 md:mb-3" />
              <p className="text-white/80 mb-1 text-sm md:text-base">
                Drop PDF or DOCX here
              </p>
              <p className="text-xs text-white/60">click to browse - pdf, docx supported</p>
              {formData.resume && (
                <p className="mt-2 md:mt-3 text-white text-xs md:text-sm font-semibold truncate">{formData.resume.name}</p>
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
          <div className="border border-white/20 rounded-lg p-4 md:p-6 bg-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center text-xs text-white flex-shrink-0">
                2
              </span>
              <h2 className="text-base md:text-lg font-semibold text-white uppercase tracking-wide">
                Attachments
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {/* JD File */}
              <div className="space-y-2">
                <label className="text-xs text-white/70 uppercase tracking-wide">
                  JD Description
                </label>
                <div
                  onClick={() => jdInputRef.current?.click()}
                  className="border border-white/20 rounded p-3 md:p-4 text-center cursor-pointer hover:border-white/40 transition-colors bg-white/5 min-h-16 flex flex-col items-center justify-center"
                >
                  <p className="text-xs md:text-sm text-white/70">
                    + attach jd <span className="text-white/40">no file</span>
                  </p>
                  {formData.jdFile && (
                    <p className="mt-1 md:mt-2 text-white text-xs font-semibold truncate w-full px-1">{formData.jdFile.name}</p>
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
                <label className="text-xs text-white/70 uppercase tracking-wide">
                  Assessment File
                </label>
                <div
                  onClick={() => assessmentInputRef.current?.click()}
                  className="border border-white/20 rounded p-3 md:p-4 text-center cursor-pointer hover:border-white/40 transition-colors bg-white/5 min-h-16 flex flex-col items-center justify-center"
                >
                  <p className="text-xs md:text-sm text-white/70">
                    + attach assessment <span className="text-white/40">no file</span>
                  </p>
                  {formData.assessmentFile && (
                    <p className="mt-1 md:mt-2 text-white text-xs font-semibold truncate w-full px-1">{formData.assessmentFile.name}</p>
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
          <div className="border border-white/20 rounded-lg p-6 bg-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center text-xs text-white">
                3
              </span>
              <h2 className="text-lg font-semibold text-white uppercase tracking-wide text-sm">
                Email Content
              </h2>
            </div>

            <div className="space-y-4">
              {/* Subject Line */}
              <div>
                <label className="text-xs text-white/70 uppercase tracking-wide block mb-2">
                  Subject Line
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                />
              </div>

              {/* Email Body */}
              <div>
                <label className="text-xs text-white/70 uppercase tracking-wide block mb-2">
                  Email Body
                </label>
                <textarea
                  name="emailBody"
                  value={formData.emailBody}
                  onChange={handleInputChange}
                  rows={8}
                  className="w-full bg-white/10 border border-white/30 rounded px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/50 resize-none"
                />
              </div>
            </div>
          </div>

          {/* 4. Gmail SMTP Config */}
          <div className="border border-white/20 rounded-lg p-6 bg-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center text-xs text-white">
                4
              </span>
              <h2 className="text-lg font-semibold text-white uppercase tracking-wide text-sm">
                Gmail SMTP Config
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* SMTP Host */}
              <div>
                <label className="text-xs text-white/70 uppercase tracking-wide block mb-2">
                  SMTP Host
                </label>
                <input
                  type="text"
                  name="smtpHost"
                  value={formData.smtpHost}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                />
              </div>

              {/* SMTP Port */}
              <div>
                <label className="text-xs text-white/70 uppercase tracking-wide block mb-2">
                  SMTP Port
                </label>
                <input
                  type="text"
                  name="smtpPort"
                  value={formData.smtpPort}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                />
              </div>

              {/* SMTP User */}
              <div>
                <label className="text-xs text-white/70 uppercase tracking-wide block mb-2">
                  Your Email Address
                </label>
                <input
                  type="email"
                  name="smtpUser"
                  value={formData.smtpUser}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                />
              </div>

              {/* SMTP Password */}
              <div>
                <label className="text-xs text-white/70 uppercase tracking-wide block mb-2">
                  App Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="smtpPassword"
                    value={formData.smtpPassword}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <a href="#" className="text-xs text-white/70 hover:text-white mt-1 inline-block">
                    Generate App Password
                  </a>
                </div>
              </div>

              {/* To Email */}
              <div className="col-span-2">
                <label className="text-xs text-white/70 uppercase tracking-wide block mb-2">
                  Their Email Address
                </label>
                <input
                  type="email"
                  name="toEmail"
                  value={formData.toEmail}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                />
              </div>
            </div>
          </div>

          {/* 5. Send Button */}
          <div className="flex items-center gap-2 px-6 py-4">
            <span className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center text-xs text-white">
              5
            </span>
            <h2 className="text-lg font-semibold text-white uppercase tracking-wide text-sm">
              Send
            </h2>
          </div>

          <button
            type="submit"
            className="w-full bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 rounded-lg transition-colors uppercase tracking-wide"
          >
            • Extract Email & Send
          </button>
        </form>

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-white/50">
          <p>made with ❤️ by Zeno Cyber</p>
        </div>
      </div>
      </div>
    </div>
  );
}

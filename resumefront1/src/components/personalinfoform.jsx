import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User } from "lucide-react";
import React, { useEffect, useState } from "react";

const PersonalInfoForm = ({ data, onChange, removeBackground, setRemoveBackground }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const fields = [
    { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
    { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
    { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url" },
    { key: "website", label: "Personal Website", icon: Globe, type: "url" }
  ];

  useEffect(() => {
    if (data.image && typeof data.image === "object") {
      const url = URL.createObjectURL(data.image);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url); // cleanup old URL
    } else if (typeof data.image === "string") {
      setPreviewUrl(data.image);
    } else {
      setPreviewUrl(null);
    }
  }, [data.image]);

  return (
    <div>
  <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
  <p className="text-sm text-gray-600">Get started with your personal information</p>

  {/* CHANGE THIS ROW INTO GRID */}
  <div className="grid grid-cols-2 gap-6 mt-4">

    {fields.map(field => {
      const Icon = field.icon;

      return (
        <div key={field.key} className="space-y-1 mt-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <Icon className="size-4" />
            {field.label}
            {field.required && <span className="text-red-500">*</span>}
          </label>

          <input
            type={field.type}
            value={data[field.key] || ""}
            onChange={e => handleChange(field.key, e.target.value)}
            placeholder={`Enter your ${field.label.toLowerCase()}`}
            required={field.required}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg 
                      focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none 
                      transition-colors text-sm"
          />
        </div>
      );
    })}

  </div>
</div>

  );
} ;

export default PersonalInfoForm;



import React from "react";
import ClassicTemplate from "./templates/classictemplate";
import ModernTemplate from "./templates/moderntemplate";
import MinimalimageTemplate from "./templates/minimalimagetemplate";
import MinimalTemplate from "./templates/minimaltemplate";

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
    const renderTemplate = () => {
    switch (template) {
        case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
        case "minimalimage":
        return <MinimalimageTemplate data={data} accentColor={accentColor} />;
        case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
        default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
    };

  return (
    <div className="w-full bg-gray-100">
      <div
        id="resume-preview"
        className={`border border-gray-200 print:shadow-none print:border-none ${classes}`}>
        {renderTemplate()}
      </div>

      <style jsx>{`
  @page {
    size: letter;
    margin: 0;
  }

  @media print {
    html,
    body {
      width: 8.5in;
      height: 11in;
      overflow: hidden;
      margin: 0;
      padding: 0;
    }

    body * {
      visibility: hidden !important;
    }

    #resume-preview,
    #resume-preview * {
      visibility: visible !important;
    }

    #resume-preview {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: auto;
      box-shadow: none !important;
      border: none !important;
      margin: 0;
      padding: 0;
    }
  }
`}</style>
    </div>
  );
};

export default ResumePreview;
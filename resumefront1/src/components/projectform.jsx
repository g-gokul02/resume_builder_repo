import { Plus, Trash2 } from "lucide-react";
import React from "react";

const ProjectForm = ({ data, onChange }) => {

    const addProject = () => {
    const newProject = {
      title: "",
      type: "",
      description: ""
    };

    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };
    return(
        <div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Projects
          </h3>

          <p className="text-sm text-gray-500">
            Add your projects
          </p>
        </div>

        <button
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Projects
        </button>
      </div>


        <div className="space-y-4 mt-6">
          {data.map((project, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4 className="text-base font-medium">
                  Project #{index + 1}
                </h4>

                <button
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid gap-3">
                <input
                  value={project.title || ""}
                  onChange={(e) =>
                    updateProject(index, "title", e.target.value)
                  }
                  type="text"
                  placeholder="project title"
                  className=" px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-purple-500 focus:border-purple-500  "
                />
                <input
                  value={project.type || ""}
                  onChange={(e) =>
                    updateProject(index, "type", e.target.value)
                  }
                  type="text"
                    placeholder="project type"
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-purple-500 focus:border-purple-500 "
                />

                <textarea rows={4}
                  value={project.description || ""}
                  onChange={(e) =>
                    updateProject(index, "description", e.target.value)
                  }
                    placeholder="Describe your project"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none focus:ring focus:ring-purple-500 focus:border-purple-500 "
                />
                </div>
            </div>
          ))}
        </div>
    </div>
    )};

export default ProjectForm;
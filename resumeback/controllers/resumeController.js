import Resume from "../models/Resume.js";

// controller for creating a new resume
// POST: /api/resumes/create

export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    // create new resume
    const newResume = await Resume.create({
      userId,
      title
    });

    return res.status(201).json({
      message: "Resume created successfully",
      resume: newResume,
    });


  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for deleting a resume
// DELETE: /api/resumes/delete

export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;

    const { resumeId } = req.params;

    await Resume.findOneAndDelete({ userId, _id: resumeId });

    // return success message
    return res.status(200).json({ message: 'Resume deleted successfully' });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for getting all resumes of a user
// GET: /api/resumes/get

export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;

    const { resumeId } = req.params;

    const resume = await Resume.findOne({ userId, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // remove fields
    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;

    return res.status(200).json({ resume });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


// GET: /api/resumes/public

export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ public: true, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ resume });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for updating a resume
// PUT: /api/resumes/update
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;

    const { resumeId, resumeData } = req.body;


    let resumeDataCopy;

if (typeof resumeData === 'string') {
  resumeDataCopy = JSON.parse(resumeData);
} else {
  resumeDataCopy = structuredClone(resumeData);
}

    const resume = await Resume.findOneAndUpdate(
      { userId, _id: resumeId },
      resumeDataCopy,
      { new: true }
    );

    return res.status(200).json({ message: 'Saved successfully', resume });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
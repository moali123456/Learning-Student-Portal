import apiInstance from "../axiosInstance";

// Function to fetch grade selection options via POST request
export const fetchSubjectSelectionOptions = async (payload: object) => {
  try {
    const response = await apiInstance.post("/Subject/Search", payload);
    if (response.data.StatusCode === 200 && response.data.Data?.Data) {
      return response.data.Data.Data.filter((item) => item.IsActive).map(
        (item) => ({
          value: item.Id,
          label: item.NameEn,
          labelAr: item.NameAr,
        })
      );
    } else {
      throw new Error("Invalid response structure");
    }
  } catch (error) {
    console.error("Error fetching selection options:", error);
    throw error;
  }
};
// Function to fetch grade selection options via POST request
export const fetchGradeSelectionOptions = async (payload: object) => {
  try {
    const response = await apiInstance.post("/Grade/Search", payload);
    if (response.data.StatusCode === 200 && response.data.Data?.Data) {
      return response.data.Data.Data.filter((item) => item.IsActive).map(
        (item) => ({
          value: item.Id,
          label: item.NameEn,
          labelAr: item.NameAr,
        })
      );
    } else {
      throw new Error("Invalid response structure");
    }
  } catch (error) {
    console.error("Error fetching selection options:", error);
    throw error;
  }
};
// Function to fetch level selection options via POST request
export const fetchLevelSelectionOptions = async (payload: object) => {
  try {
    const response = await apiInstance.post("/Level/Search", payload);
    if (response.data.StatusCode === 200 && response.data.Data?.Data) {
      return response.data.Data.Data.filter((item) => item.IsActive).map(
        (item) => ({
          value: item.Id,
          label: item.NameEn,
          labelAr: item.NameAr,
        })
      );
    } else {
      throw new Error("Invalid response structure");
    }
  } catch (error) {
    console.error("Error fetching selection options:", error);
    throw error;
  }
};
// Function to download student marks excel report via POST request
export const downloadExcelFile = async (formData: {
  subject: string;
  grade: string;
  level: string;
  studentCode: string;
}) => {
  try {
    // Prepare API request payload
    const payload = {
      SubjectId: formData.subject || null,
      GradeId: formData.grade || null,
      LevelId: formData.level || null,
      StudentCode: formData.studentCode || null,
    };

    console.log("Sending payload:", payload);

    const response = await apiInstance.post(
      "/Reports/StudentMarksReport",
      payload,
      {
        responseType: "blob", // Ensures we receive the file as binary
      }
    );

    // Create a Blob and trigger download
    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `SelectionReport.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading Excel file:", error);
  }
};

import axios from "axios";
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
// Function to preview student attainment report via POST request
export const previewStudentAttaimentReport = async (formData: {
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

    const response = await axios.post(
      "http://localhost:4111/StudentAttaimentReport",
      payload
    );
    // const response = await apiInstance.post(
    //   "/Reports/StudentMarksReport",
    //   payload
    // );

    if (response.data.StatusCode === 200) {
      console.log("first response", response);
      return transformExamResults(response.data.Data);
    } else {
      throw new Error("Invalid response structure");
    }
  } catch (error) {
    console.error("Error fetching selection options:", error);
    throw error;
  }
};
// Function to transform exam results
const transformExamResults = (data) => {
  return data.map((exam) => ({
    title: exam.ExamTitle,
    totalStudents: exam.TotalStudents,
    performance: {
      below: exam.TotalBelowCount,
      inline: exam.TotalInlineCount,
      above: exam.TotalAboveCount,
      total:
        exam.TotalBelowCount + exam.TotalInlineCount + exam.TotalAboveCount,
    },
    reading: {
      below: exam.ReadingBelow,
      inline: exam.ReadingInline,
      above: exam.ReadingAbove,
      total: exam.ReadingBelow + exam.ReadingInline + exam.ReadingAbove,
    },
    listening: {
      below: exam.ListeningBelow,
      inline: exam.ListeningInline,
      above: exam.ListeningAbove,
      total: exam.ListeningBelow + exam.ListeningInline + exam.ListeningAbove,
    },
    writing: {
      below: exam.WritingBelow,
      inline: exam.WritingInline,
      above: exam.WritingAbove,
      total: exam.WritingBelow + exam.WritingInline + exam.WritingAbove,
    },
    speaking: {
      below: exam.SpeakingBelow,
      inline: exam.SpeakingInline,
      above: exam.SpeakingAbove,
      total: exam.SpeakingBelow + exam.SpeakingInline + exam.SpeakingAbove,
    },
    genderDistribution: {
      boys: {
        total: exam.TotalBoysCount,
        below: exam.BoysBelowCount,
        inline: exam.BoysInlineCount,
        above: exam.BoysAboveCount,
      },
      girls: {
        total: exam.TotalGirlsCount,
        below: exam.GirlsBelowCount,
        inline: exam.GirlsInlineCount,
        above: exam.GirlsAboveCount,
      },
    },
    specialNeeds: {
      total: exam.TotalSenStudentCount,
      below: exam.SenStudentBelowCount,
      inline: exam.SenStudentInlineCount,
      above: exam.SenStudentAboveCount,
    },
    talentedStudents: {
      total: exam.TotalTalentedCount,
      below: exam.TalentStudentBelowCount,
      inline: exam.TalentStudentInlineCount,
      above: exam.TalentStudentAboveCount,
    },
  }));
};

import React, { useState } from "react";
import { Button } from "../../../component/school-admin/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../component/school-admin/ui/table";
import da from "./SelectionReport.json";

interface Student {
  StudentID: string;
  StudentName: string;
  School: string;
  ClassName: string;
  Grade: string;
  Level: string;
  GT: string;
  SenStudent: string;
  Nationality: string;
  ModelExam?: number;
  ExamRound1?: number;
  ExamRound2?: number;
  ExamRound3?: number;
  ReadingR3?: number;
  WritingR3?: number;
  ListeningR3?: number;
  SpeakingR3?: number;
  TotalR3?: number;
  JudgmentR3?: string;
  TotalScore?: number;
  AttainmentAndExpectationsR1?: string;
  AttainmentAndExpectationsR2?: string;
  AttainmentAndExpectationsR3?: string;
}
const StudentTable: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(da);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const totalPages = Math.ceil(students.length / studentsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="h-full">
      <Table>
        <TableHeader>
          <TableRow>
            {Object.keys(students[0] || {}).map((key) => (
              <TableHead key={key} className="font-bold">
                {key}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentStudents.map((student) => (
            <TableRow key={student.StudentID}>
              {Object.entries(student).map(([key, value]) => (
                <TableCell key={key}>
                  <span className="table_item_bx box_shadow">
                    {value ?? "N/A"}
                  </span>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          variant="secondary"
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
          variant="secondary"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default StudentTable;

import React, { useState } from 'react';
import { Box, ChakraProvider, Text, Button } from '@chakra-ui/react';
import RegionChart from './RegionChart';
import Navbar from './Navbar';
import Footer from './Footer';
import * as XLSX from 'xlsx';

const OverallAttendance = () => {
  const [overallData, setOverallData] = useState({ below65: 0, between65And75: 0, above75: 0 });
  const [studentData, setStudentData] = useState({ below65: [], between65And75: [], above75: [] });
  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Assuming the first sheet for simplicity
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert the worksheet to JSON
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        processOverallAttendance(json);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const processOverallAttendance = (data) => {
    if (data && data.length > 1) {
      const totalColumnIndex = 79; // Change the column index based on your data
      const nameColumnIndex = 3; // Assuming the name is in column index 3
      const rollNoColumnIndex = 2; // Assuming the roll number is in column index 2
      const attendanceCounts = { below65: 0, between65And75: 0, above75: 0 };
      const studentDetails = { below65: [], between65And75: [], above75: [] };

      data.slice(6).forEach((row) => {
        // Skip the header row
        const total = parseFloat(row[totalColumnIndex]);
        const studentName = row[nameColumnIndex];
        const rollNo = row[rollNoColumnIndex];
        if (!isNaN(total) && studentName && rollNo) {
          const studentDetail = `${rollNo} - ${studentName}`;
          if (total < 65) {
            attendanceCounts.below65++;
            studentDetails.below65.push(studentDetail);
          } else if (total >= 65 && total <= 75) {
            attendanceCounts.between65And75++;
            studentDetails.between65And75.push(studentDetail);
          } else {
            attendanceCounts.above75++;
            studentDetails.above75.push(studentDetail);
          }
        }
      });

      setOverallData(attendanceCounts);
      setStudentData(studentDetails);
    }
  };

  const handleRegionClick = (region) => {
    setSelectedStudents(studentData[region] || []);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const htmlContent = `
      <html>
        <head>
          <title>Selected Students</title>
        </head>
        <body>
          <h1>Selected Students</h1>
          <ul>
            ${selectedStudents.map((student) => `<li>${student}</li>`).join('')}
          </ul>
        </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <ChakraProvider>
      <Navbar />

      <div style={{ margin: '20px', textAlign: 'center' }}>
        <form>
          <input
            style={{
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#f9f9f9',
              cursor: 'pointer',
              fontSize: '16px',
              color: '#333',
            }}
            type="file"
            id="data"
            name="data"
            onChange={handleFileUpload}
            accept=".xlsx, .xls"
          />
        </form>
      </div>

      <Box
        flex="1"
        maxW="80%"
        p={5}
        m="auto"
        boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
        borderRadius={20}
        textAlign="center"
      >
        <RegionChart data={overallData} onRegionClick={handleRegionClick} />
      </Box>

      <Box
        flex="1"
        maxW="80%"
        p={5}
        m="auto"
        mt={4}
        boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
        borderRadius={20}
        textAlign="left"
      >
        <Text fontSize="xl" fontWeight="bold" mb={4} textAlign="center">
          Selected Students
        </Text>
        {selectedStudents.length > 0 ? (
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {selectedStudents.map((student, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>
                {student}
              </li>
            ))}
          </ul>
        ) : (
          <Text>No students selected</Text>
        )}
        {selectedStudents.length > 0 && (
          <Button mt={4} colorScheme="blue" onClick={handlePrint}>
            Print
          </Button>
        )}
      </Box>

      <Footer />
    </ChakraProvider>
  );
};

export default OverallAttendance;

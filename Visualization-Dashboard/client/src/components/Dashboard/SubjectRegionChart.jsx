import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const SubjectRegionChart = ({ data, i, subject, percerntageIndex }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const totalPercentages = (data || [])
    .slice(6)
    .map((row) => ({
      percentage: row[percerntageIndex[i]],
      name: row[3],
      rollno: row[2], // Assuming Roll No. is in column 2
    }))
    .filter((row) => row.percentage);

  const categorizedData = {
    'Below 65%': totalPercentages.filter((row) => row.percentage < 65),
    '65%-75%': totalPercentages.filter((row) => row.percentage >= 65 && row.percentage <= 75),
    'Above 75': totalPercentages.filter((row) => row.percentage > 75),
  };

  const regionCounts = Object.keys(categorizedData).reduce((acc, key) => {
    acc[key] = categorizedData[key].length;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(regionCounts),
    datasets: [
      {
        data: Object.values(regionCounts),
        backgroundColor: ['#1E88E5', '#D81B60', '#FFC107'],
        hoverBackgroundColor: ['#1565C0', '#C2185B', '#FFB300'],
      },
    ],
  };

  const handleChartClick = (event, elements) => {
    if (elements.length > 0) {
      const clickedIndex = elements[0].index;
      const clickedRegion = Object.keys(categorizedData)[clickedIndex];
      setSelectedRegion(categorizedData[clickedRegion]);
    } else {
      setSelectedRegion(null);
    }
  };

  return (
    <Box>
      <Heading as="h2" mb={4}>
        {subject}
      </Heading>
      <Doughnut
        data={chartData}
        options={{
          plugins: {
            datalabels: {
              color: '#fff',
              font: {
                weight: 'bold',
              },
              formatter: (value) => value,
            },
          },
          onClick: handleChartClick,
        }}
      />
      {selectedRegion && (
        <Box mt={6}>
          <Heading as="h4" size="md" mb={4}>
            Details for Selected Region:
          </Heading>
          <VStack align="start">
            {selectedRegion.map((row, idx) => (
              <Text key={idx} fontSize="sm"> {/* Reduced font size */}
                {row.rollno} - {row.name}
              </Text>
            ))}
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default SubjectRegionChart;

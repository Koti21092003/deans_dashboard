import React from 'react';
import { Box, Center, Text } from '@chakra-ui/react';
import { Pie } from 'react-chartjs-2';

const RegionChart = ({ data, onRegionClick }) => {
  if (!data || typeof data !== 'object') {
    return <Text>No data available</Text>;
  }

  // Prepare data for the Pie chart
  const chartData = {
    labels: ['Below 65%', '65%-75%', 'Above 75%'],
    datasets: [
      {
        data: [data.below65, data.between65And75, data.above75],
        backgroundColor: ['#FF6384', '#FFCE56', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#FFCE56', '#36A2EB'],
      },
    ],
  };

  const handleChartClick = (event, elements) => {
    if (elements.length > 0) {
      const index = elements[0].index; // Get the index of the clicked region
      const region = ['below65', 'between65And75', 'above75'][index]; // Map index to region keys
      if (onRegionClick) {
        onRegionClick(region); // Trigger the parent-provided click handler
      }
    }
  };

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Overall Attendance Distribution
      </Text>
      <Center>
        <Box width="300px" height="300px">
          <Pie
            data={chartData}
            options={{
              onClick: handleChartClick,
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </Box>
      </Center>
    </Box>
  );
};

export default RegionChart;
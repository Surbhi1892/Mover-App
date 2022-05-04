import { Box, Button, Heading, Text } from 'native-base';
import React from 'react';

const Error = ({ error, onRetry, colorScheme, color }) => {
  return (
    <Box justifyContent="center" width="100%" height="100px">
      <Text color={color}>{error.message}</Text>
      <Button mt={4} colorScheme={colorScheme} onPress={onRetry}>
        Retry
      </Button>
    </Box>
  );
};

export default Error;

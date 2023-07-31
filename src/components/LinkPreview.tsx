import { Grid } from '@aws-amplify/ui-react';
import React from 'react'

interface LinkPreviewProps {
  link: string;
}

function LinkPreview({ link }: LinkPreviewProps) {
  return (
    <Grid
      width='100%'
      height='100%'
      position='relative'
    >
      <iframe src={link} width='100%' height='100%'>
      </iframe>
    </Grid >
  );
}

export default LinkPreview
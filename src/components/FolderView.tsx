import React from 'react'
import { Collection, Card, Heading, Text, Divider } from '@aws-amplify/ui-react';
import { Folder } from '@/models';

interface FolderViewProps {
  folders: Folder[];
}

function FolderView({ folders }: FolderViewProps) {
  return (
    <>
      <Heading padding='1rem' level={3}>Folders</Heading>
      <Collection
        type="list"
        items={folders}
        gap="1rem"
        maxHeight='100vh'
        overflow='scroll'
      >
        {(item, index) => (
          <Card key={index}>
            <Text padding="0.5rem">{item.name}</Text >
            <Divider
              orientation="horizontal" />
          </Card>

        )}
      </Collection>
    </>
  )
}

export default FolderView
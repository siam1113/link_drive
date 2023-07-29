'use client'
import { Amplify, DataStore } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import awsExports from '../aws-exports';
import { useEffect, useState } from 'react';
import { Folder } from '@/models';
import FolderView from '../components/FolderView';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Grid, Card, Button, useTheme } from '@aws-amplify/ui-react';


Amplify.configure(awsExports);

export default function Home() {
  let [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    async function fetchFolders() {
      try {
        const folders = await DataStore.query(Folder);
        console.log(folders);
        setFolders(folders);
      } catch (error) {
        console.log(error);
      }
    }
    fetchFolders();
  }, []);
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Grid
          columnGap="0.5rem"
          rowGap="0.5rem"
          templateColumns="1fr 1fr 1fr"
          templateRows="1fr 3fr 1fr"
          maxHeight='90vh'
          overflow='hidden'
        >
          <Card
            columnStart="1"
            columnEnd="2"
            width='25vw'
          >
            <FolderView folders={folders} />
          </Card>
          <Card
            columnStart="2"
            columnEnd="-1"
            width='75vw'
          >
            Main
          </Card>
          {/* <Card
            columnStart="5"
            columnEnd="1"
            maxHeight='5rem'
          >
            <Button
              onClick={signOut}
              gap="0.1rem" size="small"
            >
              Sign out
            </Button>
          </Card> */}
        </Grid>
      )}
    </Authenticator>


  )
}

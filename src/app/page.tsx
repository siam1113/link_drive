'use client'
import { Amplify, DataStore } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import awsExports from '../aws-exports';
import { useEffect, useState } from 'react';
import { Folder, Link } from '@/models';
import FolderView from '../components/FolderView';
import { Authenticator, Grid, Card, Button } from '@aws-amplify/ui-react';
import LinkView from '@/components/LinkView';
import { HeadingThemeExample } from '@/components/Heading';
import { LiaSignOutAltSolid } from 'react-icons/lia';


Amplify.configure(awsExports);

export default function Home() {
  let [folders, setFolders] = useState<Folder[]>([]);
  let [links, setLinks] = useState<Link[]>([]);
  let [activeFolder, setActiveFolder] = useState<Folder[]>([]);

  async function fetchFolders() {
    try {
      const folders = await DataStore.query(Folder);
      console.log("Folders: ", folders);
      setFolders(folders);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchLinks() {
    try {
      const links = await DataStore.query(Link, (l) => l.Folder.folderId.eq(activeFolder[0].id));
      console.log("Links: ", links);
      setLinks(links || []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchLinks();
    fetchFolders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFolder]);

  return (
    <Authenticator>
      {({ signOut }) => (
        <Grid
          columnGap="0.5rem"
          rowGap="0.5rem"
          templateColumns="1fr 1fr 1fr"
          templateRows="1fr 3fr 1fr"
          height='98vh'
          overflow='hidden'
        >
          <Card
            columnStart="1"
            columnEnd="-1"
            maxHeight='5rem'
            backgroundColor="lightblue"
          >
            <div className='flex justify-between align-middle pb-1'>
              <HeadingThemeExample />
              <Button
                variation='link'
                onClick={signOut}
                gap="0.1rem" size="small"
              >
                <LiaSignOutAltSolid size='2rem' />
                Sign out
              </Button>
            </div>
          </Card>
          <Card
            columnStart="1"
            columnEnd="2"
            width='25vw'
            height='95vh'
          >
            <FolderView
              folders={folders}
              setActiveFolder={setActiveFolder}
              fetchFolders={fetchFolders}
            />
          </Card>
          <Card
            columnStart="2"
            columnEnd="-1"
            width='75vw'
            height='95vh'
          >
            <LinkView links={links} fetchLinks={fetchLinks} />
          </Card>
        </Grid>
      )
      }
    </Authenticator >

  )
}

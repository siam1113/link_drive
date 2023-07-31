import React from 'react'
import { Collection, Card, Heading, Text, Divider } from '@aws-amplify/ui-react';
import { Folder } from '@/models';
import { LuFolders } from 'react-icons/lu';
import { PiFolderSimpleLight, PiFolderSimplePlus } from 'react-icons/pi';
import FolderCreateForm from '@/ui-components/FolderCreateForm';
interface FolderViewProps {
  folders: Folder[];
}

function FolderView({ folders }: FolderViewProps) {
  let [showFolderForm, setShowFolderForm] = React.useState(false);

  return (
    <>
      <div className='flex justify-between align-middle pb-3'>
        <div className='flex '>
          <LuFolders size='2rem' />
          <p className="text-xl font-bold px-3">Folders</p >
        </div>
        <button
          onClick={() => setShowFolderForm(!showFolderForm)}
        >
          <PiFolderSimplePlus size='2rem' />
        </button>
      </div>
      <Divider orientation='horizontal' />
      {
        showFolderForm && <FolderCreateForm />
      }
      <Collection
        type="list"
        items={folders}
        gap="0rem"
        maxHeight='85vh'
        overflow='scroll'
        paddingBottom='0rem'
      >
        {(item, index) => (
          <div key={index} className='flex justify-between p-2 pb-5'>
            <div className='flex overflow-wrap p-1'>
              <PiFolderSimpleLight size='1.5rem' />
              <Text paddingLeft="0.5rem">{item.name}</Text >
            </div>
            <Text paddingLeft="0.5rem">20</Text >
          </div>

        )}
      </Collection>
    </>
  )
}

export default FolderView
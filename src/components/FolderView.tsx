import React from 'react'
import { Collection, Text, Divider } from '@aws-amplify/ui-react';
import { Folder, Link } from '@/models';
import { LuFolders } from 'react-icons/lu';
import { PiFolderSimpleLight, PiFolderSimpleMinus, PiFolderSimplePlus } from 'react-icons/pi';
import { MdOutlineDelete } from 'react-icons/md';
import FolderCreateForm from '@/ui-components/FolderCreateForm';
import { DataStore } from 'aws-amplify';
interface FolderViewProps {
  folders: Folder[];
  setActiveFolder: React.Dispatch<React.SetStateAction<Folder[]>>;
  fetchFolders: () => void;
}

function FolderView({ folders, setActiveFolder, fetchFolders }: FolderViewProps) {
  let [showFolderForm, setShowFolderForm] = React.useState(false);

  const deleteFolder = async (folder: Folder) => {
    if (!folder) {
      throw new Error('Cannot delete undefined link');
    }
    const modelToDelete = await DataStore.query(Folder, folder.id);
    if (modelToDelete) {
      DataStore.delete(modelToDelete);
      fetchFolders()
    }
  }

  return (
    <>
      <div className='flex justify-between align-middle pb-3'>
        <div className='flex text-sky-700'>
          <LuFolders size='2rem' />
          <p className="text-xl font-bold px-3">Folders</p >
        </div>
        <button
          className='text-sky-600'
          onClick={() => setShowFolderForm(!showFolderForm)}
        >
          {showFolderForm ? <PiFolderSimpleMinus size='2rem' /> : <PiFolderSimplePlus size='2rem' />}
        </button>
      </div>
      <Divider orientation='horizontal' />
      {
        showFolderForm
        &&
        <FolderCreateForm
          onCancel={() => setShowFolderForm(!showFolderForm)}
          onSuccess={() => fetchFolders()}
        />
      }
      <Collection
        type="list"
        items={folders}
        gap="0rem"
        height='85vh'
        overflow='scroll'
        paddingBottom='0rem'
      >
        {(item, index) => (
          <div key={index} className='flex justify-between p-2 pb-5'>
            <button
              className='flex overflow-wra'
              onClick={() => { setActiveFolder([item]) }}
            >
              <PiFolderSimpleLight size='1.5rem' />
              <Text paddingLeft="0.5rem">{item.name}</Text >
            </button>
            <div className='flex'>
              <Text paddingLeft="0.5rem" >
                { }
              </Text >
              <button
                className='ms-2 text-red-400'
                onClick={() => deleteFolder(item)}
              >
                <MdOutlineDelete size='1.5rem' />
              </button>
            </div>
          </div>
        )}
      </Collection>
    </>
  )
}

export default FolderView
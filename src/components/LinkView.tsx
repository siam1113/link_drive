import React from 'react'
import { Collection, Text, Divider, Alert } from '@aws-amplify/ui-react';
import { Link } from '@/models';
import { GoCopy } from 'react-icons/go';
import LinkCreateForm from '@/ui-components/LinkCreateForm';
import { BiLinkExternal, BiHide, BiEdit } from 'react-icons/bi';
import { MdOutlinePreview, MdAddLink, MdLinkOff, MdOutlineDelete } from 'react-icons/md';
import { RiLinksFill } from 'react-icons/ri';
import { copyToClipboard } from '@/utils/clipboard';
import LinkPreview from './LinkPreview';

import { DataStore } from 'aws-amplify';
import LinkUpdateForm from '@/ui-components/LinkUpdateForm';

interface LinkViewProps {
  links: Link[];
  fetchLinks: () => void;
}

function LinkView({ links, fetchLinks }: LinkViewProps) {
  let [showLinkForm, setShowLinkForm] = React.useState(false);
  let [showLinkUpdateForm, setShowLinkUpdateForm] = React.useState(false);
  let [isCopied, setIsCopied] = React.useState(false);
  let [showPreview, setShowPreview] = React.useState(false);
  let [previewLink, setPreviewLink] = React.useState('');
  let [editLink, setEditLink] = React.useState<Link>();

  const deleteLink = async (link: Link) => {
    if (!link) {
      throw new Error('Cannot delete undefined link');
    }
    const modelToDelete = await DataStore.query(Link, link.id);
    if (modelToDelete) {
      DataStore.delete(modelToDelete);
      fetchLinks()
    }
  }

  return (
    <>
      <div className='flex justify-between align-middle pb-3'>
        <div className='flex text-sky-700'>
          <RiLinksFill size='2rem' />
          <p className="text-xl font-bold px-3">
            {showPreview ? previewLink : 'Links'}
          </p >
        </div>
        <div className='flex mx-2'>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className='text-sky-500'
          >
            {showPreview && <BiHide size='2rem' />}
          </button>
          <button
            onClick={() => setShowLinkForm(!showLinkForm)}
            className='text-sky-600'
          >
            {!showPreview && (showLinkForm ? <MdLinkOff size='2rem' /> : <MdAddLink size='2rem' />)}
          </button>
        </div>
      </div>
      <Divider orientation='horizontal' />
      {
        showLinkForm
        &&
        <LinkCreateForm
          onSuccess={() => fetchLinks()}
          onCancel={() => setShowLinkForm(!showLinkForm)}
        />
      }
      {
        showPreview && <LinkPreview link={previewLink} />
      }
      {
        showLinkUpdateForm
        &&
        <LinkUpdateForm
          link={editLink}
          onCancel={() => setShowLinkUpdateForm(!showLinkUpdateForm)}
          onSuccess={() => fetchLinks()} />
      }
      {
        isCopied && <Alert variation='success'>Link Copied to clipboard</Alert>
      }

      <Collection
        type="list"
        items={links}
        gap="0rem"
        height='85vh'
        overflow='scroll'
        paddingBottom='0rem'
      >
        {(item, index) => (
          <>
            <div key={index} className='flex justify-between p-2 pb-5'>
              <div className='flex overflow-wrap p-1'>
                <Text paddingLeft="0.5rem">{item.name}</Text >
              </div>
              <div className='flex overflow-wrap p-1'>
                <button
                  className='mx-2 text-sky-500'
                  onClick={() => { setShowPreview(!showPreview); setPreviewLink(item.url) }} >
                  <MdOutlinePreview size='1.5rem' />
                </button>
                <button
                  className='mx-2 text-sky-500'
                  onClick={async () => { setIsCopied(await copyToClipboard(item.url)); setTimeout(() => setIsCopied(false), 3000) }}
                >
                  <GoCopy size='1.5rem' />
                </button>
                <button className='mx-2 text-sky-500'>
                  <a href={item.url} target='blank'>
                    <BiLinkExternal size='1.5rem' />
                  </a>
                </button>

                <button
                  className='mx-2 text-sky-500'
                  onClick={() => { setShowLinkUpdateForm(!showLinkUpdateForm); setEditLink(item) }}
                >
                  <BiEdit size='1.5rem' />
                </button>

                <button
                  className='mx-2 text-red-400'
                  onClick={() => deleteLink(item)}
                >
                  <MdOutlineDelete size='1.5rem' />
                </button>
              </div>

            </div>
            <Divider orientation='horizontal' />
          </>
        )}
      </Collection>

    </>
  )
}

export default LinkView
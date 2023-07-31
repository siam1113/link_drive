// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Folder, Link, LinkFolder } = initSchema(schema);

export {
  Folder,
  Link,
  LinkFolder
};
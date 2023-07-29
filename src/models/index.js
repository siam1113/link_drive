// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Tag, Category, Folder, Link } = initSchema(schema);

export {
  Tag,
  Category,
  Folder,
  Link
};
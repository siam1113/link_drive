import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerFolder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Folder, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly Link?: (LinkFolder | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFolder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Folder, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly Link: AsyncCollection<LinkFolder>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Folder = LazyLoading extends LazyLoadingDisabled ? EagerFolder : LazyFolder

export declare const Folder: (new (init: ModelInit<Folder>) => Folder) & {
  copyOf(source: Folder, mutator: (draft: MutableModel<Folder>) => MutableModel<Folder> | void): Folder;
}

type EagerLink = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Link, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly url: string;
  readonly Folder?: LinkFolder[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLink = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Link, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly url: string;
  readonly Folder: AsyncCollection<LinkFolder>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Link = LazyLoading extends LazyLoadingDisabled ? EagerLink : LazyLink

export declare const Link: (new (init: ModelInit<Link>) => Link) & {
  copyOf(source: Link, mutator: (draft: MutableModel<Link>) => MutableModel<Link> | void): Link;
}

type EagerLinkFolder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LinkFolder, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly folderId?: string | null;
  readonly linkId?: string | null;
  readonly folder: Folder;
  readonly link: Link;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLinkFolder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LinkFolder, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly folderId?: string | null;
  readonly linkId?: string | null;
  readonly folder: AsyncItem<Folder>;
  readonly link: AsyncItem<Link>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type LinkFolder = LazyLoading extends LazyLoadingDisabled ? EagerLinkFolder : LazyLinkFolder

export declare const LinkFolder: (new (init: ModelInit<LinkFolder>) => LinkFolder) & {
  copyOf(source: LinkFolder, mutator: (draft: MutableModel<LinkFolder>) => MutableModel<LinkFolder> | void): LinkFolder;
}
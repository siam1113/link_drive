/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Folder, Link as Link0 } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type FolderUpdateFormInputValues = {
    name?: string;
    Link?: Link0[];
};
export declare type FolderUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    Link?: ValidationFunction<Link0>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FolderUpdateFormOverridesProps = {
    FolderUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    Link?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type FolderUpdateFormProps = React.PropsWithChildren<{
    overrides?: FolderUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    folder?: Folder;
    onSubmit?: (fields: FolderUpdateFormInputValues) => FolderUpdateFormInputValues;
    onSuccess?: (fields: FolderUpdateFormInputValues) => void;
    onError?: (fields: FolderUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: FolderUpdateFormInputValues) => FolderUpdateFormInputValues;
    onValidate?: FolderUpdateFormValidationValues;
} & React.CSSProperties>;
export default function FolderUpdateForm(props: FolderUpdateFormProps): React.ReactElement;

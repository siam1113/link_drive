/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Folder as Folder0 } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type LinkCreateFormInputValues = {
    name?: string;
    url?: string;
    Folder?: Folder0[];
};
export declare type LinkCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    url?: ValidationFunction<string>;
    Folder?: ValidationFunction<Folder0>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LinkCreateFormOverridesProps = {
    LinkCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    url?: PrimitiveOverrideProps<TextFieldProps>;
    Folder?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type LinkCreateFormProps = React.PropsWithChildren<{
    overrides?: LinkCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LinkCreateFormInputValues) => LinkCreateFormInputValues;
    onSuccess?: (fields: LinkCreateFormInputValues) => void;
    onError?: (fields: LinkCreateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: LinkCreateFormInputValues) => LinkCreateFormInputValues;
    onValidate?: LinkCreateFormValidationValues;
} & React.CSSProperties>;
export default function LinkCreateForm(props: LinkCreateFormProps): React.ReactElement;

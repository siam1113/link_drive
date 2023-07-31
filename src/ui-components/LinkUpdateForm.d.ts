/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Link, Folder as Folder0 } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type LinkUpdateFormInputValues = {
    name?: string;
    url?: string;
    Folder?: Folder0[];
};
export declare type LinkUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    url?: ValidationFunction<string>;
    Folder?: ValidationFunction<Folder0>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LinkUpdateFormOverridesProps = {
    LinkUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    url?: PrimitiveOverrideProps<TextFieldProps>;
    Folder?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type LinkUpdateFormProps = React.PropsWithChildren<{
    overrides?: LinkUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    link?: Link;
    onSubmit?: (fields: LinkUpdateFormInputValues) => LinkUpdateFormInputValues;
    onSuccess?: (fields: LinkUpdateFormInputValues) => void;
    onError?: (fields: LinkUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: LinkUpdateFormInputValues) => LinkUpdateFormInputValues;
    onValidate?: LinkUpdateFormValidationValues;
} & React.CSSProperties>;
export default function LinkUpdateForm(props: LinkUpdateFormProps): React.ReactElement;

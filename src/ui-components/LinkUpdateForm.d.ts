/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Link } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type LinkUpdateFormInputValues = {
    url?: string;
};
export declare type LinkUpdateFormValidationValues = {
    url?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LinkUpdateFormOverridesProps = {
    LinkUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    url?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LinkUpdateFormProps = React.PropsWithChildren<{
    overrides?: LinkUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    link?: Link;
    onSubmit?: (fields: LinkUpdateFormInputValues) => LinkUpdateFormInputValues;
    onSuccess?: (fields: LinkUpdateFormInputValues) => void;
    onError?: (fields: LinkUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LinkUpdateFormInputValues) => LinkUpdateFormInputValues;
    onValidate?: LinkUpdateFormValidationValues;
} & React.CSSProperties>;
export default function LinkUpdateForm(props: LinkUpdateFormProps): React.ReactElement;

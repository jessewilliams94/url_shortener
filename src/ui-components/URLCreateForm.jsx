/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { URL } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function URLCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    original: "",
    shortened: "",
  };
  const [original, setOriginal] = React.useState(initialValues.original);
  const [shortened, setShortened] = React.useState(initialValues.shortened);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setOriginal(initialValues.original);
    setShortened(initialValues.shortened);
    setErrors({});
  };
  const validations = {
    original: [{ type: "Required" }, { type: "URL" }],
    shortened: [{ type: "Required" }, { type: "URL" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value = getDisplayValue
      ? getDisplayValue(currentValue)
      : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          original,
          shortened,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new URL(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "URLCreateForm")}
      {...rest}
    >
      <TextField
        label="Original"
        isRequired={true}
        isReadOnly={false}
        value={original}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              original: value,
              shortened,
            };
            const result = onChange(modelFields);
            value = result?.original ?? value;
          }
          if (errors.original?.hasError) {
            runValidationTasks("original", value);
          }
          setOriginal(value);
        }}
        onBlur={() => runValidationTasks("original", original)}
        errorMessage={errors.original?.errorMessage}
        hasError={errors.original?.hasError}
        {...getOverrideProps(overrides, "original")}
      ></TextField>
      <TextField
        label="Shortened"
        isRequired={true}
        isReadOnly={false}
        value={shortened}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              original,
              shortened: value,
            };
            const result = onChange(modelFields);
            value = result?.shortened ?? value;
          }
          if (errors.shortened?.hasError) {
            runValidationTasks("shortened", value);
          }
          setShortened(value);
        }}
        onBlur={() => runValidationTasks("shortened", shortened)}
        errorMessage={errors.shortened?.errorMessage}
        hasError={errors.shortened?.hasError}
        {...getOverrideProps(overrides, "shortened")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}

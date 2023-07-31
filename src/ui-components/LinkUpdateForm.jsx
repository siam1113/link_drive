/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import { Link, Folder as Folder0, LinkFolder } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function LinkUpdateForm(props) {
  const {
    id: idProp,
    link: linkModelProp,
    onSuccess,
    onError,
    onSubmit,
    onCancel,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    url: "",
    Folder: [],
  };
  const [name, setName] = React.useState(initialValues.name);
  const [url, setUrl] = React.useState(initialValues.url);
  const [Folder, setFolder] = React.useState(initialValues.Folder);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = linkRecord
      ? { ...initialValues, ...linkRecord, Folder: linkedFolder }
      : initialValues;
    setName(cleanValues.name);
    setUrl(cleanValues.url);
    setFolder(cleanValues.Folder ?? []);
    setCurrentFolderValue(undefined);
    setCurrentFolderDisplayValue("");
    setErrors({});
  };
  const [linkRecord, setLinkRecord] = React.useState(linkModelProp);
  const [linkedFolder, setLinkedFolder] = React.useState([]);
  const canUnlinkFolder = false;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Link, idProp)
        : linkModelProp;
      setLinkRecord(record);
      const linkedFolder = record
        ? await Promise.all(
            (
              await record.Folder.toArray()
            ).map((r) => {
              return r.folder;
            })
          )
        : [];
      setLinkedFolder(linkedFolder);
    };
    queryData();
  }, [idProp, linkModelProp]);
  React.useEffect(resetStateValues, [linkRecord, linkedFolder]);
  const [currentFolderDisplayValue, setCurrentFolderDisplayValue] =
    React.useState("");
  const [currentFolderValue, setCurrentFolderValue] = React.useState(undefined);
  const FolderRef = React.createRef();
  const getIDValue = {
    Folder: (r) => JSON.stringify({ id: r?.id }),
  };
  const FolderIdSet = new Set(
    Array.isArray(Folder)
      ? Folder.map((r) => getIDValue.Folder?.(r))
      : getIDValue.Folder?.(Folder)
  );
  const folderRecords = useDataStoreBinding({
    type: "collection",
    model: Folder0,
  }).items;
  const getDisplayValue = {
    Folder: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
  };
  const validations = {
    name: [{ type: "Required" }],
    url: [{ type: "Required" }, { type: "URL" }],
    Folder: [{ type: "Required", validationMessage: "Folder is required." }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
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
          name,
          url,
          Folder,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(
                    fieldName,
                    item,
                    getDisplayValue[fieldName]
                  )
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(
                fieldName,
                modelFields[fieldName],
                getDisplayValue[fieldName]
              )
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
          const promises = [];
          const folderToLinkMap = new Map();
          const folderToUnLinkMap = new Map();
          const folderMap = new Map();
          const linkedFolderMap = new Map();
          Folder.forEach((r) => {
            const count = folderMap.get(getIDValue.Folder?.(r));
            const newCount = count ? count + 1 : 1;
            folderMap.set(getIDValue.Folder?.(r), newCount);
          });
          linkedFolder.forEach((r) => {
            const count = linkedFolderMap.get(getIDValue.Folder?.(r));
            const newCount = count ? count + 1 : 1;
            linkedFolderMap.set(getIDValue.Folder?.(r), newCount);
          });
          linkedFolderMap.forEach((count, id) => {
            const newCount = folderMap.get(id);
            if (newCount) {
              const diffCount = count - newCount;
              if (diffCount > 0) {
                folderToUnLinkMap.set(id, diffCount);
              }
            } else {
              folderToUnLinkMap.set(id, count);
            }
          });
          folderMap.forEach((count, id) => {
            const originalCount = linkedFolderMap.get(id);
            if (originalCount) {
              const diffCount = count - originalCount;
              if (diffCount > 0) {
                folderToLinkMap.set(id, diffCount);
              }
            } else {
              folderToLinkMap.set(id, count);
            }
          });
          folderToUnLinkMap.forEach(async (count, id) => {
            const recordKeys = JSON.parse(id);
            const linkFolderRecords = await DataStore.query(LinkFolder, (r) =>
              r.and((r) => {
                return [
                  r.folderId.eq(recordKeys.id),
                  r.linkId.eq(linkRecord.id),
                ];
              })
            );
            for (let i = 0; i < count; i++) {
              promises.push(DataStore.delete(linkFolderRecords[i]));
            }
          });
          folderToLinkMap.forEach((count, id) => {
            for (let i = count; i > 0; i--) {
              promises.push(
                DataStore.save(
                  new LinkFolder({
                    link: linkRecord,
                    folder: folderRecords.find((r) =>
                      Object.entries(JSON.parse(id)).every(
                        ([key, value]) => r[key] === value
                      )
                    ),
                  })
                )
              );
            }
          });
          const modelFieldsToSave = {
            name: modelFields.name,
            url: modelFields.url,
          };
          promises.push(
            DataStore.save(
              Link.copyOf(linkRecord, (updated) => {
                Object.assign(updated, modelFieldsToSave);
              })
            )
          );
          await Promise.all(promises);
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "LinkUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              url,
              Folder,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Url"
        isRequired={true}
        isReadOnly={false}
        value={url}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              url: value,
              Folder,
            };
            const result = onChange(modelFields);
            value = result?.url ?? value;
          }
          if (errors.url?.hasError) {
            runValidationTasks("url", value);
          }
          setUrl(value);
        }}
        onBlur={() => runValidationTasks("url", url)}
        errorMessage={errors.url?.errorMessage}
        hasError={errors.url?.hasError}
        {...getOverrideProps(overrides, "url")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              url,
              Folder: values,
            };
            const result = onChange(modelFields);
            values = result?.Folder ?? values;
          }
          setFolder(values);
          setCurrentFolderValue(undefined);
          setCurrentFolderDisplayValue("");
        }}
        currentFieldValue={currentFolderValue}
        label={"Folder"}
        items={Folder}
        hasError={errors?.Folder?.hasError}
        errorMessage={errors?.Folder?.errorMessage}
        getBadgeText={getDisplayValue.Folder}
        setFieldValue={(model) => {
          setCurrentFolderDisplayValue(
            model ? getDisplayValue.Folder(model) : ""
          );
          setCurrentFolderValue(model);
        }}
        inputFieldRef={FolderRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Folder"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Folder"
          value={currentFolderDisplayValue}
          options={folderRecords
            .filter((r) => !FolderIdSet.has(getIDValue.Folder?.(r)))
            .map((r) => ({
              id: getIDValue.Folder?.(r),
              label: getDisplayValue.Folder?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentFolderValue(
              folderRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentFolderDisplayValue(label);
            runValidationTasks("Folder", label);
          }}
          onClear={() => {
            setCurrentFolderDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Folder?.hasError) {
              runValidationTasks("Folder", value);
            }
            setCurrentFolderDisplayValue(value);
            setCurrentFolderValue(undefined);
          }}
          onBlur={() => runValidationTasks("Folder", currentFolderDisplayValue)}
          errorMessage={errors.Folder?.errorMessage}
          hasError={errors.Folder?.hasError}
          ref={FolderRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Folder")}
        ></Autocomplete>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || linkModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Cancel"
            type="button"
            onClick={() => {
              onCancel && onCancel();
            }}
            {...getOverrideProps(overrides, "CancelButton")}
          ></Button>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || linkModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}

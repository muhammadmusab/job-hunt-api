import { Field, FieldProps, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { ClDropzone, IDropzoneProps } from './Dropzone';
interface IProps extends IDropzoneProps {
  name: string;
}
export const ClDropzoneFormik = ({ name, ...rest }: IProps) => {
  const { values,setFieldValue } = useFormikContext<{ [key: string]: any }>();
  const [restoredFiles, setRestoredFiles] = useState([]);

  useEffect(() => {
    if(values[name]){
      setRestoredFiles(values[name]);
    }

  }, []);

  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => {
        const hasError = Boolean(form.errors[name] && form.submitCount >= 1);

        const onDelete = (file:{preview:string},i: number,type:"RESTORED" | 'NEW') => {
  
          if(type === 'RESTORED'){
            setRestoredFiles((prevRestoredFiles=>{
              const restoredFilesCopy = [...prevRestoredFiles]
              restoredFilesCopy.splice(i,1)
              return restoredFilesCopy
            }))
          }
      
          const files = form.values[name].filter(_file=>_file.id !== file.id)

          // const deletedFileIdx = files.findIndex(_file=>{
           
          //   return _file.preview === file.preview
          // })
          // console.log(deletedFileIdx)
          // files.splice(deletedFileIdx, 1);
          setFieldValue(name, files);
        };
        const onFilesUpload = (files: string[]) => {
          // const prevFiles = [...form.values[name]];

          form.setFieldValue(name, restoredFiles.concat(files));
        };
        return (
          <ClDropzone
            restoredFiles={restoredFiles}
            {...rest}
            hasError={hasError}
            error={form.errors[name] as string}
            onDelete={onDelete}
            onFilesUpload={onFilesUpload}
            showNewFilesPreview={true}
          />
        );
      }}
    </Field>
  );
};

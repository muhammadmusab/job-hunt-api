import { classNames } from '@codelab/lib';
import { useEffect } from 'react';
import React, { useState } from 'react';
import { useDropzone, DropzoneProps } from 'react-dropzone';
import Image from 'next/image';
import { Request } from '@codelab/lib';
import { ClProgress } from '../../progress/Progress';
import Error from '../../error/Error';
import { AxiosRequestHeaders } from 'axios';

import Preview from './Preview';
// TODO:
// ACCEPT GENERIC FOR FILE UPLOAD RESPONSE
// Accept path for file upload response to access the files path in response
// Accept path for upload error
// Set loading state for upload accept function for that
// Remove TS errors

export interface IDropzoneProps extends DropzoneProps {
  dndText?: React.ReactNode;
  preview?: boolean;
  uploadConfig?: {
    url: string;
    method: 'post' | 'put' | 'patch';
    headers?: AxiosRequestHeaders;
    resFilesPath: string[];
  };
  onFilesUpload?: (files: File[] | string[]) => void;
  error?: string;
  hasError?: boolean;
  restoredFiles?: { preview: string }[];
  onDelete?: (file: { preview: string }, i: number, type: 'RESTORED' | 'NEW') => void;
  showNewFilesPreview?: boolean;
}

interface IPreviewFile extends File {
  preview: string;
}

export const ClDropzone = ({
  uploadConfig,
  preview = true,
  dndText = 'Drop some files',
  children,
  onFilesUpload,
  hasError,
  error,
  restoredFiles = [],
  onDelete,
  showNewFilesPreview = true,
  ...rest
}: IDropzoneProps) => {
  const [uploadError, setUploadError] = useState();
  const [percentage, setPercentage] = useState(0);
  const [files, setFiles] = useState<IPreviewFile[]>([]);
  const { acceptedFiles, getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      ...rest,
      onDrop: async (acceptedFiles) => {
        setUploadError(undefined);
        if (uploadConfig) {
          let percent = 0;
          const axios = new Request(uploadConfig.url);
          const config = {
            onUploadProgress: (progressEvent: ProgressEvent) => {
              const { loaded, total } = progressEvent;
              percent = Math.floor((loaded * 100) / total);

              if (percent <= 100) {
                setPercentage(percent); // hook to set the value of current level that needs to be passed to the progressbar
              }
            },
            headers: uploadConfig.headers,
          };

          // Put in try catch and define error with useState and show it when there is some error also set error class for dropzone
          try {
            const filesRes = await axios.sendRequest({
              method: uploadConfig.method,
              url: '',
              multipart: true,
              body: {
                products: acceptedFiles,
              },
              options: config,
            });

            setPercentage(percent);
            setTimeout(() => {
              setPercentage(0);
            }, 1000);
            if (onFilesUpload) {
              // Actual
              // Dont hard code the path but get in upload config
              if (filesRes.files) {
                onFilesUpload(
                  filesRes.files.map((file, i) => ({
                    preview: file.path,
                    id: restoredFiles.length + i + 1,
                  })),
                );
              }

              setFiles(
                acceptedFiles.map((file, i) => {
                  return Object.assign(file, {
                    preview: URL.createObjectURL(file),
                    id: i + 3,
                  });
                }),
              );
              // Temporary
              // onFilesUpload(
              //   acceptedFiles.map((file) => {
              //     return { preview: URL.createObjectURL(file) };
              //   }),
              // );
            }
          } catch (error: any) {
            console.log(error);
            // console.log(error.res.data,'ERROR')
            setUploadError(error.errors[0].message);
          }
        } else {
          if (onFilesUpload) onFilesUpload(acceptedFiles);
          setFiles(
            acceptedFiles.map((file, i) => {
              return Object.assign(file, {
                preview: URL.createObjectURL(file),
                id: i + 3,
              });
            }),
          );
        }
      },
    });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const dropzoneClasses = classNames(
    'dropzone',
    isFocused ? 'focused' : '',
    isDragAccept ? 'accepted' : '',
    hasError || uploadError || isDragReject ? 'rejected' : '',
  );

  // const thumbs = files.map((file,i) => (
  //   <div

  //     className='dropzone__thumb position-relative d-flex justify-content-center align-items-center'
  //     key={i}
  //   >
  //     {percentage ? (
  //       <ClProgress showPercentage progress={percentage} className='position-absolute' />
  //     ) : null}
  //     <button className='dropzone__thumb__delete position-absolute'><FaTimesCircle/></button>
  //     <Image
  //       width={80}
  //       height={80}
  //       alt='preview'
  //       src={file.preview}
  //       onLoad={() => {
  //         URL.revokeObjectURL(file.preview);
  //       }}
  //     />
  //   </div>
  // ));
  // const restoredFilesThumbs = restoredFiles
  //   ? restoredFiles?.map((file) => (
  //       <div
  //         className='dropzone__thumb position-relative d-flex justify-content-center align-items-center'
  //         key={file}
  //       >
  //         <Image width={80} height={80} alt='preview' src={file} />
  //       </div>
  //     ))
  //   : null;

  const _onDelete = (file: { preview: string }, i: number, type: 'RESTORED' | 'NEW') => {
    if (!onDelete) return;
    if (type === 'NEW') {
      setFiles((prevFiles) => {
        const filesCopy = [...prevFiles];
        filesCopy.splice(i, 1);

        return filesCopy;
      });
    }
    onDelete(file, i, type);
  };

  return (
    <section>
      <div {...getRootProps({ className: dropzoneClasses })}>
        <input {...getInputProps()} />
        {dndText && <div>{dndText}</div>}
      </div>
      <aside className='dropzone__thumbs-container'>
        <Preview previews={restoredFiles} onDelete={_onDelete} type='RESTORED' />
        {showNewFilesPreview ? (
          <Preview percentage={percentage} previews={files} onDelete={_onDelete} type='NEW' />
        ) : null}

        {/* {thumbs} */}
      </aside>
      {hasError ? <Error>{error}</Error> : null}
      {uploadError ? <Error>{uploadError}</Error> : null}
    </section>
  );
};

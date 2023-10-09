import { FaTimesCircle } from 'react-icons/fa';

import Image from 'next/image';
import { ClProgress } from '../../progress/Progress';
interface IProps {
  previews: { preview: string }[];
  onDelete?: (file:{preview:string},i: number,type:"RESTORED" | 'NEW') => void;
  percentage?: number;
  type:"RESTORED" | 'NEW'
}

const Preview = ({ previews, onDelete, percentage,type }: IProps) => {
  return (
    <ul className='d-flex mt-3 p-0 flex-wrap' style={{ gap: '10px' }}>
      {previews.map((file, i) => (
        <div
          className='dropzone__thumb position-relative d-flex justify-content-center align-items-center'
          key={i}
        >
          {onDelete && (
            <FaTimesCircle
              className='position-absolute dropzone__thumb__delete'
              onClick={() => onDelete!(file,i,type)}
            />
          )}

          {percentage ? (
            <ClProgress showPercentage progress={percentage} className='position-absolute' />
          ) : null}
          <Image
            width={80}
            height={80}
            alt='preview'
            src={file.preview}
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        </div>
      ))}
    </ul>
  );
};

export default Preview;

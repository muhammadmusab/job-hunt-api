import * as Slider from '@radix-ui/react-slider';
import { ComponentAttrs } from '../../../types/general';
import { ClTooltip } from '../../tooltip/Tooltip';

export interface ISliderProps extends ComponentAttrs, Slider.SliderProps {
  thumbs?: number;
  error?: string;
  hasError?: boolean;
}

export const ClSliderInput = ({ thumbs = 2, ...rest }: ISliderProps) => (
  <Slider.Root
    className='slider'
    {...rest}

    step={1}
    minStepsBetweenThumbs={8}
  >
    <Slider.Track className='slider__track'>
      <Slider.Range className='slider__range' />
    </Slider.Track>
    {[...Array(thumbs).keys()].map((thumb, i) => (
      <Slider.Thumb key={thumb} className='slider__thumb' >
        {rest.value && rest.value[i]}
      </Slider.Thumb>
    ))}
  </Slider.Root>
);

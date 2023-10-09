import { classNames } from '@codelab/lib';


export interface IHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const ClHeading = ({ className, children, level = 1, ...rest }: IHeadingProps) => {
  const Heading = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  return (
    <Heading className={classNames(className ?? '', 'h' + level)} {...rest}>
      {children}
    </Heading>
  );
};

export default ClHeading;

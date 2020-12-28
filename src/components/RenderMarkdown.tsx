import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import Link from '@material-ui/core/Link';
import React from 'react';

const styles = createStyles({
  root: {
    fontWeight: 'inherit',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    wordWrap: 'break-word',
  },
});

type StyledTypographyProps = WithStyles<typeof styles> & TypographyProps;

const StyledTypography = withStyles(styles)((props: StyledTypographyProps) => <Typography {...props} paragraph />);

function Image({ alt, style, ...props }: React.ImgHTMLAttributes<HTMLImageElement>): React.ReactElement {
  return <img {...props} alt={alt} style={{ ...style, maxWidth: '100%' }} />;
}

export default function RenderMarkdown({ renderers, ...props }: ReactMarkdownProps): React.ReactElement {
  return (
    <ReactMarkdown
      {...props}
      renderers={{
        ...renderers,
        image: Image,
        link: Link,
        paragraph: StyledTypography,
      }}
    />
  );
}

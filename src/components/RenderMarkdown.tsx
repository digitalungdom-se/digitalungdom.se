import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown';

import Link from '@material-ui/core/Link';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const StyledTypography = withStyles({
  root: {
    fontWeight: 'inherit',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    wordBreak: 'break-word',
  },
})(Typography);

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
        paragraph: StyledTypography,
        link: Link,
      }}
    />
  );
}

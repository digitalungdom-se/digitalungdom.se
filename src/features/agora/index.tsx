import { ConnectedProps, connect } from 'react-redux';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import AgoraFilter from './AgoraFilter';
import { Agoragram } from './agoraTypes';
import Axios from 'axios';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import InfiniteScroll from 'react-infinite-scroller';
import Post from './Post';
import PublishAgoragramWidget from './PublishAgoragramWidget';
import React from 'react';
import { ReduxConnectedPost } from './AgoraPost';
import { getAgoragramsSuccess } from './agoraSlice';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      marginTop: theme.spacing(2),
    },
    root: {
      marginTop: theme.spacing(2),
    },
    widget: {
      marginLeft: theme.spacing(2),
      marginTop: theme.spacing(2),
      float: 'left',
    },
    widgetBlock: {
      marginBottom: theme.spacing(2),
    },
  }),
);

interface AgoraParams {
  hypagora?: string;
  sort?: string;
}

export default function Agora(): React.ReactElement {
  const classes = useStyles();
  const { sort } = useParams<AgoraParams>();
  const hypagora = 'general';

  return (
    <Container className={classes.root} fixed maxWidth="md">
      <div style={{ padding: '0 2px' }}>
        <AgoraFilter hypagora={hypagora} path="/agora" sort={sort} />
      </div>
      <div style={{ display: 'flex' }}>
        <Box className={classes.margin} flexGrow={1} style={{ overflow: 'auto', padding: '0 2px 2px 2px' }}>
          <Hidden mdUp>
            <PublishAgoragramWidget className={classes.widgetBlock} />
          </Hidden>
          <AgoraInfiniteScroll hypagora={hypagora} sort={sort} />
        </Box>
        <Hidden smDown>
          <Box className={classes.widget} maxWidth={300} minWidth={300} width={300}>
            <PublishAgoragramWidget />
          </Box>
        </Hidden>
      </div>
    </Container>
  );
}

export interface AgoraInfiniteScrollState {
  agoragrams: Agoragram[];
  hasMore: boolean;
  loading: boolean;
  prevSort?: string;
}

const mapDispatch = {
  getAgoragramsSuccess,
};

const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type AgoraInfiniteScrollProps = PropsFromRedux & {
  sort?: string;
  skip?: number;
  limit?: number;
  fromID?: string;
  hypagora?: string;
  authorID?: string;
};

class AIS extends React.Component<AgoraInfiniteScrollProps, AgoraInfiniteScrollState> {
  constructor(props: AgoraInfiniteScrollProps) {
    super(props);
    this.state = {
      agoragrams: [],
      hasMore: true,
      loading: true,
      prevSort: props.sort,
    };
  }

  getAgoragrams(changeLoading: boolean): void {
    const { agoragrams, prevSort } = this.state;
    const { sort, authorID } = this.props;
    if (changeLoading) this.setState({ ...this.state, loading: true });
    Axios.get<Agoragram[]>('/agoragram', {
      params: {
        authorID,
        // hypagora: hypagora === undefined ? null : hypagora === 'general' ? 'GENERAL' : hypagora,
        limit: 10,
        skip: sort === prevSort ? agoragrams.length : 0,
        sort: sort ? sort.toUpperCase() : 'NEW',
      },
    })
      .then((res) => {
        this.setState({
          agoragrams: changeLoading === false ? [...agoragrams, ...res.data] : res.data,
          hasMore: res.data.length === 10,
          loading: false,
          prevSort: sort,
        });
        this.props.getAgoragramsSuccess(res.data);
      })
      .catch(console.error);
  }

  componentDidMount() {
    this.getAgoragrams(false);
  }
  componentDidUpdate() {
    if (this.state.prevSort !== this.props.sort && this.state.loading === false) {
      this.getAgoragrams(true);
    }
  }

  render() {
    const { hasMore, agoragrams, loading } = this.state;
    if (loading) return <Post loading />;
    return (
      <InfiniteScroll
        hasMore={hasMore}
        loader={<Post key="loadingpost" loading />}
        loadMore={(): void => this.getAgoragrams(false)}
        pageStart={0}
        threshold={300}
      >
        {agoragrams.map(({ _id }: Agoragram) => (
          <ReduxConnectedPost _id={_id} key={_id} longPostIsFadedOut />
        ))}
      </InfiniteScroll>
    );
  }
}

export const AgoraInfiniteScroll = connector(AIS);

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import AgoraFilter from './AgoraFilter';
import { Agoragram } from './agoraTypes';
import { CardPost } from './Post';
import Container from '@material-ui/core/Container';
import React from 'react';
import { getAgoragramsSuccess } from './agoraSlice';
import useAxios from 'axios-hooks';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    post: {
      marginTop: theme.spacing(2),
    },
    root: {
      marginTop: theme.spacing(2),
    },
  }),
);

export default function Agora(): React.ReactElement {
  const classes = useStyles();
  const { hypagora, sort, dateAfter, dateBefore } = useParams();
  const dispatch = useDispatch();

  const [{ data, loading }] = useAxios({
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
    params: {
      dateAfter: dateAfter || '0',
      dateBefore: dateBefore || 'ffffffff',
      hypagora: hypagora === 'general' ? null : hypagora,
      sort: sort ? sort.toUpperCase() : 'NEW',
    },
    url: '/api/agora/get/agoragrams',
  });

  if (data) {
    dispatch(getAgoragramsSuccess(data));
  }

  return (
    <Container className={classes.root} maxWidth="md">
      <AgoraFilter hypagora={hypagora} path="/agora" sort={sort} />
      {loading
        ? [0, 0, 0, 0, 0].map((_, index) => (
            <CardPost
              className={classes.post}
              key={'agoragram' + index}
              loading
              name=""
              time={new Date()}
              title=""
              username=""
            />
          ))
        : data?.agoragrams.map(
            ({ _id, body, type, title, author = 'deleted', stars, commentAmmount }: Agoragram, i: number) => (
              <CardPost
                author={author}
                body={body}
                className={classes.post}
                commentAmmount={commentAmmount}
                key={_id}
                loading={false}
                starAmmount={stars}
                time={new Date()}
                title={title}
                type={type}
                username={'username'}
              />
            ),
          )}
    </Container>
  );
}

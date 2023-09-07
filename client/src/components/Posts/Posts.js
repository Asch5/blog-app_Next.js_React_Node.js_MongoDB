import React, { useState } from 'react';

import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import Post from './Post/Post.js';

const Posts = ({ currentId, setCurrentId }) => {
  const [tag, setTag] = useState(null);

  const posts = useSelector((state) => {
    if (tag) {
      return state.posts.filter((post) => post.tags.includes(tag));
    } else {
      return state.posts;
    }
  });
  // let posts = useSelector((state) => state.posts);

  // useEffect(() => {
  //   if (tag) {
  //     posts = posts.filter((el) => el.tags.includes(tag));
  //   }
  //   console.log(posts);
  // }, [tag]);

  return (
    <>
      <Container>
        <h1 className="text-center p-4">
          Posts <Badge bg="secondary">New</Badge>
        </h1>
        {tag && (
          <h3 className="text-center p-4">
            Posts this tag #{tag}
            <Button onClick={() => setTag(null)} className="ms-3">
              cancel
            </Button>
          </h3>
        )}

        <Row xs={1} lg={2} xl={3} className="g-4 ">
          {posts.map((post, i) => (
            <Col key={post._id}>
              <Post
                currentId={currentId}
                setCurrentId={setCurrentId}
                id={i}
                post={post}
                setTag={setTag}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Posts;

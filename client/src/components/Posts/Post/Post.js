import React, { useState, useRef, useEffect } from 'react';
import { Card, Button, Overlay, Tooltip } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { likePost, deletePost } from '../../../actions/posts';
import moment from 'moment';

const Post = ({ post, currentId, setCurrentId, setTag }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  useEffect(() => {
    !currentId && setShow(false);
  }, [currentId]);

  const dispatch = useDispatch();

  const postDelete = () => {
    dispatch(deletePost(post._id));
  };

  const plusCountLike = () => {
    dispatch(likePost(post._id));
  };

  return (
    <div className="d-flex justify-content-around">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={post.selectedFile} alt="image" />
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            creator: {post.creator}
          </Card.Subtitle>
          <Card.Text>{post.message}</Card.Text>

          <div className="mb-3">
            {post.tags.map((el, i) => (
              <Card.Link onClick={() => setTag(el)} key={i} href="#">
                {`#${el}`.trim()}
              </Card.Link>
            ))}
          </div>

          <div className="mb-3">
            <Button
              size="sm"
              variant={currentId === post._id ? 'warning' : 'secondary'}
              ref={target}
              onClick={() => {
                if (currentId) {
                  setCurrentId(null);
                } else {
                  setCurrentId(post._id);
                  setShow(!show);
                }
              }}
            >
              {currentId === post._id ? 'Cancel redaction' : 'Redact'}
            </Button>
            <Button
              className="m-1"
              size="sm"
              onClick={postDelete}
              variant="danger"
            >
              Delete post
            </Button>
            <Overlay target={target.current} show={show} placement="top-start">
              {(props) => (
                <Tooltip id="overlay-example" {...props}>
                  You can correct data into the form
                </Tooltip>
              )}
            </Overlay>
          </div>

          <Button
            onClick={plusCountLike}
            size="sm"
            // type="button"
            className="btn btn-primary position-relative"
          >
            Like
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {post.likeCount}
              <span className="visually-hidden">unread messages</span>
            </span>
          </Button>
        </Card.Body>
        <Card.Footer className="mt-3 text-muted">
          {moment(post.createdAt).fromNow()}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Post;

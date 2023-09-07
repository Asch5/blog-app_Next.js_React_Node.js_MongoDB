import { Form, Button, Container } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';

import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost, deletePost } from '../../actions/posts';

const Forms = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });
  const dispatch = useDispatch();

  const post = useSelector((state) =>
    currentId ? state.posts.find((e) => e._id == currentId) : null
  );

  useEffect(() => {
    if (currentId) {
      setPostData(post);
    } else {
      clear();
    }
  }, [currentId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postData.creator) {
      return;
    }

    if (currentId) {
      dispatch(
        updatePost(currentId, {
          ...postData,
        })
      );
    } else {
      dispatch(
        createPost({
          ...postData,
        })
      );
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    });
  };

  return (
    <Container>
      <h3 className="text-center p-4">Form</h3>
      <h5 className="text-center p-2">
        {currentId ? 'Update post' : 'Create post'}
      </h5>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>creator</Form.Label>
          <Form.Control
            type="text"
            placeholder="creator"
            value={postData.creator}
            onChange={(e) =>
              setPostData({ ...postData, creator: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>title</Form.Label>
          <Form.Control
            type="text"
            placeholder="title"
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            type="text"
            placeholder="message"
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>tags</Form.Label>
          <Form.Control
            type="text"
            placeholder="tags"
            value={postData.tags}
            onChange={(e) =>
              setPostData({
                ...postData,
                tags: e.target.value.split(','),
                //tags: e.target.value.split(',').map((item) => item.trim()),
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          ></FileBase>
        </Form.Group>
        <Button className="me-2" variant="dark" type="submit">
          Submit
        </Button>
        <Button
          variant="secondary"
          className="me-2"
          type="button"
          onClick={clear}
        >
          Clear
        </Button>
        {/* <Button
          hidden={!currentId && true}
          onClick={() => postDelete()}
          variant="danger"
        >
          Delete post
        </Button> */}
      </Form>
    </Container>
  );
};

export default Forms;

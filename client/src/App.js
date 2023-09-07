import React, { useEffect, useState } from 'react';
import { ThemeProvider, Container, Row, Col, Stack } from 'react-bootstrap';
import memories from './images/memories.jpg';
import './style.css';
import Posts from './components/Posts/Posts.js';
import Form from './components/Form/Form.js';

import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts.js';
import Forms from './components/Form/Form.js';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const [currentId, setCurrentId] = useState(null);
  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <div className="bg-light bg-gradient">
        <Container className="mb-5">
          <Row>
            <Col>
              <h1 className="text-center display-1">MEMORIS</h1>
            </Col>
            {/* <Col>
              <div>
                <img src={memories} alt="memories"></img>
              </div>
            </Col> */}
          </Row>
        </Container>
        <Container>
          <Row className="flex-row-reverse">
            <Col className="col-lg-4">
              <Forms currentId={currentId} setCurrentId={setCurrentId} />
            </Col>
            <Col className="col-lg-8">
              <Posts currentId={currentId} setCurrentId={setCurrentId} />
            </Col>
          </Row>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default App;

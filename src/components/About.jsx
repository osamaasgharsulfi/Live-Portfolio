import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  introTextContainer: {
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.2em',
    // fontWeight: 'light',
  },

};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => (
    <ReactMarkdown
      children={text}
    />
  );

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container mt-5">
        <Container>
          {data
            ? (
              <Fade>
                <Row>
                  <Col md={6} sm={12} className="" style={styles.introTextContainer}>
                    {parseIntro(data.about)}
                  </Col>
                  <Col md={6} sm={12} className="">
                    <img
                      className="img-fluid"
                      // style={{ pointerEvents: 'none' }}
                      onContextMenu={(e) => e.preventDefault()} // Disable right-click
                      style={{ userSelect: 'none' }}
                      src={data?.imageSource}
                      alt="profile"
                    />
                  </Col>
                </Row>
              </Fade>
            )
            : <FallbackSpinner />}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;

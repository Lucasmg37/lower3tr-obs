import React from 'react';

import { Container } from './styles';

function Lower3th({active, data, logo}) {
  return (
    <Container className={`lower ${active && "active"}`}>
      <div className="image">
        <img src={logo} alt="PIBPM logo" />
      </div>
      <div className="textinfo">
        <div className="title">
          <div>{data?.title || ""}</div>
        </div>
        {data.subtitle && (
          <div className="subtitle">
            <div>{data?.subtitle || ""}</div>
          </div>
        )}
      </div>
    </Container>
  );
}

export default Lower3th;
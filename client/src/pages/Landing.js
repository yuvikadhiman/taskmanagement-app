import React from "react";
import logo from "../assets/images/logo.png";
import main from "../assets/images/main.jpg";
import styled from "styled-components";

import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <img src={logo} alt="" className="logo" />
        <h5>
          <span>TASKIFY</span>
        </h5>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            TASK <span>MANAGEMENT</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam at
            quam totam tenetur nam odit sed quae voluptate, suscipit dolor
            commodi velit, ipsum blanditiis nihil repudiandae cupiditate
            quibusdam. Maxime, optio!
          </p>

          <Link to="/register" className="btn btn-hero">
            Get Started
          </Link>
        </div>
        <img src={main} alt="" className="img main-img" />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .logo {
    width: 110px;
    height: 140px;
    padding: 2.4rem;
    margin-left: 0;
    padding-left: 0;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  h5 {
    font-weight: 700;
    margin-top: 0.5rem;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-900);
  }
  .main-img {
    display: none;
  }
  .btn-hero {
    margin: 1rem;
    margin-left: 0;
  }
  h5 {
    font-weight: 700;
    padding-top: 1.5rem;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;
export default Landing;

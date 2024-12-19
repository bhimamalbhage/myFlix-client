import React from "react";
import ReactDOM from "react-dom/client";
import MainView from "./components/main-view/MainView";
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Container fluid>
    <MainView />
  </Container>
);

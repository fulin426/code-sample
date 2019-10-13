import React, { Component } from "react";
import { Container } from "reactstrap";

const SubmitSuccess = props => {
  return (
    <Container className="form-group-block text-center">
      <p className="submit-message">
        Your submission has been received! Someone will contact you within the
        next 24 hours
      </p>
      <p className="submit-message-email">
        For any questions please contact us directly at{" "}
        <a href="mailto:casey@fulin426@gmail.com?subject=Question%20Inquiry">
          fulin426@gmail.com
        </a>
      </p>
      <button className="btn-std size-med" onClick={props.handleStartNewSubmit}>
        Start New Submission
      </button>
    </Container>
  );
};

export default SubmitSuccess;

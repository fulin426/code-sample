import React, { Component } from "react";
import axios from "axios";
import ButtonSpinner from "../ButtonSpinner/ButtonSpinner";
import SubmitSuccess from "../SubmitSuccess/SubmitSuccess";
import {
  Container,
  Form,
  FormGroup,
  Input,
  Row,
  Col,
  Label,
  FormFeedback
} from "reactstrap";
import "./contact-form.css";

const initialInputs = {
  fullName: "",
  email: "",
  phoneNumber: "",
  companyName: "",
  additionalInfo: ""
};

const initialErrors = {
  fullName: false,
  email: false,
  phoneNumber: false,
  companyName: false,
  additionalInfo: false
};

class ContactForm extends Component {
  state = {
    ...initialInputs,
    isFetching: false,
    isSuccess: false,
    errors: initialErrors
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      errors: initialErrors
    });
  };

  handleStartNewSubmit = () => {
    this.setState({ isSuccess: false });
  };

  validate() {
    let errors = false;
    const keys = Object.keys(this.state);
    // Loop through state and set an error flag if empty input
    for (let i = 0; i < keys.length; i++) {
      if (this.state[keys[i]] === "") {
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            [keys[i]]: true
          }
        }));
        errors = true;
      }
    }
    if (errors) {
      return false;
    }
    return true;
  }

  handleSubmit = event => {
    event.preventDefault();
    const {
      fullName,
      companyName,
      email,
      phoneNumber,
      additionalInfo
    } = this.state;

    const data = {
      full_name: fullName,
      company_name: companyName,
      email: email,
      phone_number: phoneNumber,
      additional_information: additionalInfo
    };

    const valid = this.validate();
    if (valid) {
      this.setState(() => ({ isFetching: true }));
      axios
        .post("https://app.getdigitscout.com/api/demo_forms/", data)
        .then(res => {
          console.log(res);
          this.setState(() => ({
            ...initialInputs,
            isFetching: false,
            isSuccess: true
          }));
        })
        .catch(err => {
          console.log(err);
          this.setState({
            errMsg: "Something went wrong with your submission"
          });
        });
    }
  };

  renderForm() {
    const {
      fullName,
      email,
      phoneNumber,
      additionalInfo,
      errors,
      companyName,
      errMsg,
      isFetching,
      isSuccess
    } = this.state;
    if (!isSuccess) {
      return (
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col sm="6">
              <FormGroup>
                <label>Full Name</label>
                <Input
                  type="text"
                  name="fullName"
                  value={fullName}
                  onChange={this.handleChange}
                  autoComplete="on"
                  invalid={errors.fullName}
                />
                <FormFeedback>Full Name Required</FormFeedback>
                <label>Email</label>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  autoComplete="on"
                  invalid={errors.email}
                />
                <FormFeedback>Email Required</FormFeedback>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <label>Company Name</label>
                <Input
                  type="text"
                  name="companyName"
                  value={companyName}
                  onChange={this.handleChange}
                  autoComplete="on"
                  invalid={errors.companyName}
                />
                <FormFeedback>Company Name Required</FormFeedback>
                <label>Phone Number</label>
                <Input
                  type="text"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={this.handleChange}
                  autoComplete="on"
                  invalid={errors.phoneNumber}
                />
                <FormFeedback>Phone Number Required</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <FormGroup>
              <Label for="Info">More Information</Label>
              <Input
                type="textarea"
                name="additionalInfo"
                value={additionalInfo}
                rows={4}
                onChange={this.handleChange}
                invalid={errors.additionalInfo}
              />
              <FormFeedback>More Information Required</FormFeedback>
            </FormGroup>
          </FormGroup>
          <button className="btn-std size-med btn-container">
            <ButtonSpinner isFetching={isFetching} buttonName="Submit" />
          </button>
        </Form>
      );
    }
  }

  renderSuccessPage() {
    const { isSuccess } = this.state;
    if (isSuccess) {
      return <SubmitSuccess handleStartNewSubmit={this.handleStartNewSubmit} />;
    }
  }

  render() {
    const { errMsg } = this.state;

    return (
      <Container>
        <div className="text-center">
          <h2>Contact Form</h2>
          <span className="error-msg">
            <p>{errMsg}</p>
          </span>
        </div>
        {this.renderForm()}
        {this.renderSuccessPage()}
      </Container>
    );
  }
}

export default ContactForm;

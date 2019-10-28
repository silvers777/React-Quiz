import React, { Component } from 'react';
import styles from './Auth.module.sass';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import is from 'is_js';
import { connect } from 'react-redux';
import { auth } from './../../store/actions/auth';

class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Enter correct email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Enter correct password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  handlerLogin = () => {

    this.props.auth (
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    )
  }

  handlerRegister = () => {
    this.props.auth (
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    )
  }

  handlerSubmit = event => {
    event.preventDefault()
  }

  validateControl (value, validation) {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = is.email(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  onChangeHandler = (event, controlName) => {

    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName]}

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
      formControls, isFormValid
    })
  }

  renderInputs () {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={event => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  render() {
    return (
      <div className={styles.Auth}>
        <div>
          <h1>Autorization</h1>
          <form 
            onSubmit={this.handlerSubmit}
            className={styles.AuthForm}
          >
            
            { this.renderInputs() }

            <Button
              type="success"
              onClick={this.handlerLogin}
              disabled={!this.state.isFormValid}
            >Log In</Button>
            <Button
              type="primary"
              onClick={this.handlerRegister}
              disabled={!this.state.isFormValid}
            >Registration</Button>
          </form>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(
      auth(email, password, isLogin)
    )
  }
}

export default connect(null, mapDispatchToProps)(Auth);
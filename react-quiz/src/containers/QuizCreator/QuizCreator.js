import React, { Component } from 'react';
import styles from './QuizCreator.module.sass';
import Button from '../../components/UI/Button/Button';
import { createControl, validate, validateForm } from './../../form/formFramework';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import axios from '../../axios/axios-quiz';


function createOptionControl(number) {
  return createControl({
    id: number,
    label: `Option ${number}`,
    errorMessage: 'Value can not empty'
  }, {required: true})
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Enter question',
      errorMessage: 'Question can not empty'
    },{required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

class QuizCreator extends Component {

  state = {
    quiz: [],
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls()
  }

  handlerSubmit = event => {
    event.preventDefault()
  }

  handlerAddQuestion = event => {
    event.preventDefault()

    const quiz = [...this.state.quiz]
    const index = quiz.length + 1

    const {question, option1, option2, option3, option4} = this.state.formControls

    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {
          text: option1.value,
          id: option1.id
        },
        {
          text: option2.value,
          id: option2.id
        },
        {
          text: option3.value,
          id: option3.id
        },
        {
          text: option4.value,
          id: option4.id
        }
      ]
    }

    quiz.push(questionItem)

    this.setState({
      quiz,
      isFormValid: false,
      rightAnswerId: 1,
      formControls:  createFormControls()
    })
  }

  handlerCreateTest = async event => {
    event.preventDefault()

    try {
      
      await axios.post('quizes.json', this.state.quiz)
      
      this.setState({
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
      })

    } catch (error) {
      console.log(error)
    }
  }

  handlerChange = (value, controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)

    formControls[controlName] = control

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  }

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]

      return (
        <React.Fragment
          key={controlName + index}
        >
          <Input            
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event => this.handlerChange(event.target.value, controlName)}
          />
          { index === 0 ? <hr /> : null }
        </React.Fragment>
      )
    })
  }

  handlerSelectChange = event => {
    this.setState({
      rightAnswerId: +event.target.value
    })
  }

  render() {

    const select = <Select
      label="Select the right answer"
      value={this.state.rightAnswerId}
      onChange={this.handlerSelectChange}
      options={[
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 3, value: 3},
        {text: 4, value: 4}
      ]}
    />

    return (
      <div className={styles.QuizCreator}>
        <div>
          <h1>Create test</h1>
          <form
            onSubmit={this.handlerSubmit}
          >
            
            { this.renderControls() }

            { select }

            <Button
              type="primary"
              onClick={this.handlerAddQuestion}
              disabled={!this.state.isFormValid}
            >
              Add question
            </Button>
            <Button
              type="success"
              onClick={this.handlerCreateTest}
              disabled={this.state.quiz.length === 0}
            >
              Create test
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

export default QuizCreator;
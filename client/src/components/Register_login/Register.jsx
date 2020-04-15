import React, { Component } from 'react'
import FormField from '../utils/Form/FormField'
import { update, generateData, isFormValid } from '../utils/Form/FormActions'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/user_actions'
import Dialog from '@material-ui/core/Dialog'

class Register extends Component {

  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter ur name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          name: 'lastname_input',
          type: 'text',
          placeholder: 'Enter ur lastname'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter ur email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter ur password'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      confirmPassword: {
        element: 'input',
        value: '',
        config: {
          name: 'confirm_password_input',
          type: 'password',
          placeholder: 'Confirm ur password'
        },
        validation: {
          required: true,
          confirm: 'password'
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  }

  updateForm = (element) => {
    const newFormData = update(element, this.state.formData, 'register')
    this.setState({
      formError: false,
      formData: newFormData
    })
  }

  submitForm = (event) => {
    event.preventDefault()
    let dataToSubmit = generateData(this.state.formData, 'register')
    let formIsvalid = isFormValid(this.state.formData, 'register')
    if(formIsvalid){
      this.props.dispatch(registerUser(dataToSubmit))
      .then(res => {
        if(res.payload.success){
          this.setState({
            formError: false,
            formSuccess: true
          })
          setTimeout(() => {
            this.props.history.push('/register_login')
          }, 2000)
        }else{
          this.setState({formError: true})
        }
      }).catch(e => {
        this.setState({formError: true})
      })
    }else{
      this.setState({
        formError: true
      })
    }
  }

  render() {
    return (
      <div className='page_wrapper'>
        <div className="container">
          <div className="register_login_container">
            <div className="left">
              <form onSubmit={(event) => { this.submitForm(event) }}>

                <h2>Personal infomation</h2>

                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      id={'name'}
                      formdata={this.state.formData.name}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>

                  <div className="block">
                    <FormField
                      id={'lastname'}
                      formdata={this.state.formData.lastname}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
                </div>

                <div>
                  <FormField
                    id={'email'}
                    formdata={this.state.formData.email}
                    change={(element) => this.updateForm(element)}
                  />
                </div>

                <h2>Verify password</h2>

                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      id={'password'}
                      formdata={this.state.formData.password}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>

                  <div className="block">
                    <FormField
                      id={'confirmPassword'}
                      formdata={this.state.formData.confirmPassword}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
                </div>

                {
                  this.state.formError ?
                    <div className="error_label">Pls check ur data</div>
                    : null
                }

                <button onClick={(event) => this.submitForm(event)}>Create an account</button>
              </form>
            </div>
          </div>
        </div>

        {/* dialog */}
        <Dialog open = {this.state.formSuccess}>
          <div className = 'dialog_alert'>
            <div>Congratulation !!</div>
            <div>You will be redirected to the LOGIN in a couple seconds... </div>
          </div>
        </Dialog>
      </div>
    )
  }
}

export default connect()(Register)

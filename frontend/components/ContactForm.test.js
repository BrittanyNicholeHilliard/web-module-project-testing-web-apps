import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';


let firstNameField, lastNameField, emailField, messageField, submit

beforeEach(() => {
    render(<ContactForm/>)

    firstNameField = screen.getByPlaceholderText('Edd')
    lastNameField = screen.getByPlaceholderText('Burke')
    emailField = screen.getByPlaceholderText('bluebill1049@hotmail.com')
    messageField = screen.getByLabelText('Message')
    submit = screen.getByRole(/button/)
})

test('renders without errors', () => {
    render(<ContactForm/>)
});

test('renders the contact form header', () => {
  const header = screen.getByText('Contact Form')
  expect(header).toBeInTheDocument()
  expect(header).toBeTruthy()
  expect(header).toHaveTextContent('Contact Form')
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    fireEvent.change(firstNameField, {target: {value: 'Eddy'}} )

    const error = await screen.queryByText('Error: firstName must have at least 5 characters.')
    expect(error).toBeVisible
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    fireEvent.click(submit)

    const errorlist = await screen.getAllByTestId('error')
    expect(errorlist).toHaveLength(3)
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    fireEvent.change(firstNameField, {target: {value: 'Brittany'}} )
    fireEvent.change(lastNameField, {target: {value: 'Hilliard'}} )
    fireEvent.click(submit)

    const errorlist = await screen.getAllByTestId('error')
    expect(errorlist).toHaveLength(1)

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    fireEvent.change(firstNameField, {target: {value: 'Brittany'}} )
    fireEvent.change(lastNameField, {target: {value: 'Hilliard'}} )
    fireEvent.change(emailField, {target: {value: 'email'}} )
    fireEvent.click(submit)

    const error = await screen.getByText(/email must be a valid email address/i)
    expect(error).toBeInTheDocument()

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    fireEvent.change(firstNameField, {target: {value: 'Brittany'}} )
    fireEvent.change(emailField, {target: {value: 'email'}} )
    fireEvent.click(submit)

    const error = await screen.getByText(/lastName is a required field/)
    expect(error).toBeInTheDocument()
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render ( <ContactForm />);

    fireEvent.change(firstNameField, {target: {value: 'Brittany'}} )
    fireEvent.change(lastNameField, {target: {value: 'Hilliard'}} )
    fireEvent.change(emailField, {target: {value: 'email@email.com'}} )
    fireEvent.click(submit)

    const firstNameDisplay = await screen.getByText('First Name: Brittany');
    expect(firstNameDisplay).toBeInTheDocument();


        // const lastNameDisplay = screen.getByText('Hilliard');
        // const emailDisplay = screen.getByText('email@email.com');
        // const messageDisplay = screen.getByText('boogers')


        // expect(lastNameDisplay).toBeInTheDocument();
        // expect(emailDisplay).toBeInTheDocument();
        // expect(messageDisplay).not.toBeInTheDocument();


})

test('renders all fields text when all fields are submitted.', async () => {

});

import React from 'react'

function About() {
  return (
    <div className='flex flex-col items-center gap-8'>
        <p className='text-4xl font-bold'>About</p>
        <p className='font-semibold text-lg'>Hi this is Arkadipta! Welcome to my Support Desk project!</p>
        <p className='font-medium text-lg'>As the project title states, this is a Customer Support Desk Portal where
        users can raise tickets for issues with any products (Apple products in this case) and the associated ticket
        will then be redirected to a support executive staff for resolution. It also has an admin user who can
        montior all the tickets and staff members currently present in the application. The technologies I used to
        develop this application are - </p>
        <ul className='list-disc'>
            <li>
                <p className='inline font-semibold'>Client side: </p>
                <p className='inline'>React 18, React Redux + Redux Toolkit, React Router 6, Typescript, Tailwind CSS</p>
            </li>
            <li>
                <p className='inline font-semibold'>Server side (Backend): </p>
                <p className='inline'>Node JS, Express, JWT, Node-Postgres, AWS SES, Typescript</p>
            </li>
            <li>
                <p className='inline font-semibold'>Database : </p>
                <p className='inline'>PostgreSQL DB hosted on AWS RDS</p>
            </li>
        </ul>
        <p className='font-medium text-lg'>Some features of my application are - </p>
        <ul className='list-disc'>
            <li>Used Typescript to ensure error free code and better intellisense</li>
            <li>Used Redux Toolkit to manage states and fetch data from backend throughout the application</li>
            <li>Developed custom hooks from scratch for form input validation and authentication</li>
            <li>Real time form input validation and custom input error handling</li>
            <li>Developed efficient SQL queries on the backend for querying the DB</li>
            <li>Developed the most optimal relations among entities in PostgreSQL DB with Foreign Keys, Indexes, Serials & Triggers</li>
            <li>Authentication on the backend using JWT and validation using express-validator</li>
            <li>Used AWS SES for sending transactional emails</li>
        </ul>
    </div>
  )
}

export default About
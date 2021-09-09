import React, { useState, useEffect } from 'react';

import './FormCreateContact.css';

const FormCreateContact = ({ createContact }) => {
  const [values, setValues] = useState({
    name: '',
    pictureUrl: '',
    popularity: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    pictureUrl: '',
    popularity: '',
  });
  const [touched, setTouched] = useState({
    name: false,
    pictureUrl: false,
    popularity: false,
  });

  const schemaValidation = {
    name: [
      {
        validation: values.name.length > 0,
        message: 'Required Field',
      },
      {
        validation: values.name.length >= 3,
        message: 'Minimum of 3 characters',
      },
      {
        validation: values.name.length <= 50,
        message: 'Maximum of 50 characters',
      },
    ],
    pictureUrl: [
      {
        validation: values.name.length > 0,
        message: 'Required Field',
      },
      {
        validation: values.name.length >= 3,
        message: 'Minimum of 3 characters',
      },
      {
        validation: values.name.length <= 50,
        message: 'Maximum of 50 characters',
      },
    ],
    popularity: [
      {
        validation: values.popularity >= 1,
        message: 'Minimum value of 1',
      },
      {
        validation: values.popularity <= 10,
        message: 'Maximum value of 10',
      },
    ],
  }

  const verifyValidation = () => {
    const newErrors = {};

    const validationErrors = Object.keys(schemaValidation).filter(key => { // Object.keys(schemaValidation) will return an array with each key of our schema ['name', 'pictureUrl', 'popularity']
      const error = schemaValidation[key].find(prop => !prop.validation); // find method will look into each validation array checking if there's any error

      if (error) {
        newErrors[key] = error.message; // if finds an error, we add it to newErrors object
        return true; // returning true inside a filter method makes it keep the object inside the new array
      }

      newErrors[key] = ''; // if there's no error, we just add an empty string to newErrors object
      return false; // returning false inside a filter method makes it discards this object
    });

    setErrors(newErrors); // update errors state variable

    return validationErrors.length > 0; // returns true if there's at least one error property inside validationErrors array
  }

  useEffect(() => {
    verifyValidation();
  }, [values, touched]);

  const handleChange = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleBlur = event => {
    const { name } = event.target;
    setTouched({ ...touched, [name]: true });
  };

  const handleSubmit = event => {
    event.preventDefault();

    
    const hasError = verifyValidation(); // Call verifyValidation method
    setTouched({
      name: true,
      pictureUrl: true,
      popularity: true,
    }); // set all fields to touched = true to make sure we will be able to show the correct feedback to user

    if (hasError) {
      return; // if there is any error, we return in this point, so the code below won't be executed and the new contact won't be created
    }

    createContact({ id: new Date().getTime(), ...values }); // if there's no error, the contact will be created

    setValues({
      name: '',
      pictureUrl: '',
      popularity: '',
    }); // reset values
    setTouched({
      name: false,
      pictureUrl: false,
      popularity: false,
    }); // reset touched
  };

  const defineClassFeedback = (touched, error) => {
    if (touched && error) {
      return 'error-border';
    }

    if (touched && !error) {
      return 'success-border';
    }
  }

  return (
    <form onSubmit={handleSubmit} className="create-contact-container">
      <div>
        <input
          className={defineClassFeedback(touched.name, errors.name)}
          type="text"
          name="name"
          placeholder="Contact Name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.name && errors.name && <span className="message error">{errors.name}</span>}
        {touched.name && !errors.name && <span className="message success">Ok</span>}
      </div>
      <div>
        <input
          className={defineClassFeedback(touched.pictureUrl, errors.pictureUrl)}
          type="text"
          name="pictureUrl"
          placeholder="Picture URL"
          value={values.pictureUrl}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.pictureUrl && errors.pictureUrl && <span className="message error">{errors.pictureUrl}</span>}
        {touched.pictureUrl && !errors.pictureUrl && <span className="message success">Ok</span>}
      </div>
      <div>
        <input
          className={defineClassFeedback(touched.popularity, errors.popularity)}
          type="number"
          step="0.01"
          name="popularity"
          placeholder="Popularity"
          value={values.popularity}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.popularity && errors.popularity && <span className="message error">{errors.popularity}</span>}
        {touched.popularity && !errors.popularity && <span className="message success">Ok</span>}
      </div>
      <div>
        <button type="submit">Create new Contact</button>
      </div>
    </form>
  );
}

export default FormCreateContact;

import { useState } from "react";
import {
    Frame,
    Layout,
    Page,
    Card,
    Button,
    FormLayout,
    TextField,
    Navigation,
    Form,
    Banner
  } from '@shopify/polaris';
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from "../State/usersReducer";
import {
  useField,
  useReset,
  useDirty,
  useSubmit,
  notEmpty,
} from '@shopify/react-form';
import { ReCaptcha } from 'react-recaptcha-google'

const RegisterForm = () => {
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (value) => {
    return value;
  }
  
  const firstName = useField({
    value: '',
    validates: [
      notEmpty('First name is required')
    ],
  });
  const lastName = useField({
    value: '',
    validates: [
      notEmpty('Last name is required')
    ],
  });
  const email = useField({
    value: '',
    validates: [
      notEmpty('Email is required')
    ],
  });
  const address = useField({
    value: '',
    validates: [
      notEmpty('Address is required')
    ],
  });
  const phone = useField({
    value: '',
    validates: [
      notEmpty('Phone is required')
    ],
  })
  const fields = {firstName, lastName, email, address, phone};
  const {submit, errors} = useSubmit(
    async (fieldValues) => {
      const remoteErrors = [];
      if (remoteErrors.length > 0) {
        return {status: 'fail', errors: remoteErrors};
      }
      dispatch(fetchUser(fieldValues))
      navigate('/')
      return {status: 'success'};
    },
    fields,
  );

  const errorBanner = errors.length > 0 && (
    <Layout.Section>
      <Banner status="critical">
        <p>There were some issues with your form submission:</p>
        <ul>
          {errors.map(({message}, index) => {
            return <li key={`${message}${index}`}>{message}</li>;
          })}
        </ul>
      </Banner>
    </Layout.Section>
  );

  const callback = (value) => {
    return value
  }

return (

  <Frame>
      <Form onSubmit={submit}>
        <Page title="Register">
        <Navigation exact location='register'>
         <Navigation.Section
          items={[
            {
              url: '/',
              label: 'Home'
            },
            {
              url: '/register',
              label: 'Register'
            }
          ]}
        />
    </Navigation>
          <Layout>
            {errorBanner}
            <Layout.Section>
              <Card sectioned>
              <FormLayout>
                  <TextField label="First name" {...fields.firstName} />
                  <TextField label="Last name" {...fields.lastName} />
                  <TextField label="Email" {...fields.email} />
                  <TextField label="Address" {...fields.address} />
                  <TextField label="Phone number" {...fields.phone} />
                  <ReCaptcha
                    sitekey={process.env.REACT_APP_URL_GOOGLEMAPS_API_KEY}
                    render="explicit"
                    onloadCallback={callback}
                  />
                  <Button primary onClick={submit}>Submit</Button>
              </FormLayout>
              </Card>
            </Layout.Section>
          </Layout>
        </Page>
      </Form>
    </Frame>
  );
}

export default RegisterForm;

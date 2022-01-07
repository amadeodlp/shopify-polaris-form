import React from 'react';
import {
  useField,
  useReset,
  useDirty,
  useSubmit,
  notEmpty,
  lengthMoreThan,
} from '@shopify/react-form';

import {
  Page,
  Layout,
  FormLayout,
  Form,
  Card,
  TextField,
  ContextualSaveBar,
  Frame,
  Banner,
} from '@shopify/polaris';

export default function MyComponent() {
  const title = useField({
    value: '',
    validates: [
      notEmpty('Title is required'),
      lengthMoreThan(3, 'Title must be more than 3 characters'),
    ],
  });
  const description = useField('');
  const fields = {title, description};

  // track whether any field has been changed from its initial values
  const dirty = useDirty(fields);

  // generate a reset callback
  const reset = useReset(fields);

  // handle submission state
  const {submit, submitting, errors, setErrors} = useSubmit(
    async (fieldValues) => {
      const remoteErrors = []; // your API call goes here
      if (remoteErrors.length > 0) {
        return {status: 'fail', errors: remoteErrors};
      }

      return {status: 'success'};
    },
    fields,
  );

  const contextBar = dirty && (
    <ContextualSaveBar
      message="Unsaved product"
      saveAction={{
        onAction: submit,
        loading: submitting,
        disabled: false,
      }}
      discardAction={{
        onAction: reset,
      }}
    />
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

  return (
    <Frame>
      <Form onSubmit={submit}>
        <Page title="New Product">
          {contextBar}
          <Layout>
            {errorBanner}
            <Layout.Section>
              <Card sectioned>
                <FormLayout>
                  <TextField label="Title" {...fields.title} />
                  <TextField
                    multiline
                    label="Description"
                    {...fields.description}
                  />
                </FormLayout>
              </Card>
            </Layout.Section>
          </Layout>
        </Page>
      </Form>
    </Frame>
  );
}
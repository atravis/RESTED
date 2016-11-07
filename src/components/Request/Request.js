import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, Fields, FieldArray, propTypes } from 'redux-form';
import { Panel } from 'react-bootstrap';
import flow from 'lodash.flow';

import Titlebar from './Titlebar';
import URLField from './URLField';
import MethodField from './MethodField';
import HeadersField from './HeadersField';
import BasicAuthField from './BasicAuthField';
import BodyField from './BodyField';

import * as requestActions from '../../store/request/actions';
import { DEFAULT_REQUEST } from '../../constants/constants';


function Request({ placeholderUrl, handleSubmit, sendRequest }) {
  return (
    <Panel header={<Titlebar />}>
      <form onSubmit={handleSubmit(sendRequest)}>
        <Field
          name="url"
          component={URLField}
          placeholderUrl={placeholderUrl}
        />
        <Field
          name="method"
          component={MethodField}
        />
        <FieldArray
          name="headers"
          component={HeadersField}
        />
        <Fields
          names={['basicAuth.username', 'basicAuth.password']}
          component={BasicAuthField}
        />
        <BodyField />
      </form>
    </Panel>
  );
}

Request.propTypes = {
  placeholderUrl: PropTypes.string,
  ...propTypes,
};

const formOptions = {
  form: 'request',
};

const mapStateToProps = ({ request: { useFormData, placeholderUrl } }) => ({
  useFormData,
  placeholderUrl,
  initialValues: DEFAULT_REQUEST,
});

export { Request };

export default flow(
  reduxForm(formOptions),
  connect(mapStateToProps, requestActions)
)(Request);


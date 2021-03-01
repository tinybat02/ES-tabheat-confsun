import React, { useState } from 'react';
//@ts-ignore
import { FormField, PanelOptionsGroup } from '@grafana/ui';
import { PanelEditorProps } from '@grafana/data';

import { PanelOptions } from './types';

export const MainEditor: React.FC<PanelEditorProps<PanelOptions>> = ({ options, onOptionsChange }) => {
  const [inputs, setInputs] = useState(options);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInputs(prevState => ({
      ...prevState,
      [name]: type == 'number' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = () => {
    onOptionsChange(inputs);
  };

  return (
    <PanelOptionsGroup>
      <div className="editor-row">
        <div className="section gf-form-group">
          <h5 className="section-heading">Time Settings</h5>
          <FormField
            label="Timezone"
            labelWidth={10}
            inputWidth={40}
            type="text"
            name="timezone"
            value={inputs.timezone}
            onChange={handleChange}
          />
          <FormField
            label="Open Hour"
            labelWidth={10}
            inputWidth={40}
            type="number"
            name="open_hour"
            value={inputs.open_hour}
            onChange={handleChange}
          />
          <FormField
            label="Close Hour"
            labelWidth={10}
            inputWidth={40}
            type="number"
            name="close_hour"
            value={inputs.close_hour}
            onChange={handleChange}
          />
        </div>
      </div>
      <button className="btn btn-inverse" onClick={handleSubmit}>
        Submit
      </button>
    </PanelOptionsGroup>
  );
};

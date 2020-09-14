import React from 'react';

const Textarea = ( {label, name, placeholder, update, description = '', required = false} ) => (
	<div className="mb-cpt-field">
		<label className="mb-cpt-label" htmlFor={name}>
			{label}
			{required && <span className="mb-cpt-required">*</span>}
		</label>
		<div className="mb-cpt-input">
			<textarea id={name} name={name} placeholder={placeholder} onChange={update} />
			{description && <div className="mb-cpt-description">{description}</div>}
		</div>
	</div>
)

export default Textarea;
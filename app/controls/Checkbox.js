import React from 'react';

const Checkbox = ( {label, name, description, update, checked} ) => {
	return (
		<div className="mb-cpt-field">
			{label && <label className="mb-cpt-label" htmlFor={name}>{label}</label>}
			<div className="mb-cpt-input">
				{
					description
					? <label className="mb-cpt-description"><input type="checkbox" id={name} name={name} defaultChecked={checked} onChange={update} /> {description}</label>
					: <input type="checkbox" id={name} name={name} defaultChecked={checked} onChange={update} />
				}
			</div>
		</div>
	)
}

export default Checkbox;
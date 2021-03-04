import dotProp from 'dot-prop';
import slugify from 'slugify';
import { SettingsContext } from '../SettingsContext';
import Checkbox from './Checkbox';
import Icon from './Icon';
import Input from './Input';
import Radio from './Radio';
import Select from './Select';
import Textarea from './Textarea';
const { useContext } = wp.element;

const ucfirst = str => str.length ? str[ 0 ].toUpperCase() + str.slice( 1 ) : str;
const normalizeBool = value => {
	if ( 'true' === value ) {
		value = true;
	} else if ( 'false' === value ) {
		value = false;
	}
	return value;
};
const normalizeNumber = value => typeof value === 'string' ? value : parseInt( value );

const Control = ( { field, autoFills = [] } ) => {
	const { settings, updateSettings } = useContext( SettingsContext );

	const autofill = ( newSettings, name, value ) => {
		const placeholder = name.replace( 'labels.', '' );
		autoFills.forEach( f => {
			let newValue;

			if ( 'slug' === f.name ) {
				newValue = slugify( value, { lower: true } );
			} else {
				newValue = ucfirst( f.default.replace( `%${ placeholder }%`, f.default.split( ' ' ).length > 2 ? value.toLowerCase() : value ) );
			}

			dotProp.set( newSettings, f.name, newValue );
		} );

		return newSettings;
	};

	const update = e => {
		const name = e.target.name;
		let value = 'checkbox' === e.target.type ? e.target.checked : e.target.value;
		value = normalizeBool( value );
		value = normalizeNumber( value );

		let newSettings = { ...settings };
		dotProp.set( newSettings, name, value );
		autofill( newSettings, name, value );

		updateSettings( newSettings );
	};

	const _value = dotProp.get( settings, field.name, field.default || '' );
	switch ( field.type ) {
		case 'text':
			return <Input label={ field.label } name={ field.name } value={ _value } description={ field.description } required={ field.required } update={ update } />;
		case 'textarea':
			return <Textarea label={ field.label } name={ field.name } placeholder={ field.placeholder } value={ _value } description={ field.description } update={ update } />;
		case 'checkbox':
			return <Checkbox label={ field.label } name={ field.name } description={ field.description } checked={ _value } update={ update } />;
		case 'radio':
			return <Radio label={ field.label } name={ field.name } options={ field.options } value={ _value } update={ update } />;
		case 'icon':
			return <Icon label={ field.label } name={ field.name } value={ _value } update={ update } />;
		case 'select':
			return <Select label={ field.label } name={ field.name } description={ field.description } options={ field.options } value={ _value } update={ update } />;
	}
};

export default Control;

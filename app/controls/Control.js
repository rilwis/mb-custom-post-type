import dotProp from 'dot-prop';
import slugify from 'slugify';
import PhpSettings from '../PhpSettings';
import Input from './Input';
import Textarea from './Textarea';
import Checkbox from './Checkbox';
import Radio from './Radio';
import Select from './Select';
const { useContext } = wp.element;

const Control = ( { field, autoFills } ) => {
	const [ state, setState ] = useContext( PhpSettings );

	const update = e => {
		const { name, type } = e.target;
		const value = 'checkbox' === type ? e.target.checked : e.target.value;

		setState( state => {
			let newState = JSON.parse( JSON.stringify( state ) );

			dotProp.set( newState, name, value );

			if ( !autoFills ) {
				return newState;
			}

			const placeholder = name.replace( 'labels.', '' );
			autoFills.forEach( f => {
				let newValue = slugify( value, { lower: true } );

				if ( 'slug' !== f.name ) {
					newValue = ucfirst( f.defaultValue.replace( `%${placeholder}%`, f.defaultValue.split( ' ' ).length > 2 ? value.toLowerCase() : value ) );
				}

				dotProp.set( newState, f.name, newValue );
			} );

			return newState;
		} );
	};

	const _value = dotProp.get( state, field.name ) || field.defaultValue || '';
	switch ( field.type ) {
		case 'text':
			return <Input label={ field.label } name={ field.name } value={ _value } description={ field.description } required={ field.required } update={ update } />;
		case 'textarea':
			return <Textarea label={ field.label } name={ field.name } placeholder={ field.placeholder } defaultValue={ _value } description={ field.description } update={ update } />;
		case 'checkbox':
			return <Checkbox label={ field.label } name={ field.name } description={ field.description } checked={ _value } update={ update } />;
		case 'radio':
			return <Radio label={ field.label } name={ field.name } values={ field.values } defaultValue={ _value } update={ update } />;
		case 'select':
			return <Select label={ field.label } name={ field.name } description={ field.description } values={ field.values } defaultValue={ _value } update={ update } />;
	}
};

const ucfirst = str => str[ 0 ].toUpperCase() + str.slice( 1 );

export default Control;
const maxKeyLengh = object => Math.max.apply( null, Object.keys( object ).map( key => key.length ) );
const spaces = ( settings, key ) => ' '.repeat( maxKeyLengh( settings ) - key.length );

const text = ( settings, key ) => `'${ key }'${ spaces( settings, key ) } => '${ settings[ key ] }'`;
const translatableText = ( settings, key ) => `'${ key }'${ spaces( settings, key ) } => esc_html__( '${ settings[ key ] }', '${ settings.text_domain }' )`;
const checkboxList = ( settings, key ) => `'${ key }'${ spaces( settings, key ) } => ${ settings[ key ].length ? `['${ settings[ key ].join( "', '" ) }']` : '[]' }`;
const general = ( settings, key ) => `'${ key }'${ spaces( settings, key ) } => ${ settings[ key ] }`;

const labels = settings => {
    const { labels } = settings;

    let keys = Object.keys( labels );
    labels.text_domain = settings.text_domain; // Add text domain to run the `text` function above.

    return keys.map( key => translatableText( labels, key ) ).join( ",\n\t\t" );
};

export { spaces, text, checkboxList, general, labels };
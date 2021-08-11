export const environment = {
  production: false,
  api: 'http://localhost:4000',
  regex: {
    array: {
      ofNumbers: /^\[(( )*[0-9]+( )*,)*(( )*[0-9]+( )*)?\]$/,
      ofStrings: /^\[(( )*\"[A-z0-9 ]+\"( )*,)*(( )*\"[A-z0-9 ]+\"( )*)?\]$/,
      ofStringsAndNumbers: /(^\[(( )*[0-9]+( )*,)*(( )*[0-9]+( )*)?\]$)|(^\[(( )*\"[A-z0-9 ]+\"( )*,)*(( )*\"[A-z0-9 ]+\"( )*)?\]$)/,
    }
  }
};
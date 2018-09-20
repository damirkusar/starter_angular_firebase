export const environment = {
  apiBaseBath: '#{serverBasePath}#',
  production: '#{isProduction}#',
  firebase: {
    apiKey: '#{firebaseApiKey}#',
    authDomain: '#{firebaseAuthDomain}#',
    databaseURL: '#{firebaseDatabaseURL}#',
    projectId: '#{firebaseProjectId}#',
    storageBucket: '#{firebaseStorageBucket}#',
    messagingSenderId: '#{firebaseMessagingSenderId}#'
  }
};

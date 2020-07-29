
let env = "APP"; //in case of localhost

const relativePaths = {
  APP: {
    production: false,
    baseUrl :"http://testretail.bullfrogspas.com/",
    apiBaseUrl: "http://10.0.3.40/AspCoreApiIIS/api/"
  },
  Q2: {
    production: false,
    baseUrl :"http://testretail.bullfrogspas.com/",
    apiBaseUrl: "localhost:6200/api/"
  },
  
};

export const environment = relativePaths[env];

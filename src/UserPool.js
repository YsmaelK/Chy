import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData ={
    UserPoolId:"us-west-1_jtAGICDFq",
    ClientId: "la76uncplbn01mscoo2fm9oiq"
}
export default new CognitoUserPool(poolData);
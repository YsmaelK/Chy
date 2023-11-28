

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    const emailDomain = event.request.userAttributes.email.split('@')[1].toLowerCase();

    if (emailDomain !== 'cpp.edu') {
        // Deny registration for users with email domains other than 'cpp.edu'
        throw new Error('Invalid email domain. Please use an email ending in "@cpp.edu".');
    }

    // Allow registration for users with a valid email domain
    return event;
};
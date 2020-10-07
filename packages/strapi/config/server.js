module.exports = ({ env }) => ({
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    admin: {
        auth: {
            secret: env('ADMIN_JWT_SECRET', 'ba396b64182ff30857d57caffb1e91d1'),
        },
    },
});

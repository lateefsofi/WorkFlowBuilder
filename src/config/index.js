const env = 'DEV';
const config ={
    DEV: {
        url: 'http://localhost:3000/api'
    },
    TEST: {
        url: 'http://localhost:3000/api'
    },
    PROD: {
        url: 'http://localhost:3000/api'
    }
}

export default config[env];
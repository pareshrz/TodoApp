var env = process.env.NODE_ENV || 'development';
console.log("env*****", env);

if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = "mongodb+srv://Watson:KZsSECt4123@cluster0-d3zkk.mongodb.net/TodoApp?retryWrites=true";
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = "mongodb+srv://Watson:KZsSECt4123@cluster0-d3zkk.mongodb.net/Test?retryWrites=true";
} else if (env === 'production') {
    process.env.MONGODB_URI = "mongodb+srv://Watson:KZsSECt4123@cluster0-d3zkk.mongodb.net/TodoApp?retryWrites=true";
}
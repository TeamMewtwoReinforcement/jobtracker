const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

//start server
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
var express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      config = require('./config/DB');

      mongoose.Promise = global.Promise;
      mongoose.connect(config.DB).then(
          () => {console.log('Database is connected') },
          err => { console.log('Can not connect to the database'+ err)}
        );

      const app = express();
      app.use(express.static('public'));
      app.use(bodyParser.json());
      app.use(cors());
      const port = process.env.PORT || 4000;

      itemRoutes = require('./expressRoutes/itemRoutes');
      orderRoutes = require('./expressRoutes/orderRoutes');

      app.use('/', itemRoutes);
      app.use('/', orderRoutes);

      const server = app.listen(port, function(){
         console.log('Listening on port ' + port);
       });
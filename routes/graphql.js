const axios = require('axios');

const cache = {}

const Graphql = async (ctx) => {
  const query = ctx.request.body;
  const queryFunc = async data => new Promise((resolve, reject) => {
    if(cache[data]){
      resolve({
        code: 200,
        data: cache[data],
      });
    } else {
      axios({
        url: 'https://api.github.com/graphql',
        method: 'post',
        headers: {
          Authorization: `bearer ${process.env.access_token}`,
          'Content-Type': 'application/json',
        },
        data,
      })
        .then( res => {
          resolve({
            code: 200,
            data: res.data,
          });
        }, err => {
          reject({
            code: 500,
            err
          });
        });
    }
  });
  ctx.body = await queryFunc(query);
};

module.exports = Graphql;

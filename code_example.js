const request_promise = require('request-promise');

// generator of options for request
function generateOption(id) {
  return {
    method: 'GET',
      uri: 'https://api.vk.com/method/friends.get?v=5.52&',
      qs: {
      access_token: 'YOUR_TOKEN',
        user_id: id,
        order: 'hints'
    },
    json: true
  };
}

request_promise(generateOption(17784637))
  .then((response) => {
    // response ids arr of 17784637 user
    let ids_arr = response.response.items;
    let requestsArr = [];
    // fill requestArr with request_promise objects with different options
    for (let i of ids_arr) {
      requestsArr.push(request_promise(generateOption(i)))
    }
    // call Promise.all
    // !HERE THE PLACE WHERE I CAN CALL "friends.get" METHOD MORE THAN 3 TIMES!
    return Promise.all(requestsArr);
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error)
  });

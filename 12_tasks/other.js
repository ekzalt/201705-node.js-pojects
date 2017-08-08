sequence('google', myCallback)
  .then((data) => {
    console.log(2);
    return sequence('yandex', myCallback);
  })
  .then((data) => {
    console.log(3);
    return sequence('bing', myCallback);
  })
  .then(() => console.log(arr));
  
import _ from 'lodash';

const start = async () => {
  return await Promise.resolve('async is working');
};

start().then(console.log);

class Util {
  static id = Date.now();
}

console.log('Util id:', Util.id);

const unused = 42;

console.log('Lodash', _.random(0, 5, true));

export default start;

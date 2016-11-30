import { list } from './daemon';

list((err, torrents) => {
  if (err) {
    console.error(err);
  } else {
    torrents.forEach((t) => console.log(t));
  }
});
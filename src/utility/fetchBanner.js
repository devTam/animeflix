import { db } from '../firebase';
const fetchBanner = (setAnime) => {
    db.collection('anime')
      .doc('oA4ytS11nTZdBwWdGYrj')
      .onSnapshot((snapshot) => {
        setAnime(
          snapshot.data()?.banner[
            Math.floor(Math.random() * snapshot.data().banner.length)
          ]
        );
      });
  };

  export default fetchBanner;
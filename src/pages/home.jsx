import * as React from "react";
import { animated } from "react-spring";
import { useWiggle } from "../hooks/wiggle";
import { Link } from "wouter";

import { useEffect, useState } from "react";

import { collection, getDocs, doc, onSnapshot, getFirestore, query, where } from "firebase/firestore";

// 同じディレクトリに入れたらimportできた、、
import db from "./firebase.js";

// Our language strings for the header
const strings = [
  "Hello React",
  "Salut React",
  "Hola React",
  "안녕 React",
  "Hej React",
];

// Utility function to choose a random value from the language array
function randomLanguage() {
  return strings[Math.floor(Math.random() * strings.length)];
}

/**
 * The Home function defines the content that makes up the main content of the Home page
 *
 * This component is attached to the /about path in router.jsx
 * The function in app.jsx defines the page wrapper that this appears in along with the footer
 */

export default function Home() {
  
  // 追記部分,HOME()の中でuseStateとか使う！
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // データ取得
    const commentData = collection(db, "react-data");
    getDocs(commentData).then((snapShot) => {
      // console.log(snapShot.docs.map((doc) => ({ ...doc.data() })));
      setComments(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);
  
  // リアルタイムで取得
    onSnapshot(collection(db, "react-data"), (comment) => {
      setComments(comment.docs.map((doc) => ({ ...doc.data() })));
    })
  
  const fetchRecentData = async () => {
  // 現在のタイムスタンプを取得
  const currentTime = firebase.firestore.Timestamp.now();
  
  // 24時間前のタイムスタンプを計算
  const twentyFourHoursAgo = new Date();
  twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

  // Firestoreクエリを作成
  const query = db.collection('your_collection')
                 .where('timestamp_field', '>=', twentyFourHoursAgo)
                 .where('timestamp_field', '<=', currentTime);

  // クエリを実行してデータを取得
  const snapshot = await query.get();

  // 取得したデータを配列に変換して返す
  const recentData = [];
  snapshot.forEach(doc => {
    recentData.push({ id: doc.id, ...doc.data() });
  });
  
  return recentData;
};


  // ここまで
  
  /* We use state to set the hello string from the array https://reactjs.org/docs/hooks-state.html
     - We'll call setHello when the user clicks to change the string
  */
  const [hello, setHello] = React.useState(strings[0]);

  /* The wiggle function defined in /hooks/wiggle.jsx returns the style effect and trigger function
     - We can attach this to events on elements in the page and apply the resulting style
  */
  const [style, trigger] = useWiggle({ x: 5, y: 5, scale: 1 });

  // When the user clicks we change the header language
  const handleChangeHello = () => {
    // Choose a new Hello from our languages
    const newHello = randomLanguage();

    // Call the function to set the state string in our component
    setHello(newHello);
  };
  return (
    <>
      <h1 className="title">{hello}!</h1>
      {/* When the user hovers over the image we apply the wiggle style to it */}
      <animated.div onMouseEnter={trigger} style={style}>
        <img
          src="https://cdn.glitch.com/2f80c958-3bc4-4f47-8e97-6a5c8684ac2c%2Fillustration.svg?v=1618196579405"
          className="illustration"
          onClick={handleChangeHello}
          alt="Illustration click to change language"
        />
      </animated.div>
      <div className="navigation">
        {/* When the user hovers over this text, we apply the wiggle function to the image style */}
        <animated.div onMouseEnter={trigger}>
          <a className="btn--click-me" onClick={handleChangeHello}>
            Psst, click me
          </a>
        </animated.div>
      </div>
      <div className="instructions">
        <h2>最新の口コミ一覧わあ</h2>

        
        {comments.map((comment) => (
          <div key={comment.comment}>
            <p>{comment.comment}</p>
          </div>
        ))}
        
        
        
        <p>
          This is the Glitch <strong>Hello React</strong> project. You can use
          it to build your own app. See more info in the{" "}
          <Link href="/about">About</Link> page, and check out README.md in the
          editor for additional detail plus next steps you can take!
        </p>

        <form></form>
      </div>
    </>
  );
}

//* 1.useEffect(callback)
//* -gọi callback mỗi khi component được re-render
//* -gọi callback sau khi component được mount
//* 2. useEffect(callback, [])
//* -gọi callback 1 lần sau khi component được mount
//* 3. useEffect(callback, [dependency])
//* -gọi callback mỗi khi dependency thay đổi

// ! Lưu ý: callback luôn được gọi sau khi component được mounted
// ! Lưu ý: cleanup function luôn được gọi trước khi component unmount

import { useState, useEffect } from "react";

function Content() {
  const [time, setTime] = useState(200)

  useEffect(() => { 
    const timerID = setInterval(() => {
      setTime((prev) => prev - 1)
    }, 1000)
    
    return () => {
      clearInterval(timerID)
    }
  
  })
  return (
    <div>
      <h1>{time}</h1>
    </div>
  );
}
// const tabs = ["posts", "comments", "albums"];

// function Content() {
//   const [show, setShow] = useState(false);
//   const [posts, setPosts] = useState([]);
//   const [type, setType] = useState("posts");

//   useEffect(() => {
//     fetch(`https://jsonplaceholder.typicode.com/${type}`)
//       .then((response) => response.json())
//       .then((posts) => {
//         setPosts(posts);
//       });
//   }, [type]);

//   useEffect(() => {
//     window.addEventListener("scroll", () => {
//       setShow(window.scrollY > 200);
//     });

//     // *cleanup function
//     return () => {
//       window.removeEventListener("scroll", () => {
//         setShow(window.scrollY > 200);
//       });
//     }

//   }, []);

//   return (
//     <div>
//       {tabs.map((tab) => (
//         <button
//           key={tab}
//           style={
//             type === tab
//               ? {
//                   color: "white",
//                   backgroundColor: "blue",
//                 }
//               : {
//                   color: "black",
//                   backgroundColor: "white",
//                 }
//           }
//           onClick={() => setType(tab)}
//         >
//           {tab}
//         </button>
//       ))}

//       <ul>
//         {posts.map((posts) => (
//           <li key={posts.id}>{posts.title || posts.name}</li>
//         ))}
//       </ul>
//       {show && (
//         <button
//           style={{
//             position: "fixed",
//             bottom: 20,
//             right: 20,
//           }}
//           onClick={() => window.scrollTo(0, 0)}
//         >
//           Scroll to top
//         </button>
//       )}
//     </div>
//   );
// }

export default Content;

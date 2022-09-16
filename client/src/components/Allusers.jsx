// import React, { useEffect, useState } from 'react'
// import Card from './Card'


// function Allusers() {

//     const [user, setUser] = useState([]);
//     useEffect(() => {
//         fetch("userdata")
//           .then((res) => {
//             if (res.ok) {
//               return res.json();
//             }
//           })
//           .then((jsonres) => setUser(jsonres));
//       }, []);

      
//       console.log(user);
//       return (
//           <div>
//     <h1>yo</h1>
//       <Card
      
//       name = {user[0].username}
//       id= {user[0]._id}

//        />
//     </div>
//   )
// }

// export default Allusers

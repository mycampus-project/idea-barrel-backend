// // Add user
// const addUser = async (user = {}, cb) => {
//     console.log("Adding a user...");
//     try {
//       const { email, fName, lName, isAdmin } = user;
//       if (email && fName && lName && isAdmin !== null && isAdmin !== undefined) {
//         const { resource: createdItem } = await containerUsers.items.create(user);
//         console.log(
//           `\r\nCreated new item: ${createdItem.id} - ${createdItem.email}\r\n`
//         );
//         cb(statusMsg(200, createdItem));
//       } else {
//         cb(statusMsg(400, { input: user }));
//       }
//     } catch (e) {
//       cb(statusMsg(400, { errorMsg: e }));
//     }
//   };

//   addUser(fakeUser, (res) => {
//     console.log(res);
//   });
  
//   const getUsers = (cb) => {
//     fetchContainerData(
//       containerUsers,
//       querySelectById("'matti.meikalainen@nokia.com'"),
//       cb
//     );
//   };

// const deleteAdmin = async (id, cb) => {
//     deleteById(containerUsers, id, true, cb);
//   };
  
//   const deleteUser = async (id, cb) => {
//     deleteById(containerUsers, id, false, cb);
//   };
  
//   const fakeUser = {
//     email: "jane.doe@nokia.comm",
//     fName: "Jane",
//     lName: "Doe",
//     isAdmin: false,
//   };
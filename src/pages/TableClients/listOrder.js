// function listOrder(listFilters) {
//   listFilters.forEach((item) => {
//     item.sort((a, b) => {
//       const dateAA = a.date.slice(6, 8);
//       const dateBA = b.date.slice(6, 8);
//       const dateAM = a.date.slice(3, 5);
//       const dateBM = b.date.slice(3, 5);
//       const dateAD = a.date.slice(0, 2);
//       const dateBD = b.date.slice(0, 2);

//       if (dateAA === dateBA) {
//         if (dateAM === dateBM) {
//           return dateAD - dateBD;
//         } else {
//           return dateAM - dateBM;
//         }
//       } else {
//         return dateAA - dateBA;
//       }
//     });
//   })
// };

// function listOrderUpdate(listFilters) {
//   listFilters.forEach((item) => {
//     item.sort((a, b) => {
//       if (item.updateAt !== undefined) {
//         // const dateAA = a.updateAt.slice(6, 8);
//         // const dateBA = b.updateAt.slice(6, 8);
//         const dateAM = a.updateAt.slice(0, 2);
//         const dateBM = b.updateAt.slice(0, 2);
//         const dateAD = a.updateAt.slice(0, 2);
//         const dateBD = b.updateAt.slice(0, 2);
//         return dateAD - dateBD;
//       }
//     });
//   });
// }

// export { listOrderUpdate };

const asyncHandler = (requestHandler) => {
  Promise.resolve(requestHandler(req, res, next)).catch((error) => next(error));
};

export { asyncHandler };



//We also can use this rapper  as this is using (try catch) block

// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     res.status(error.code || 500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

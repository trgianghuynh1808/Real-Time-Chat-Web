export const respSuccess = ({ message, data }, res) => {
  return res.status(201).json({
    success: true,
    message,
    data,
  });
};

export const respFailure = ({ message, error = {} }, res) => {
  return res.status(500).json({
    success: false,
    message,
    error: error.message,
  });
};

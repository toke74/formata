export const sendJson = (res, status = 200, payload = {}) => {
  return res
    .status(status)
    .json({ success: payload.success ?? true, ...payload });
};

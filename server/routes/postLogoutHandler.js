module.exports = (req, res) => {
	req.logOut();
	req.session.destroy();
	res.json({
    message: 'You have been successfully logged out'
  });
};

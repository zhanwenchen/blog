## Blog server

TODOs:
1. Test (Travis)
1. Use wavy node module to streamline import paths (no more ../../../blah)
1. Review password creation flow. Right now the logic lives in the User data model (~/models/User.js): user schema takes the real password string input as given, and then replaces the real password string with hashed password and inserting the row into db with the hashed password instead of the real password. Alternatively, the logic could live in the route handler/passport.js configuration function (~/routes/postSignupHandler.js which uses ~/configurePassport.js by invoking passport.authenticate('local-signup')). Right now I think it's a better idea to

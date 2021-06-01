import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin Admin",
    email: "admin@admin.com",
    password: bcrypt.hashSync("bj403709", 10),
    isAdmin: true,
  },
];

export default users;

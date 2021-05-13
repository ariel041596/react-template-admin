import bcryptjs from "bcryptjs";
const users = [
  {
    name: "Admin User",
    email: "admin@admin.com",
    password: bcryptjs.hashSync("password", 10),
    isAdmin: true,
  },
  {
    name: "Ariel Test",
    email: "ariel@test.com",
    password: bcryptjs.hashSync("password", 10),
  },
  {
    name: "Test",
    email: "test@test.com",
    password: bcryptjs.hashSync("password", 10),
  },
];

export default users;

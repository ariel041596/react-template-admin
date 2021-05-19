import bcryptjs from "bcryptjs";
const users = [
  {
    firstName: "Admin User",
    lastName: "Admin User",
    image: "../images/",
    email: "admin@admin.com",
    password: bcryptjs.hashSync("password", 10),
    isAdmin: true,
  },
  {
    firstName: "Admin User",
    lastName: "Admin User",
    image: "../images/",
    email: "ariel@test.com",
    password: bcryptjs.hashSync("password", 10),
  },
  {
    firstName: "Admin User",
    lastName: "Admin User",
    image: "../images/",
    email: "test@test.com",
    password: bcryptjs.hashSync("password", 10),
  },
];

export default users;

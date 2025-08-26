export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "Admin" | "Requester" | "Organization";
}

export const mockUsers: IUser[] = [
  {
    id: 0,
    name: "Admin",
    email: "admin@admin.com",
    password: "admin123",
    role: "Admin",
  },
  {
    id: 1,
    name: "Alice Admin",
    email: "alice@system.com",
    password: "admin123",
    role: "Admin",
  },
  {
    id: 2,
    name: "Adam Admin",
    email: "adam@system.com",
    password: "admin456",
    role: "Admin",
  },
  {
    id: 3,
    name: "Rachel Requester",
    email: "rachel@req.com",
    password: "req123",
    role: "Requester",
  },
  {
    id: 4,
    name: "Ron Requester",
    email: "ron@req.com",
    password: "req456",
    role: "Requester",
  },
  {
    id: 5,
    name: "Olivia Org",
    email: "olivia@org.com",
    password: "org123",
    role: "Organization",
  },
  {
    id: 6,
    name: "Oren Org",
    email: "oren@org.com",
    password: "org456",
    role: "Organization",
  },
];
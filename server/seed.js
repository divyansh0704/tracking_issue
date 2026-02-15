const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");
const User = require("./models/User");
const Ticket = require("./models/Ticket");
const Comment = require("./models/Comment");

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Ticket.deleteMany();
    await Comment.deleteMany();

    console.log("Old data cleared");

    // Create users
    const hashedPassword = await bcrypt.hash("123456", 10);

    const admin = await User.create({
      name: "Admin User",
      email: "admin@test.com",
      password: hashedPassword,
      role: "admin"
    });

    const support = await User.create({
      name: "Support User",
      email: "support@test.com",
      password: hashedPassword,
      role: "support"
    });

    const user1 = await User.create({
      name: "Normal User 1",
      email: "user1@test.com",
      password: hashedPassword,
      role: "user"
    });

    const user2 = await User.create({
      name: "Normal User 2",
      email: "user2@test.com",
      password: hashedPassword,
      role: "user"
    });

    console.log("Users created");

    // Create tickets
    const ticket1 = await Ticket.create({
      title: "Login Issue",
      description: "Cannot login after update",
      priority: "high",
      status: "open",
      createdBy: user1._id
    });

    const ticket2 = await Ticket.create({
      title: "Payment Failed",
      description: "Transaction not going through",
      priority: "medium",
      status: "in-progress",
      createdBy: user2._id,
      assignedTo: support._id
    });

    const ticket3 = await Ticket.create({
      title: "UI Bug",
      description: "Button not aligned properly",
      priority: "low",
      status: "closed",
      createdBy: user1._id,
      assignedTo: support._id
    });

    console.log("Tickets created");

    // Create comments
    await Comment.create([
      {
        ticket: ticket1._id,
        user: support._id,
        message: "We are checking this issue."
      },
      {
        ticket: ticket2._id,
        user: support._id,
        message: "Assigned to support team."
      },
      {
        ticket: ticket3._id,
        user: admin._id,
        message: "Issue resolved and closed."
      }
    ]);

    console.log("Comments created");

    console.log("Seeding completed successfully!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();

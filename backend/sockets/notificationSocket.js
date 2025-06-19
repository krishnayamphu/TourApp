// const { createNotification } = require("../controllers/notificationController");

const notificationSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // Admin joins room
    socket.on("joinAdminRoom", () => {
      socket.join("admins");
      console.log("Joined to admins room");
    });

    socket.on("newBooking", (data) => {
      console.log("New booking received:", data);

      // Send to admin (could be specific room or all admins)
      io.to("admins").emit("bookingNotification", {
        message: `New booking from user ${data.userId} for tour ${data.tourId}`,
        bookingId: data.bookingId,
        date: data.date,
      });
    });

    // socket.on("send_notification", async ({ userId, message }) => {
    //   try {
    //     const notification = await createNotification({ userId, message });
    //     io.emit(`notification_${userId}`, notification);
    //   } catch (err) {
    //     console.error("Notification error:", err);
    //   }
    // });

    // socket.on("disconnect", () => {
    //   console.log("Socket disconnected:", socket.id);
    // });
  });
};

module.exports = notificationSocket;

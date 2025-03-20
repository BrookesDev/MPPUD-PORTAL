{notifications.length > 0 ? (
    notifications.map((notif) => (
      <div
        key={notif.id}
        onClick={() => handleNotificationClick(notif)}
        style={{
          padding: "15px",
          borderBottom: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
        }}
      >
        {/* Colored Notification Icon */}
        <div
          style={{
            width: "38px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "5px",
          //   backgroundColor: getRandomColor(),
          }}
        >
          <BiSolidMessageRoundedError
            color={"#fff"}
            size={24}
          />
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              fontWeight: notif.read ? "normal" : "bold",
            }}
          >
            {notif.admin_message}
          </p>
          <small style={{ color: "#888" }}>
            {new Date(notif.created_at).toLocaleString()}
          </small>
        </div>
      </div>
    ))
  ) : (
    <p
      style={{
        padding: "10px",
        textAlign: "center",
        color: "#888",
      }}
    >
      No notifications
    </p>
  )}
import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * TopBar Component - Hiển thị tiêu đề động dựa trên Route
 */
function TopBar() {
  const location = useLocation();
  const [contextText, setContextText] = useState("");

  useEffect(() => {
    const path = location.pathname;

    // Trang danh sách
    if (path === "/users" || path === "/") {
      setContextText("Users List");
      return;
    }

    // Xử lý khi xem chi tiết User hoặc xem Photos
    // Cả hai trường hợp này đều cần lấy tên User từ cùng một API
    if (path.startsWith("/users/") || path.startsWith("/photos/")) {
      const userId = path.split("/")[2];
      const isPhotoView = path.startsWith("/photos/");

      // Chỉ truyền "đuôi" API, fetchModel sẽ tự lo phần http://localhost:8081/api
      fetchModel(`/user/${userId}`)
        .then((response) => {
          if (response && response.data) {
            const user = response.data;
            const name = `${user.first_name} ${user.last_name}`;
            setContextText(isPhotoView ? `Photos of ${name}` : name);
          }
        })
        .catch((error) => console.error("Error fetching top bar data:", error));
      return;
    }

    setContextText("");
  }, [location]); // Chạy lại mỗi khi URL thay đổi

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" color="inherit">
          Ngô Văn Phương
        </Typography>

        <Typography variant="h6" color="inherit">
          {contextText}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
export default TopBar;